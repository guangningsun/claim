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


# 资产管理
@admin.register(AssetInfo)
class AssetInfoAdmin(ImportExportModelAdmin):
    list_display=['asset_name','asset_count','asset_type','asset_sn','asset_band','asset_specification','asset_unit','asset_image']
    # list_editable = ['asset_name','asset_count']
    search_fields =('asset_name','asset_count','asset_type','asset_sn','asset_band','asset_specification','asset_unit','asset_image')
    fieldsets = [
       ('用户数据', {'fields': ['asset_name','asset_count','asset_type','asset_sn','asset_band','asset_specification','asset_unit','asset_image'], 'classes': ['collapse']}),
    ]
    list_display_links = ('asset_name',)


# 申领记录管理
@admin.register(ClaimRecord)
class ClaimRecordAdmin(ImportExportModelAdmin):
    # list_display=['claim_username','claim_count','claim_phone_num','claim_weixin_id','claim_name','claim_date','category']
    list_display=['claim_count','claim_name','claim_date','category']
    # list_editable = ['claim_username','claim_count','claim_phone_num','claim_name','claim_date','category']
    search_fields =('claim_count','claim_name','claim_date','category')
    fieldsets = [
       ('用户数据', {'fields': ['claim_count','claim_name','claim_date','category'], 'classes': ['collapse']}),
    ]
    list_display_links = ('claim_name',)


# 用户管理
@admin.register(UserInfo)
class UserInfoAdmin(ImportExportModelAdmin): 
    list_display=['id','weixin_id','login_name','phone_number','category']
    search_fields =('login_name','weixin_id','phone_number','category')
    fieldsets = [
       ('用户数据', {'fields': ['login_name','weixin_id','phone_number','category'], 'classes': ['collapse']}),
    ]




# 组织机构设置
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['name','category','createtime','createuser','connected_number','slug']
    list_per_page = 10

admin.site.register(Category , MPTTModelAdmin)


admin.site.site_title = "物品申领后台管理"
admin.site.site_header = "物品申领"


