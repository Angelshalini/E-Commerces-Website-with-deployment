from django.contrib import admin
from .models import NewsletterSubscriber, PopupBanner


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'subscribed_at', 'is_active']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email']
    readonly_fields = ['subscribed_at']
    ordering = ['-subscribed_at']
    list_per_page = 25

    actions = ['mark_inactive', 'mark_active']

    def mark_inactive(self, request, queryset):
        queryset.update(is_active=False)
        self.message_user(request, "Selected subscribers marked as inactive.")
    mark_inactive.short_description = "Mark selected as inactive"

    def mark_active(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, "Selected subscribers marked as active.")
    mark_active.short_description = "Mark selected as active"


@admin.register(PopupBanner)
class PopupBannerAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['title']
    readonly_fields = ['created_at']
