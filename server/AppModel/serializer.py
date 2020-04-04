from rest_framework import serializers
from AppModel.models import *
from rest_framework.decorators import api_view


class AssetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = AssetInfo
        fields = ('asset_name','asset_count','asset_type','asset_sn','asset_band','asset_specification','asset_unit','asset_image')

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserInfo
        fields = ('login_name','weixin_id','phone_number','category')

class ClaimSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ClaimRecord
        fields = ('claim_username','claim_count','claim_phone_num','claim_name','claim_date','category')


class CommodityCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CommodityCategory
        fields = ('id','name','parent','slug','image')