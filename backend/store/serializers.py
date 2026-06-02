from rest_framework import serializers
from .models import Category, Brand, Product, ProductImage, HeroSlide, DealOfDay, BrandNewItem, Banner


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image', 'item_count', 'order']


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'logo', 'order']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']


class ProductSerializer(serializers.ModelSerializer):
    extra_images = ProductImageSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    stock_label = serializers.CharField(source='get_stock_status_display', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'category', 'category_name', 'image',
            'price', 'old_price', 'save_amount', 'review_count',
            'free_shipping', 'free_gift', 'shipping_cost',
            'stock_status', 'stock_label', 'description',
            'is_best_seller', 'is_new', 'is_popular', 'is_featured',
            'is_deal_of_day', 'extra_images', 'order',
        ]


class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = ['id', 'tag', 'title', 'price', 'image', 'order']


class DealOfDaySerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = DealOfDay
        fields = ['id', 'product', 'end_datetime', 'sold_count', 'total_stock']


class BrandNewItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrandNewItem
        fields = ['id', 'title', 'desc', 'image', 'order']


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ['id', 'banner_type', 'image', 'title', 'subtitle', 'price']


from .models import (FashionProduct, JewelleryProduct, GiftCategory,
                     SpecialGift, PerfumeProduct, BlogPost,
                     DealsOfMonthItem, InstagramPhoto, Testimonial, ProductListItem)

class FashionProductSerializer(serializers.ModelSerializer):
    class Meta:
        model  = FashionProduct
        fields = ['id','name','cat','image','price','old_price','stars','badge','desc','order']

class JewelleryProductSerializer(serializers.ModelSerializer):
    class Meta:
        model  = JewelleryProduct
        fields = ['id','name','cat','image','price','old_price','stars','badge','desc','order']

class GiftCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model  = GiftCategory
        fields = ['id','label','image','order']

class SpecialGiftSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SpecialGift
        fields = ['id','label','image','order']

class PerfumeProductSerializer(serializers.ModelSerializer):
    class Meta:
        model  = PerfumeProduct
        fields = ['id','name','tab','image','price','desc','order']

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model  = BlogPost
        fields = ['id','title','category','author','date','image','excerpt','order']

class DealsOfMonthSerializer(serializers.ModelSerializer):
    class Meta:
        model  = DealsOfMonthItem
        fields = ['id','label','num','discount','image','end_date','order']

class InstagramPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model  = InstagramPhoto
        fields = ['id','image','is_tall','order']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Testimonial
        fields = ['id','name','role','text','stars','image']

class ProductListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ProductListItem
        fields = ['id','list_type','name','cat','image','price','old_price','stars','order']
