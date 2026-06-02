from rest_framework import serializers
from .models import NewsletterSubscriber, PopupBanner


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'subscribed_at']
        read_only_fields = ['id', 'subscribed_at']

    def validate_email(self, value):
        if NewsletterSubscriber.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already subscribed.")
        return value


class PopupBannerSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = PopupBanner
        fields = ['id', 'title', 'subtitle', 'image', 'image_url', 'is_active']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
