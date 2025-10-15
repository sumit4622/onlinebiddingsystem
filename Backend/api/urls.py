from django.urls import path
from . import views

urlpatterns = [
    path('admin-login/', views.adminLoginView, name='admin-login'),
    path('user/register/', views.userRegistration, name='register_api'),
    path("user/", views.currentUser, name='current-user'),
    path('items/upload/', views.uploadItems, name='item_upload'),
    path('items/', views.itemsUploadList, name="itemsupload-list"),
    path("items/<int:id>/approve/", views.approve_bid, name="approve_bid"),
    path("items/<int:id>/reject/", views.reject_bid, name="reject_bid"),
    path('items/acceptbid/', views.place_bid, name="accept_bid"),
    path('items/<int:item_id>/latest-bid/', views.fetch_latest_bid, name='fetch-latest-bid'),
    path("items/<int:item_id>/bids/", views.getBiditemItem, name="getBiditemItem"),
    path('feedback/<int:item_id>/sendfeedback/', views.feedback, name='feedback'),
    path("feedbacks/", views.view_all_feedback, name="all-feedbacks"),
    path('items/<int:id>/', views.deleteAuction, name="itemDelete"),
    ]
