from django.urls import path
from .views import SubscribeView, PopupBannerView

urlpatterns = [
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('popup/', PopupBannerView.as_view(), name='popup-banner'),
]
