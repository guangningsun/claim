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


# 物品申领功能
@api_view(['POST'])
def claim_asset(request):
    if request.method == 'POST':
        # claim_username = request.POST['claim_username']
        # import pdb;pdb.set_trace()
        claim_list = request.POST['choose_list']
        try:
            for claim_submmit in json.loads(claim_list):
                claim_count = claim_submmit['claim_count']
                # claim_phone_num = request.POST['claim_phone_num']
                claim_name = claim_submmit['claim_name']
                category = claim_submmit['category']
                
                assetinfo = AssetInfo.objects.get(asset_name=claim_name)
                # import pdb;pdb.set_trace()
                # 查看申领物品剩余是否足量
                if int(assetinfo.asset_count)<int(claim_count):
                    return _generate_json_message(False,""+claim_name+"库存商品不足")
                # 查看该部门是否有权限申领该数量
                if int(claim_count)> 5:
                    return _generate_json_message(False,"抱歉,该部门没有权限申请过多商品")
                assetinfo.asset_count = int(assetinfo.asset_count) - int(claim_count)
                # 资产管理减少指定数量物品
                assetinfo.save()
                # 创建申领记录
                claimrecord = ClaimRecord(
                                        # claim_username=claim_username,
                                        # claim_weixin_id=weixin_id,
                                        claim_count=claim_count,
                                        # claim_phone_num=claim_phone_num,
                                        claim_name=claim_name,
                                        category=Category.objects.get(id=category),
                                        )
                claimrecord.save()
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
def claim_detail(request,sn):
    if request.method == 'GET':
        claimset = ClaimRecord.objects.filter(claim_weixin_id=sn)
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


# 物品分类管理
@api_view(['GET'])
def commoditycategory_detail(request):
    if request.method == 'GET':
        commoditycategoryset = CommodityCategory.objects.all()
        serializer = CommodityCategorySerializer(commoditycategoryset, many=True)
        res_json = {"error": 0,"msg": {
                    "commoditycategory": serializer.data }}
        return Response(res_json)
    
