from django.contrib import admin
from claimapp import views
from django.conf.urls import include, url
from django.urls import path,re_path
from django.views.static import serve
from django.conf import settings
from AppModel import admin as appadmin

urlpatterns = [
    url('admin/', admin.site.urls),
    re_path(r'^media/(?P<path>.+)$', serve, {'document_root': settings.MEDIA_ROOT}),
    
    url(r'^user_login/', views.user_login),
    url(r'^reset_password/', views.reset_password),
    # url(r'^get_user_device_index_info/', views.get_user_device_index_info),
    path('device/<int:sn>/', views.device_opt_detail),
    # path('event/<int:user_id>/<int:start_index>/<int:num>/<start_time>/<end_time>', views.event_detail),


    
    
    
    

] 
 
