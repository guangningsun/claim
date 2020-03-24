# -*- coding:UTF-8 -*-
from django.contrib import admin
from AppModel.models import *
from import_export import resources
from import_export.admin import ImportExportModelAdmin, ImportExportActionModelAdmin, ExportActionModelAdmin
import logging,json,datetime
from django.utils.html import format_html
from django import forms
from mptt.admin import MPTTModelAdmin
from mptt.admin import DraggableMPTTAdmin
from feincms.module.page.models import Page
from django.utils.html import format_html,escape, mark_safe
from django.http import HttpResponse, HttpResponseRedirect


logger = logging.getLogger(__name__)
logger.setLevel(level = logging.DEBUG)
handler = logging.FileHandler("tjctwl.log")
handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)



# @admin.register(UserInfo)
# class UserInfoAdmin(ImportExportModelAdmin):
#     list_display=['id','login_name','username','user_permission','phone_number','create_time','user_sex','user_age','description','get_devices']
#     #list_editable = ['login_name','username','user_permission','phone_number','user_sex','user_age','description']
#     #search_fields =('login_name','username','user_permission','phone_number','create_time','user_sex','user_age','description')
#     #fieldsets = [
#      #   ('用户数据', {'fields': ['login_name','username','user_permission','phone_number','create_time','user_sex','user_age','description'], 'classes': ['collapse']}),
#     #]
#     def get_devices(self, obj):
#              return [bt.device_sn for bt in obj.device_sn.all()]
#     get_devices.short_description ='所有设备'
#     filter_horizontal = ('device_sn',)
#     def save_model(self, request, obj, form, change):
#         logger.info("save user info  in tjctwl platform")
#         # 若绑定了设备则将设备的已上线状态修改为true
#         for i in range(0,len(obj.device_sn.get_queryset())):
#             device_obj = obj.device_sn.get_queryset()[i]
#             DeviceInfo.objects.filter(id=device_obj.id).update(isOnline='0')
#         # 更新设备监控表，将用户信息和设备信息同时记录
#         try:
#             pass
#         except:
#             pass
#         super().save_model(request, obj, form, change)



# @admin.register(DeviceInfo)
# class DeviceInfoAdmin(ImportExportModelAdmin):
#     #list_display = ['id','device_name','productId','imei','deviceStatus','trans_autoObserver','createTime','createBy','netStatus','onlineAt','offlineAt','operation','isOnline']
#     list_display = ['device_name','device_sn','productId','imei','deviceStatus','trans_autoObserver','createTime','createBy','netStatus','onlineAt','offlineAt','trans_isOnline','companyinfo','owner_list']
#     list_filter = ('device_name','imei')
#     #list_editable = ['device_name','productId','imei','autoObserver']
#     search_fields =('device_name','device_sn','tenantId','productId','imei','deviceStatus','autoObserver','createTime','createBy','updateTime','updateBy','netStatus','onlineAt','offlineAt')
#     fieldsets = [
#         ('创建设备', {'fields': ['device_name','productId','imei','autoObserver','companyinfo','device_sn'], 'classes': ['collapse']}),
#     ]
#     #actions = ["delete_model"]
#     list_per_page = 10
#     list_display_links = ('device_name',)
    
#     def owner_list(self, obj):
#         if obj.id is not None:
#             user_list = [UserInfo.objects.filter(id = uf.userinfo_id) for uf in MappingUserinfoDeviceName.objects.filter(deviceinfo_id=obj.id)]
#             return [ user[0].username for user in user_list]
#         else:
#             return "-"
#     owner_list.short_description ='所属业主'

#     def trans_autoObserver(self, obj):
#         if obj.autoObserver == '0':
#             return "已订阅"
#         else:
#             return "未订阅"
#     trans_autoObserver.short_description = '是否订阅'

#     def trans_isOnline(self, obj):
#         if obj.isOnline == '0':
#             return "已上线"
#         else:
#             return "未上线"
#     trans_isOnline.short_description = '是否上线'
    
    
#     # 重写已有CRUD方法
#     def save_model(self, request, obj, form, change):
#         version = 20181031202117
#         path = "/aep_device_management/device"
#         param = {}
#         if request.POST:
#             body = "{\"deviceName\": \""+request.POST["device_name"]+"\",\"deviceSn\": \"MQTT\",\"imei\": \""+ \
#                         request.POST["imei"]+"\",\"operator\": \""+request.user.username+"\",\"other\": {\"autoObserver\": "+ \
#                         request.POST["autoObserver"]+"},\"productId\": "+request.POST["productId"]+"}"
#             logger.info("create device in aep platform")
#             try:
#                 logger.debug("create device in aep platform %s" % (body))
#                 res =  aeptools.sendSDKRequest(path,{},param,body,version,APPLICATION_ID,MasterKey,SECRET_ID)
#                 res_json = json.loads(res.read())
#                 if res_json["msg"] == "ok":
#                     response_device_data = res_json["result"]
#                     obj.id = response_device_data["deviceId"]
#                     obj.tenantId = _if_exist(response_device_data["tenantId"])
#                     obj.deviceStatus = _if_exist(response_device_data["deviceStatus"])
#                     obj.createBy = _if_exist(response_device_data["createBy"])
#                     obj.netStatus = _if_exist(response_device_data["netStatus"])
#                     obj.createTime = _if_exist(response_device_data["createTime"])
#                     obj.lastTime = _if_exist(response_device_data["lastTime"])
#                     obj.onlineAt = _if_exist(response_device_data["onlineAt"])
#                     obj.offlineAt = _if_exist(response_device_data["offlineAt"])    
#                     logger.info("update obj whitch will create in tjctwl platform")            
#                 else:
#                     logger.info("aep platform create device failed")
#             except:
#                 logger.info("create device in aep platform failed")
#         logger.info("save device in tjctwl platform")
#         super().save_model(request, obj, form, change)
    

#     def delete_model(self, request, obj):
#         logger.info("delete device test============")
#         super().delete_model(request, obj)
    

#     def delete_queryset(self, request, queryset):
#         logger.info("delete device query test============")
#         version = 20181031202131
#         path = "/aep_device_management/device"
#         if request.POST:
#             for i in range(0,len(queryset)):
#                 #param ={}
#                 param = {
#                          'deviceIds': queryset[i].id ,
#                          'productId': queryset[i].productId 
#                          }
#                 #body = "{\"deviceIds\": \""+queryset[i].device_id+"\",\"productId\": "+queryset[i].productId+"}"
#                 body = '{}'
#                 try:
#                     logger.debug("delete device in aep platform %s" % (param))
#                     res =  aeptools.sendSDKRequest(path,{},param,body,version,APPLICATION_ID,MasterKey,SECRET_ID,'DELETE')
#                 except:
#                     logger.info("delete device in aep platform failed")
#         logger.info("delete device in tjctwl platform")
#         super().delete_queryset(request, queryset)

#     def get_search_results(self, request, queryset, search_term):
#         logger.info("get all device test============")
#         queryset, use_distinct = super().get_search_results(request, queryset, search_term)
#         try:
#             search_term_as_int = int(search_term)
#         except ValueError:
#             pass
#         else:
#             queryset |= self.model.objects.filter(age=search_term_as_int)
#         return queryset, use_distinct


# # 联网单位设置
# #
# # 'indented_title'
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['name','category','createtime','createuser','connected_number','slug']
    list_per_page = 10

admin.site.register(Category , MPTTModelAdmin)


admin.site.site_title = "物品申领后台管理"
admin.site.site_header = "物品申领"


