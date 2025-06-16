from django.urls import path
from . import views


urlpatterns = [
    path('', views.userRegistration ,name='register_api')
]
