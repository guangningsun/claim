# -*- coding: utf-8 -*-

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.shortcuts import redirect
from rest_framework import viewsets, filters,permissions
from AppModel.serializer import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from collections import OrderedDict
from AppModel.models import *
from django.db.models import Avg, Count, Min, Sum
import hashlib,urllib,random,logging,requests,base64
import json,time,django_filters,xlrd,uuid
from rest_framework import status
import time, datetime
import requests
from AppModel.WXBizDataCrypt import WXBizDataCrypt 


logger = logging.getLogger(__name__)
logger.setLevel(level = logging.DEBUG)
handler = logging.FileHandler("claimapp.log")
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


# 内部方法用于返回json消息
# done
def _generate_json_message(flag, message):
    if flag:
        return HttpResponse("{\"error\":0,\"msg\":\""+message+"\"}",
                            content_type='application/json',
                            )
    else:
        return HttpResponse("{\"error\":1,\"msg\":\""+message+"\"}",
                            content_type='application/json',
                            )
                            

# 获取资产列表
@api_view(['GET'])
def asset_detail(request):
    if request.method == 'GET':
        assetset = AssetInfo.objects.all()
        serializer = AssetSerializer(assetset, many=True)
        res_json = {"error": 0,"msg": {
                    "asset_info": serializer.data }}
        return Response(res_json)


# 通过物品分类 category id获取商品列表
@api_view(['GET'])
def asset_by_cid(request,cid):
    if request.method == 'GET':
        assetset = AssetInfo.objects.filter(asset_ccategory=cid)
        serializer = AssetSerializer(assetset, many=True)
        res_json = {"error": 0,"msg": {
                    "asset_info": serializer.data }}
        return Response(res_json)


# 物品申领功能
@api_view(['POST'])
def claim_asset(request):
    if request.method == 'POST':
        # claim_username = request.POST['claim_username']
        # import pdb;pdb.set_trace()
        claim_list = request.POST['choose_list']
        category = request.POST['category']
        try:
            cr = ClaimRecord(category=Category.objects.get(id=category))
            cr.save()
            for claim_submmit in json.loads(claim_list):
                claim_count = claim_submmit['claim_count']
                claim_name = claim_submmit['claim_name']
                claim_unit = claim_submmit['claim_unit']
                assetinfo = AssetInfo.objects.get(asset_name=claim_name)
                # 查看申领物品剩余是否足量
                if int(assetinfo.asset_count)<int(claim_count):
                    return _generate_json_message(False,""+claim_name+"库存商品不足")
                # 查看该部门是否有权限申领该数量
                if int(claim_count)> 5:
                    return _generate_json_message(False,"抱歉,该部门没有权限申请过多商品")
                assetinfo.asset_count = int(assetinfo.asset_count) - int(claim_count)
                # 资产管理减少指定数量物品
                assetinfo.save()
                # 创建申领物品
                cs = Claimlist(claim_count=claim_count,claim_name=claim_name,claim_unit=claim_unit)
                cs.save()
                # 申领物品加入该条申领记录中
                cr.claim_list.add(cs)
            # 修改申领记录的所属部门和申领状态参数
            cr.category=Category.objects.get(id=category)
            cr.approval_status = '0'
            cr.save()
            return _generate_json_message(True, "申领成功")
        except :
            return _generate_json_message(False, "仓库中没有该类型商品")
    

# 用户注册功能
@api_view(['GET', 'POST'])
def userinfo_detail(request):
    if request.method == 'GET':
        userset = UserInfo.objects.all()
        serializer = UserSerializer(userset, many=True)
        res_json = {"error": 0,"msg": {
                    "user_info": serializer.data }}
        return Response(res_json)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            res_json = {"error": 0,"msg": {
                    "user_info": serializer.data }}
            return Response(res_json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 个人申领历史记录
@api_view(['GET', 'POST'])
def claim_detail(request):
    if request.method == 'GET':
        # claimset = ClaimRecord.objects.filter(claim_weixin_id=sn)
        claimset = ClaimRecord.objects.all()
        serializer = ClaimSerializer(claimset, many=True)
        res_json = {"error": 0,"msg": {
                    "claim_record_info": serializer.data }}
        return Response(res_json)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 获取审批列表
@api_view(['POST'])
def get_approval_list(request):
    if request.method == 'POST':
        openid = request.POST['openid']
        auth = request.POST['auth']
        
        # 待主管审批
        if auth == "1":
        # 查询管理员所在部门
            cid = UserInfo.objects.get(weixin_openid=openid).category
            claimset = ClaimRecord.objects.filter(approval_status=0).filter(category=cid)
            serializer = ClaimSerializer(claimset, many=True)
            for i in range (0,len(serializer.data)):
                for k,v in serializer.data[i].items():
                    if k == "claim_list":
                        cl =[]
                        for cli in v:
                            cl_obj = Claimlist.objects.get(id=cli)
                            col_data = cl_obj.claim_count+cl_obj.claim_unit
                            dic[Claimlist.objects.get(id=cli).claim_name]=col_data
                            cl.append(dic)
                        serializer.data[i]['claim_list'] = cl
                    if k == "category":
                        serializer.data[i]['category'] = Category.objects.get(id=v).name
                    if k == "approval_status":
                        if v == "0":
                            serializer.data[i]['approval_status'] = "待主管审批"
                        elif v == "1":
                            serializer.data[i]['approval_status'] = "待综合办主管审批"
                        elif v == "2":
                            serializer.data[i]['approval_status'] = "待管理员审批"
                        elif v == "3":
                            serializer.data[i]['approval_status'] = "审批完成"
                        elif v == "4":
                            serializer.data[i]['approval_status'] = "已发放"
                        elif v == "5":
                            serializer.data[i]['approval_status'] = "未批准"

            res_json = {"error": 0,"msg": {
                        "approval_list_info": serializer.data }}
            return Response(res_json)
        # 待主任审批
        elif auth == "2":
            claimset = ClaimRecord.objects.filter(approval_status=1)
            serializer = ClaimSerializer(claimset, many=True)
            res_json = {"error": 0,"msg": {
                        "approval_list_info": serializer.data }}
            return Response(res_json)
        # 待管理员审理
        elif auth == "3":
            claimset = ClaimRecord.objects.filter(approval_status=2)
            serializer = ClaimSerializer(claimset, many=True)
            res_json = {"error": 0,"msg": {
                        "approval_list_info": serializer.data }}
            return Response(res_json)
   
# 物品分类管理
@api_view(['GET'])
def commoditycategory_detail(request):
    if request.method == 'GET':
        commoditycategoryset = CommodityCategory.objects.all()
        serializer = CommodityCategorySerializer(commoditycategoryset, many=True)
        # import pdb;pdb.set_trace()
        for i in range(0,len(serializer.data)):
            if serializer.data[i]['parent'] == None:
                serializer.data[i]['parent'] = '-'
            if serializer.data[i]['image'] == None:
                serializer.data[i]['image'] = '-'
        res_json = {"error": 0,"msg": {
                    "commoditycategory": serializer.data }}
        return Response(res_json)
    

# weixin 登录
@api_view(['POST'])
def weixin_sns(request,js_code):
    if request.method == 'POST':
        APPID = 'wx1010e77892dd6991'
        SECRET = '16704cf51186b336da15ed9f67cc7401'
        JSCODE = js_code
        requst_data = "https://api.weixin.qq.com/sns/jscode2session?appid="+APPID+"&secret="+SECRET+"&js_code="+JSCODE+"&grant_type=authorization_code"
        req = requests.get(requst_data)
        if req.status_code == 200:
            openid = json.loads(req.content)['openid']
            session_key = json.loads(req.content)['session_key']
            # WeixinSessionKey.objects.update_or_create(weixin_openid=openid,
            #                                         weixin_sessionkey=session_key)
            try:
                wsk = WeixinSessionKey.objects.get(weixin_openid=openid)
                wsk.weixin_sessionkey = session_key
                wsk.save()
            except WeixinSessionKey.DoesNotExist:
                cwsk = WeixinSessionKey(weixin_openid=openid,weixin_sessionkey=session_key)
                cwsk.save()
            return HttpResponse("{\"error\":0,\"msg\":\"登录成功\",\"openid\":\""+openid+"\"}",
                            content_type='application/json',)
        else:
            return Response(_generate_json_message(False,"code 无效"))
        # return HttpResponse(json.dumps(json.loads(req.content)),content_type='application/json',)

# weixin 获取用户信息
@api_view(['POST'])
def weixin_gusi(request):
    if request.method == 'POST':
        appId = 'wx1010e77892dd6991'
        openid = request.POST['openid']
        try:
            sessionKey = WeixinSessionKey.objects.get(weixin_openid=openid).weixin_sessionkey
            encryptedData = request.POST['encryptedData']
            iv = request.POST['iv']
            pc = WXBizDataCrypt(appId, sessionKey)
            res_data = pc.decrypt(encryptedData, iv)
            phone_number = res_data["phoneNumber"]
            # 增加创建用户动作 openid phonenumber nickname
            try:
                # 用户登录时判断用户是否存在
                userinfo = UserInfo.objects.get(weixin_openid=openid)
                res_data["auth"]= userinfo.auth
            except UserInfo.DoesNotExist:
                # 不存在则创建新用户
                userinfo = UserInfo(weixin_openid=openid,
                                    phone_number=phone_number,
                                    auth="0")
                userinfo.save()
                res_data["auth"] = "0"
            return HttpResponse(json.dumps(res_data),content_type='application/json')
        except:
            pass

    