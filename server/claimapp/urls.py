from django.contrib import admin
from claimapp import views
from django.conf.urls import include, url
from django.urls import path,re_path
from django.views.static import serve
from django.conf import settings
from AppModel import admin as appadmin

urlpatterns = [
    url('admin/', admin.site.urls),
    path('weixin_sns/<js_code>', views.weixin_sns),
    path('weixin_gusi/', views.weixin_gusi),
    
    re_path(r'^media/(?P<path>.+)$', serve, {'document_root': settings.MEDIA_ROOT}),
    path('asset/', views.asset_detail),
    path('asset/<int:cid>', views.asset_by_cid),
    path('userinfo/', views.userinfo_detail),
    # path('record_list/<int:sn>', views.claim_detail),
    path('record_list/', views.claim_detail),
    path('claim_asset/<int:weixin_id>', views.claim_asset),
    path('claim_asset/', views.claim_asset),
    path('commoditycategory/', views.commoditycategory_detail),
    path('get_approval_list/', views.get_approval_list),
    path('change_approval_status/', views.change_approval_status),
    
    
    
    # url(r'^favicon\.ico/pre>, RedirectView.as_view(url=r'static/favicon.ico')),

    
    


    
    
    
    

] 
 
