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
from django.contrib import messages


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
    list_display=['asset_name','asset_count','asset_type','asset_sn','asset_band','asset_specification','asset_unit','asset_image','asset_ccategory']
    # list_editable = ['asset_name','asset_count']
    search_fields =('asset_name','asset_count','asset_type','asset_sn','asset_band','asset_specification','asset_unit','asset_image','asset_ccategory')
    fieldsets = [
       ('用户数据', {'fields': ['asset_name','asset_count','asset_type','asset_sn','asset_band','asset_specification','asset_unit','asset_image','asset_ccategory'], 'classes': ['collapse']}),
    ]
    list_display_links = ('asset_name',)
    list_per_page = 10


# 申领记录管理
@admin.register(ClaimRecord)
class ClaimRecordAdmin(ImportExportModelAdmin):
    # list_display=['claim_username','claim_count','claim_phone_num','claim_weixin_id','claim_name','claim_date','category']
    # list_display=['claim_count','claim_name','claim_date','category',"approval_status"]
    list_display=['id','claim_date','category',"approval_status","get_desc"]

    # search_fields =('claim_count','claim_name','claim_date','category',"approval_status")
    fieldsets = [
       ('用户数据', {'fields': ['claim_date','category',"approval_status"], 'classes': ['collapse']}),
    ]
    list_display_links = ('id',)
    list_per_page = 15
    actions = ["supervisor_approval",'director_approval',"admin_approval",'issued_asset','rejectted']

    # 获取物品清单列表
    def get_desc(self, obj):
        if obj.id is not None:
            claim_list = [Claimlist.objects.filter(id = cl.claimlist_id) for cl in MappingClaimLisToRecord.objects.filter(claimrecord_id=obj.id)]
            return [ (("%s %s") % (cl[0].claim_name,cl[0].claim_count)) for cl in claim_list]
        else:
            return "-"
    get_desc.short_description = "物品清单"

    

    # 不同权限的用户查看不同状态的申请记录
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser is not True:
            if request.user.has_perm("AppModel.supervisor_approval"):
                return qs.filter(approval_status="0")
            if request.user.has_perm("AppModel.director_approval"):
                return qs.filter(approval_status="1")
            if request.user.has_perm("AppModel.admin_approval"):
                return qs.filter(approval_status__in=["2",'3','4'] )
        else:
            return qs


    # 获取该用户对领取状态的操作权限
    def get_actions(self, request):
        actions = super().get_actions(request)
        if  request.user.is_superuser is not True:
            if request.user.has_perm("AppModel.supervisor_approval"):
                del actions['director_approval']
                del actions['admin_approval']
                del actions['issued_asset']
            if request.user.has_perm("AppModel.director_approval"):
                del actions['supervisor_approval']
                del actions["admin_approval"]
                del actions['issued_asset']
            if request.user.has_perm("AppModel.admin_approval"):
                del actions['director_approval']
                del actions['supervisor_approval']
        return actions
    # 主管审批
    def supervisor_approval(self, request, queryset):
        # 根据申请物品数量是否超过上限来更改status为 1或 2
        rows_updated = queryset.update(approval_status='2')
        if rows_updated == 1:
            message_bit = "1 条领用申请"
        else:
            message_bit = "%s 条领用申请" % rows_updated
        self.message_user(request, " %s 成功审批." % message_bit ,level=messages.SUCCESS)
        # messages.add_message(request, messages.success," %s 成功审批." % message_bit)
    supervisor_approval.short_description = "主管审批通过"
    # 主任审批
    def director_approval(self, request, queryset):
        rows_updated = queryset.update(approval_status='2')
        if rows_updated == 1:
            message_bit = "1 条领用申请"
        else:
            message_bit = "%s 条领用申请" % rows_updated
        self.message_user(request,"%s 成功审批." % message_bit, level=messages.SUCCESS)
    director_approval.short_description = "主任审批通过"

    # 管理员审批
    def admin_approval(self, request, queryset):
        rows_updated = queryset.update(approval_status='3')
        if rows_updated == 1:
            message_bit = "1 条领用申请"
        else:
            message_bit = "%s 条领用申请" % rows_updated
        self.message_user(request,"%s 成功审批." % message_bit, level=messages.SUCCESS)
    admin_approval.short_description = "管理员审批通过"

    # 管理员发放
    def issued_asset(self, request, queryset):
        rows_updated = queryset.update(approval_status='4')
        if rows_updated == 1:
            message_bit = "1 条领用申请"
        else:
            message_bit = "%s 条领用申请" % rows_updated
        self.message_user(request,"%s 成功发放." % message_bit, level=messages.SUCCESS)
    issued_asset.short_description = "已发放"

    # 未通过审批
    def rejectted(self, request, queryset):
        rows_updated = queryset.update(approval_status='5')
        if rows_updated == 1:
            message_bit = "1 条领用申请"
        else:
            message_bit = "%s 条领用申请" % rows_updated
        self.message_user(request," %s 成功拒绝." % message_bit, level=messages.SUCCESS)
    rejectted.short_description = "拒绝审批"

    


# 用户管理
@admin.register(UserInfo)
class UserInfoAdmin(ImportExportModelAdmin): 
    list_display=['id','nick_name','user_name','weixin_openid','phone_number','category','auth']
    search_fields =('nick_name','user_name','weixin_openid','phone_number','category','auth')
    fieldsets = [
       ('用户数据', {'fields': ['nick_name','user_name','weixin_openid','phone_number','category','auth'], 'classes': ['collapse']}),
    ]
    list_per_page = 15




# 组织机构设置
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['name','category','createtime','createuser','connected_number','slug']
    list_per_page = 10

admin.site.register(Category , MPTTModelAdmin)


admin.site.register(CommodityCategory , MPTTModelAdmin)
# @admin.register(CommodityCategory)
# class CommodityCategoryAdmin(admin.ModelAdmin):
#     list_display = ['name','parent','slug','image']
#     list_per_page = 10

admin.site.site_title = "物品申领后台管理"
admin.site.site_header = "物品申领"


