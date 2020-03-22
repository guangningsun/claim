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


# 内部方法，用于获取当前时间戳
# done
def _get_timestamp():
    return int(round(time.time()*1000))


# 内部方法用于返回json消息
# done
def _generate_json_message(flag, message):
    if flag:
        return HttpResponse("{\"error\":0,\"msg\":\""+message+"\"}",
                            #content_type="application/x-www-form-urlencoded",
                            content_type='application/json',
                            )
    else:
        return HttpResponse("{\"error\":1,\"msg\":\""+message+"\"}",
                            #content_type="application/x-www-form-urlencoded",
                            content_type='application/json',
                            )


# 内部方法用于将对象返回值转换成json串
# done
def _generate_json_from_models(response_list):
    return HttpResponse(json.dumps(response_list),
                        #content_type="application/x-www-form-urlencoded",
                        content_type='application/json',
                        )
#                      content_type="application/json")


# 用户前端用户登录
def user_login(request):
    if request.POST:
        context = {}
        login_username = request.POST['username']
        login_password = request.POST['password']
        try:
            if login_username:
                user_info = UserInfo.objects.get(username=login_username)
            if user_info is not None:
                if user_info.password == login_password:
                    dict_tmp = {}
                    dict_tmp.update(user_info.__dict__)
                    dict_tmp.pop("_state", None)
                    res_data = {"error": 0, "msg": dict_tmp}
                    return _generate_json_from_models(res_data)
                else:
                    return _generate_json_message(False, "username or password doesn`t match")
        except:
            return _generate_json_message(False, "login false")


# 用户前端用户重置密码
def reset_password(request):
    if request.POST:
        context = {}
        user_id = request.POST['user_id']
        old_password = request.POST['old_password']
        new_password = request.POST['new_password']
        try:
            if user_id:
                user_info = UserInfo.objects.get(id=user_id)
            if user_info is not None:
                if user_info.password == old_password:
                    user_info.password = new_password
                    user_info.save()
                    return _generate_json_message(True, "reset password success")
                else:
                    return _generate_json_message(False, "old password doesn`t match")
        except:
            return _generate_json_message(False, "reset password failed")

# 内部方法device的类编程json格式
def _gen_device_info_json(device_info):
    device_info_json =  {
                                "code": device_info.device_sn, 
                                "name": device_info.device_name, 
                                "model": "-", 
                                "address": "-",
                                "location": "-",
                                "signal": device_info.netStatus, 
                                "battery": device_info.deviceVoltageStatus, 
                                "image": "-", 
                            }       
    return device_info_json


@api_view(['GET', 'POST'])
def device_detail(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        deviceset = DeviceInfo.objects.all()
        serializer = DeviceSerializer(deviceset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = DeviceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def device_opt_detail(request,sn):
    """
    Retrieve, update or delete a code userinfo.
    """

    try:
        deviceinfo = DeviceInfo.objects.get(device_sn=sn)
    except DeviceInfo.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = DeviceSerializer(deviceinfo)
        return Response(serializer.data)

    elif request.method == 'PUT':
        copy_data = request.data.copy()
        copy_data.pop("user_id")
        serializer = DeviceSerializer(deviceinfo, data=copy_data)
        if serializer.is_valid():
            serializer.save()
            res_json = {
                        "error": 0,
                        "msg": {
                        "device_info": serializer.data
                          }   
                        }
            return Response(res_json)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       

    elif request.method == 'DELETE':
        userinfo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)