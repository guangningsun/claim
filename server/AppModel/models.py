# -*- coding:UTF-8 -*-
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from mptt.admin import DraggableMPTTAdmin
from feincms.module.page.models import Page
import datetime
from django.utils.html import format_html
from AppModel import *


class UserInfo(models.Model):
    id = models.AutoField(verbose_name='用户ID',primary_key=True)
    login_name = models.CharField(max_length=200,verbose_name='用户名')
    weixin_id = models.CharField(max_length=200,verbose_name='微信ID')
    phone_number = models.CharField(max_length=200,verbose_name='手机号')
    category = TreeForeignKey('Category',on_delete=models.CASCADE,null=True,blank=True,verbose_name='所属部门')

    class Meta:
        verbose_name = '用户信息'
        verbose_name_plural = '用户信息'
    
    def __str__(self):
        return self.username


class AssetInfo(models.Model):
    asset_name = models.CharField(max_length=200,verbose_name='物品名称')
    asset_sn = models.CharField(max_length=200,verbose_name='物品编码')
    asset_type = models.CharField(max_length=200,verbose_name='物品型号')
    asset_count = models.CharField(max_length=200,verbose_name='物品库存')
    asset_band = models.CharField(max_length=200,verbose_name='物品品牌')
    asset_specification = models.CharField(max_length=200,verbose_name='物品规格')
    asset_band = models.CharField(max_length=200,verbose_name='物品品牌')
    asset_unit = models.CharField(max_length=200,verbose_name='计量单位')
    asset_image = models.ImageField(u'物品图片',null=True, blank=True, upload_to='asset_image')



    class Meta:
        verbose_name = '物品信息'
        verbose_name_plural = '物品信息'
    

class ClaimRecord(models.Model):
    STATUS_CHOICES = [
    ('0', '待主管审批'),
    ('1', '待综合办主管审批'),
    ('2', '待管理员审批'),
    ('3', '审批完成'),
    ('4', '已发放'),
    ('5', '未批准'),
    ]
    # fire_rating_number = (('0', u'一级'), ('1', u'二级'))
    # claim_username = models.CharField(max_length=200,verbose_name='申领人')
    # claim_weixin_id = models.CharField(max_length=200,verbose_name='申领人微信ID')
    claim_count = models.CharField(max_length=200,verbose_name='申领数量')
    # claim_phone_num = models.CharField(max_length=200,verbose_name='申领人手机')
    claim_name = models.CharField(max_length=200,verbose_name='物品名称')
    claim_date = models.DateField(default=datetime.date.today,verbose_name='申领时间')
    category = TreeForeignKey('Category',on_delete=models.CASCADE,null=True,blank=True,verbose_name='所属部门')
    approval_status = models.CharField(max_length=200, choices=STATUS_CHOICES,verbose_name='审批状态')

    class Meta:
        verbose_name = '领用记录'
        verbose_name_plural = '领用记录'
        # 自定义的权限，两参数分别是权限的名字和权限的描述
        permissions = (
            ("supervisor_approval", "第一主管审批"),
            ("director_approval", "办公室主任审批"),
            ("admin_approval", "管理员审批通过，等待发放"),
            ("issued_asset", "发放审批"),
            ("rejectted", "审批不通过"), 
        )


# 组织机构详细信息
class Post(models.Model):
      name = models.CharField(max_length=120,verbose_name='单位名称')
      category = TreeForeignKey('Category',on_delete=models.CASCADE,null=True,blank=True,verbose_name='上级部门')
      createtime = models.CharField(max_length=200,verbose_name='创建时间')
      createuser = models.CharField(max_length=200,verbose_name='创建者')
      connected_number = models.CharField(max_length=200,verbose_name='联系电话')
      slug = models.SlugField(verbose_name='标签')
      
      def __str__(self):
          return self.name

#物品分类
class CommodityCategory(MPTTModel):
      name = models.CharField(max_length=50, unique=True,verbose_name='名称')
      parent = TreeForeignKey('self' ,null=True, blank=True,on_delete=models.CASCADE, related_name='children', db_index=True,verbose_name='上级分类')
      slug = models.SlugField(verbose_name='标签')
      image = models.ImageField(u'物品图片',null=True, blank=True, upload_to='asset_image')
    
      class MPTTMeta:
        order_insertion_by = ['name']
    
      class Meta:
        unique_together = (('parent', 'slug',))
        verbose_name_plural = 'categories'
        verbose_name = '物品分类'
    
      def get_slug_list(self):
        try:
          ancestors = self.get_ancestors(include_self=True)
        except:
          ancestors = []
        else:
          ancestors = [ i.slug for i in ancestors]
        slugs = []
        for i in range(len(ancestors)):
          slugs.append('/'.join(ancestors[:i+1]))
        return slugs
    
      def __str__(self):
        return self.name



# 组织机构
class Category(MPTTModel):
      name = models.CharField(max_length=50, unique=True,verbose_name='名称')
      parent = TreeForeignKey('self', null=True, blank=True,on_delete=models.CASCADE, related_name='children', db_index=True,verbose_name='上级部门')
      slug = models.SlugField(verbose_name='标签')
    
      class MPTTMeta:
        order_insertion_by = ['name']
    
      class Meta:
        unique_together = (('parent', 'slug',))
        verbose_name_plural = 'categories'
        verbose_name = '组织机构'
    
      def get_slug_list(self):
        try:
          ancestors = self.get_ancestors(include_self=True)
        except:
          ancestors = []
        else:
          ancestors = [ i.slug for i in ancestors]
        slugs = []
        for i in range(len(ancestors)):
          slugs.append('/'.join(ancestors[:i+1]))
        return slugs
    
      def __str__(self):
        return self.name


