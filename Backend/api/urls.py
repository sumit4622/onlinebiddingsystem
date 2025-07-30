from django.urls import path
from . import views

urlpatterns = [
    path('user/register/', views.userRegistration, name='register_api'),
    path('items/upload/', views.uploadItems, name='item_upload'),
]
