from rest_framework import serializers
from AppModel.models import *
from rest_framework.decorators import api_view


class AssetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = AssetInfo
        fields = ('asset_name','asset_count')

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserInfo
        fields = ('login_name','weixin_id','phone_number','category')

class ClaimSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ClaimRecord
        fields = ('claim_username','claim_count','claim_phone_num','claim_name','claim_date','category')