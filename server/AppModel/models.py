# -*- coding:UTF-8 -*-
from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from mptt.admin import DraggableMPTTAdmin
from feincms.module.page.models import Page
import datetime
from django.utils.html import format_html
from AppModel import *





class DeviceInfo(models.Model):
    id = models.CharField(max_length=200,verbose_name='设备ID',primary_key=True)
    device_name = models.CharField(max_length=200,verbose_name='设备名称')
    device_sn = models.CharField(max_length=200,verbose_name='设备编号')
    tenantId = models.CharField(max_length=200,verbose_name='租户Id')
    productId = models.CharField(max_length=200,verbose_name='产品Id')
    imei = models.CharField(max_length=200,verbose_name='IMEI号')
    deviceStatus = models.CharField(max_length=200,verbose_name='设备状态')
    autoObserver = models.CharField(max_length=200,verbose_name='是否订阅')
    createTime = models.CharField(max_length=200,verbose_name='创建时间')
    createBy = models.CharField(max_length=200,verbose_name='创建者')
    netStatus = models.CharField(max_length=200,verbose_name='信号强度')
    onlineAt = models.CharField(max_length=200,verbose_name='最后上线时间')
    offlineAt = models.CharField(max_length=200,verbose_name='最后离线时间')
    isOnline = models.CharField(max_length=200,verbose_name='是否已上线')
    deviceVoltageStatus = models.CharField(max_length=200,verbose_name='设备电压状态')
    lastUploadTime = models.CharField(max_length=200,verbose_name='上报时间')
    # userinfo = models.ManyToManyField(UserInfo,null=True,blank=True,verbose_name='业主姓名')
    companyinfo = models.ForeignKey('CompanyInfo',on_delete=models.CASCADE,null=True,blank=True,verbose_name='联网单位')
    construction_worker = models.CharField(max_length=200,verbose_name='施工人员')
    construction_createtime = models.DateField(default=datetime.date.today,verbose_name='施工时间')
    construction_image = models.ImageField(u'施工图片',null=True, blank=True, upload_to='contruction_image')
    install_location = models.CharField(max_length=200,verbose_name='安装位置')
    device_address = models.CharField(max_length=200,verbose_name='设备地址')
    
    class Meta:
        verbose_name = '设备信息'
        verbose_name_plural = '设备信息'
    
    def profile(self):
        return str()
    
    def __str__(self):
        return self.device_name


class UserInfo(models.Model):
    id = models.CharField(max_length=200,verbose_name='用户ID',primary_key=True)
    login_name = models.CharField(max_length=200,verbose_name='用户名')
    username = models.CharField(max_length=200,verbose_name='姓名')
    password = models.CharField(max_length=200,verbose_name='密码')
    user_permission = models.CharField(max_length=200,verbose_name='权限')
    phone_number = models.CharField(max_length=200,verbose_name='手机号')
    create_time = models.CharField(max_length=200,verbose_name='创建时间')
    description = models.CharField(max_length=200,verbose_name='用户描述')
    user_sex = models.CharField(max_length=200,verbose_name='性别')
    user_age = models.CharField(max_length=200,verbose_name='年龄')
    #device_name = models.ForeignKey(DeviceInfo,on_delete="CASCADE",null=True, blank=True,verbose_name='设备名字')
    device_sn = models.ManyToManyField(DeviceInfo,null=True, blank=True,verbose_name='设备SN')

    filter_horizontal = ('device_sn',)
    class Meta:
        verbose_name = '用户信息'
        verbose_name_plural = '用户信息'
    
    def __str__(self):
        return self.username



class MaintenanceInfo(models.Model):
    progress_status_list = (('0', u'保养中'), ('1', u'已完成'))
    problem_type_list = (('0', u'电池更换'), ('1', u'设备损坏'), ('2', u'信号不良'),('3', u'人为损坏'))
    userinfo = models.ForeignKey('UserInfo',on_delete=models.CASCADE,null=True,blank=True,verbose_name='维修人员')
    problem_desc = models.TextField(verbose_name='问题描述')
    create_time = models.DateField(default=datetime.date.today,verbose_name='问题上报时间')
    progress = models.CharField(max_length=200,choices=progress_status_list,verbose_name='解决状态')
    problem_type = models.CharField(max_length=200,choices=problem_type_list,verbose_name='问题类型')
    deviceinfo = models.ForeignKey('DeviceInfo',on_delete=models.CASCADE,null=True,blank=True,verbose_name='问题设备') 
    problem_images = models.FileField('图片', upload_to="maintenance_images")


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


