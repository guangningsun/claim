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
    asset_name = models.CharField(max_length=200,verbose_name='资产名称')
    asset_count = models.CharField(max_length=200,verbose_name='资产数量')

    class Meta:
        verbose_name = '资产信息'
        verbose_name_plural = '资产信息'
    

class ClaimRecord(models.Model):
    claim_username = models.CharField(max_length=200,verbose_name='申领人')
    claim_weixin_id = models.CharField(max_length=200,verbose_name='申领人微信ID')
    claim_count = models.CharField(max_length=200,verbose_name='申领数量')
    claim_phone_num = models.CharField(max_length=200,verbose_name='申领人手机')
    claim_name = models.CharField(max_length=200,verbose_name='资产名称')
    claim_date = models.DateField(default=datetime.date.today,verbose_name='申领时间')
    category = TreeForeignKey('Category',on_delete=models.CASCADE,null=True,blank=True,verbose_name='所属部门')


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


