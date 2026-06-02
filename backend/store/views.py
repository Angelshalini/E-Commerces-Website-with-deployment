from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Category, Brand, Product, HeroSlide, DealOfDay, BrandNewItem, Banner
from .serializers import (
    CategorySerializer, BrandSerializer, ProductSerializer,
    HeroSlideSerializer, DealOfDaySerializer, BrandNewItemSerializer, BannerSerializer
)


class CategoryListView(APIView):
    def get(self, request):
        cats = Category.objects.filter(is_active=True)
        return Response(CategorySerializer(cats, many=True, context={'request': request}).data)


class BrandListView(APIView):
    def get(self, request):
        brands = Brand.objects.filter(is_active=True)
        return Response(BrandSerializer(brands, many=True, context={'request': request}).data)


class ProductListView(APIView):
    def get(self, request):
        filter_type = request.query_params.get('filter', None)
        category    = request.query_params.get('category', None)

        qs = Product.objects.filter(is_active=True)

        if filter_type == 'best_seller':
            qs = qs.filter(is_best_seller=True)
        elif filter_type == 'new':
            qs = qs.filter(is_new=True)
        elif filter_type == 'popular':
            qs = qs.filter(is_popular=True)
        elif filter_type == 'featured':
            qs = qs.filter(is_featured=True)

        if category:
            qs = qs.filter(category__slug=category)

        return Response(ProductSerializer(qs, many=True, context={'request': request}).data)


class HeroSlideListView(APIView):
    def get(self, request):
        slides = HeroSlide.objects.filter(is_active=True)
        return Response(HeroSlideSerializer(slides, many=True, context={'request': request}).data)


class DealOfDayView(APIView):
    def get(self, request):
        deal = DealOfDay.objects.filter(is_active=True).first()
        if deal:
            return Response(DealOfDaySerializer(deal, context={'request': request}).data)
        return Response({'message': 'No active deal'}, status=status.HTTP_404_NOT_FOUND)


class BrandNewItemListView(APIView):
    def get(self, request):
        items = BrandNewItem.objects.filter(is_active=True)
        return Response(BrandNewItemSerializer(items, many=True, context={'request': request}).data)


class BannerListView(APIView):
    def get(self, request):
        banners = Banner.objects.filter(is_active=True)
        return Response(BannerSerializer(banners, many=True, context={'request': request}).data)


from .models import (FashionProduct, JewelleryProduct, GiftCategory,
                     SpecialGift, PerfumeProduct, BlogPost,
                     DealsOfMonthItem, InstagramPhoto, Testimonial, ProductListItem)
from .serializers import (FashionProductSerializer, JewelleryProductSerializer,
                          GiftCategorySerializer, SpecialGiftSerializer,
                          PerfumeProductSerializer, BlogPostSerializer,
                          DealsOfMonthSerializer, InstagramPhotoSerializer,
                          TestimonialSerializer, ProductListItemSerializer)

class FashionProductListView(APIView):
    def get(self, request):
        cat = request.query_params.get('cat', None)
        qs  = FashionProduct.objects.filter(is_active=True)
        if cat and cat != 'All Products':
            qs = qs.filter(cat=cat)
        return Response(FashionProductSerializer(qs, many=True, context={'request': request}).data)

class JewelleryProductListView(APIView):
    def get(self, request):
        cat = request.query_params.get('cat', None)
        qs  = JewelleryProduct.objects.filter(is_active=True)
        if cat and cat != 'All':
            qs = qs.filter(cat=cat)
        return Response(JewelleryProductSerializer(qs, many=True, context={'request': request}).data)

class GiftCategoryListView(APIView):
    def get(self, request):
        items = GiftCategory.objects.filter(is_active=True)
        return Response(GiftCategorySerializer(items, many=True, context={'request': request}).data)

class SpecialGiftListView(APIView):
    def get(self, request):
        items = SpecialGift.objects.filter(is_active=True)
        return Response(SpecialGiftSerializer(items, many=True, context={'request': request}).data)

class PerfumeProductListView(APIView):
    def get(self, request):
        tab = request.query_params.get('tab', None)
        qs  = PerfumeProduct.objects.filter(is_active=True)
        if tab and tab != 'All Fragrances':
            qs = qs.filter(tab=tab)
        return Response(PerfumeProductSerializer(qs, many=True, context={'request': request}).data)

class BlogPostListView(APIView):
    def get(self, request):
        posts = BlogPost.objects.filter(is_active=True)
        return Response(BlogPostSerializer(posts, many=True, context={'request': request}).data)

class DealsOfMonthListView(APIView):
    def get(self, request):
        items = DealsOfMonthItem.objects.filter(is_active=True)
        return Response(DealsOfMonthSerializer(items, many=True, context={'request': request}).data)

class InstagramPhotoListView(APIView):
    def get(self, request):
        photos = InstagramPhoto.objects.filter(is_active=True)
        return Response(InstagramPhotoSerializer(photos, many=True, context={'request': request}).data)

class TestimonialListView(APIView):
    def get(self, request):
        items = Testimonial.objects.filter(is_active=True)
        return Response(TestimonialSerializer(items, many=True, context={'request': request}).data)

class ProductListItemView(APIView):
    def get(self, request):
        list_type = request.query_params.get('type', None)
        qs = ProductListItem.objects.filter(is_active=True)
        if list_type:
            qs = qs.filter(list_type=list_type)
        return Response(ProductListItemSerializer(qs, many=True, context={'request': request}).data)
