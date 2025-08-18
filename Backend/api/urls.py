from django.urls import path
from . import views

urlpatterns = [
    path('admin-login/', views.adminLoginView, name='admin-login'),
    path('user/register/', views.userRegistration, name='register_api'),
    path('items/upload/', views.uploadItems, name='item_upload'),
    path('items/', views.itemsUploadList, name="itemsupload-list"),
    path("items/<int:id>/approve/", views.approve_bid, name="approve_bid"),
    path("items/<int:id>/reject/", views.reject_bid, name="reject_bid"),
]
