from django.urls import path
from .views import (
    CategoryListView, BrandListView, ProductListView,
    HeroSlideListView, DealOfDayView, BrandNewItemListView, BannerListView,
    FashionProductListView, JewelleryProductListView, GiftCategoryListView,
    SpecialGiftListView, PerfumeProductListView, BlogPostListView,
    DealsOfMonthListView, InstagramPhotoListView, TestimonialListView,
    ProductListItemView,
)

urlpatterns = [
    # Store - Electronics
    path('categories/',     CategoryListView.as_view(),      name='categories'),
    path('brands/',         BrandListView.as_view(),          name='brands'),
    path('products/',       ProductListView.as_view(),        name='products'),
    path('hero-slides/',    HeroSlideListView.as_view(),      name='hero-slides'),
    path('deal-of-day/',    DealOfDayView.as_view(),          name='deal-of-day'),
    path('brand-new/',      BrandNewItemListView.as_view(),   name='brand-new'),
    path('banners/',        BannerListView.as_view(),         name='banners'),
    # Fashion pages
    path('fashion/',        FashionProductListView.as_view(), name='fashion'),
    path('jewellery/',      JewelleryProductListView.as_view(),name='jewellery-products'),
    path('gift-categories/',GiftCategoryListView.as_view(),   name='gift-categories'),
    path('special-gifts/',  SpecialGiftListView.as_view(),    name='special-gifts'),
    path('perfume/',        PerfumeProductListView.as_view(), name='perfume'),
    # Home page sections
    path('blog/',           BlogPostListView.as_view(),       name='blog'),
    path('deals-month/',    DealsOfMonthListView.as_view(),   name='deals-month'),
    path('instagram/',      InstagramPhotoListView.as_view(), name='instagram'),
    path('testimonials/',   TestimonialListView.as_view(),    name='testimonials'),
    path('product-list/',   ProductListItemView.as_view(),    name='product-list'),
]
