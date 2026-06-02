from django.db import models


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Newsletter Subscriber'
        verbose_name_plural = 'Newsletter Subscribers'
        ordering = ['-subscribed_at']

    def __str__(self):
        return self.email


class PopupBanner(models.Model):
    """Admin can control the popup image and text from Django admin."""
    title = models.CharField(max_length=200, default='Subscribe Newsletter')
    subtitle = models.CharField(
        max_length=500,
        default='Subscribe the TheMart to get latest products and discount update.'
    )
    image = models.ImageField(upload_to='popup/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Popup Banner'
        verbose_name_plural = 'Popup Banners'

    def __str__(self):
        return self.title
