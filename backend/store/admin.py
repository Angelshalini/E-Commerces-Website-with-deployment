from django.contrib import admin
from .models import Category, Brand, Product, ProductImage, HeroSlide, DealOfDay, BrandNewItem, Banner


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display  = ['name', 'slug', 'parent', 'item_count', 'is_active', 'order']
    list_editable = ['is_active', 'order']
    prepopulated_fields = {'slug': ('name',)}
    list_filter   = ['is_active', 'parent']
    search_fields = ['name']


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display  = ['name', 'is_active', 'order']
    list_editable = ['is_active', 'order']
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display  = ['name', 'category', 'price', 'stock_status', 'is_best_seller', 'is_new', 'is_featured', 'is_deal_of_day', 'is_active', 'order']
    list_editable = ['stock_status', 'is_best_seller', 'is_new', 'is_featured', 'is_deal_of_day', 'is_active', 'order']
    list_filter   = ['category', 'stock_status', 'is_best_seller', 'is_new', 'is_featured', 'is_active']
    search_fields = ['name', 'description']
    inlines       = [ProductImageInline]
    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'category', 'brand', 'image', 'description')
        }),
        ('Pricing', {
            'fields': ('price', 'old_price', 'save_amount')
        }),
        ('Shipping & Stock', {
            'fields': ('free_shipping', 'free_gift', 'shipping_cost', 'stock_status')
        }),
        ('Flags', {
            'fields': ('is_best_seller', 'is_new', 'is_popular', 'is_featured', 'is_deal_of_day', 'is_active', 'order')
        }),
        ('Reviews', {
            'fields': ('review_count',)
        }),
    )


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display  = ['tag', 'title', 'price', 'is_active', 'order']
    list_editable = ['is_active', 'order']


@admin.register(DealOfDay)
class DealOfDayAdmin(admin.ModelAdmin):
    list_display = ['product', 'end_datetime', 'sold_count', 'total_stock', 'is_active']
    list_editable = ['is_active']


@admin.register(BrandNewItem)
class BrandNewItemAdmin(admin.ModelAdmin):
    list_display  = ['title', 'is_active', 'order']
    list_editable = ['is_active', 'order']


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display  = ['banner_type', 'title', 'is_active']
    list_editable = ['is_active']


from .models import (FashionProduct, JewelleryProduct, GiftCategory,
                     SpecialGift, PerfumeProduct, BlogPost,
                     DealsOfMonthItem, InstagramPhoto, Testimonial, ProductListItem)

@admin.register(FashionProduct)
class FashionProductAdmin(admin.ModelAdmin):
    list_display  = ['name','cat','price','stars','badge','is_active','order']
    list_editable = ['is_active','order']
    list_filter   = ['cat','is_active']
    search_fields = ['name']

@admin.register(JewelleryProduct)
class JewelleryProductAdmin(admin.ModelAdmin):
    list_display  = ['name','cat','price','stars','badge','is_active','order']
    list_editable = ['is_active','order']
    list_filter   = ['cat']

@admin.register(GiftCategory)
class GiftCategoryAdmin(admin.ModelAdmin):
    list_display  = ['label','order','is_active']
    list_editable = ['order','is_active']

@admin.register(SpecialGift)
class SpecialGiftAdmin(admin.ModelAdmin):
    list_display  = ['label','order','is_active']
    list_editable = ['order','is_active']

@admin.register(PerfumeProduct)
class PerfumeProductAdmin(admin.ModelAdmin):
    list_display  = ['name','tab','price','is_active','order']
    list_editable = ['is_active','order']
    list_filter   = ['tab']

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display  = ['title','category','author','date','is_active','order']
    list_editable = ['is_active','order']

@admin.register(DealsOfMonthItem)
class DealsOfMonthAdmin(admin.ModelAdmin):
    list_display  = ['label','num','discount','end_date','is_active','order']
    list_editable = ['is_active','order']

@admin.register(InstagramPhoto)
class InstagramPhotoAdmin(admin.ModelAdmin):
    list_display  = ['id', 'order', 'is_tall', 'is_active']
    list_editable = ['is_tall', 'is_active', 'order']

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display  = ['name','role','stars','is_active']
    list_editable = ['is_active']

@admin.register(ProductListItem)
class ProductListItemAdmin(admin.ModelAdmin):
    list_display  = ['name','list_type','cat','price','stars','is_active','order']
    list_editable = ['is_active','order']
    list_filter   = ['list_type']
