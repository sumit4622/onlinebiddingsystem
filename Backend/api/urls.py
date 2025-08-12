from django.urls import path
from . import views

urlpatterns = [
    path('admin-login/', views.adminLoginView, name='admin-login'),
    path('user/register/', views.userRegistration, name='register_api'),
    path('items/upload/', views.uploadItems, name='item_upload'),
    path('items/', views.itemsUploadList, name="itemsupload-list"),
    path("items/<str:bid_code>/approve/", views.approve_bid, name="approve_bid"),
    path("items/<str:bid_code>/reject/", views.reject_bid, name="reject_bid"),
]
