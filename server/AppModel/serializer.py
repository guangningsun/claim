from rest_framework import serializers
from AppModel.models import *
from rest_framework.decorators import api_view

# class UserSerializer(serializers.ModelSerializer):

#     # def create(self, validated_data):

#     #     print (validated_data)

#     #     # DeviceInfo.objects.filter(id=1).update(name='Google')
#     #     # return UserInfo.objects.save()
#     #     # return Userinfo.objects.save(**validated_data)

#     class Meta:
#         model = UserInfo
#         fields = ('device_sn',)


# class DeviceSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = DeviceInfo
#         fields = ('device_name','install_location','device_address')


# class InstallDeviceSerializer(serializers.ModelSerializer):
#     id = serializers.CharField(required=False)
#     deviceStatus = serializers.CharField(required=False)
#     construction_image = serializers.CharField(required=False)
#     # device_sn = serializers.CharField(required=False)
#     # device_name = serializers.CharField(required=False)
#     # construction_worker = serializers.CharField(required=False)
#     # install_location = serializers.CharField(required=False)
#     # device_address = serializers.CharField(required=False)

#     class Meta:
#         model = DeviceInfo
#         fields = ('id','construction_createtime','deviceStatus','construction_image','device_sn','device_name',\
#             'construction_worker','install_location','device_address')

