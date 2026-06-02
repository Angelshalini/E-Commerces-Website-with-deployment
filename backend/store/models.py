from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='children')
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    item_count = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='brands/')
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class Product(models.Model):
    STOCK_CHOICES = [
        ('in_stock',   'In stock'),
        ('out_stock',  'Out of stock'),
        ('pre_order',  'PRE - ORDER'),
        ('contact',    'Contact'),
    ]

    name         = models.CharField(max_length=500)
    category     = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    brand        = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, blank=True)
    image        = models.ImageField(upload_to='products/')
    price        = models.DecimalField(max_digits=10, decimal_places=2)
    old_price    = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    save_amount  = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    review_count = models.PositiveIntegerField(default=0)
    free_shipping= models.BooleanField(default=False)
    free_gift    = models.BooleanField(default=False)
    shipping_cost= models.CharField(max_length=50, blank=True)
    stock_status = models.CharField(max_length=20, choices=STOCK_CHOICES, default='in_stock')
    description  = models.TextField(blank=True)
    is_best_seller = models.BooleanField(default=False)
    is_new         = models.BooleanField(default=False)
    is_popular     = models.BooleanField(default=False)
    is_featured    = models.BooleanField(default=False)
    is_deal_of_day = models.BooleanField(default=False)
    is_active      = models.BooleanField(default=True)
    created_at     = models.DateTimeField(auto_now_add=True)
    order          = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='extra_images')
    image   = models.ImageField(upload_to='products/variants/')

    def __str__(self):
        return f"{self.product.name} - image"


class HeroSlide(models.Model):
    tag      = models.CharField(max_length=100)
    title    = models.CharField(max_length=300)
    price    = models.DecimalField(max_digits=10, decimal_places=2)
    image    = models.ImageField(upload_to='hero/')
    is_active= models.BooleanField(default=True)
    order    = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.tag


class DealOfDay(models.Model):
    product      = models.OneToOneField(Product, on_delete=models.CASCADE)
    end_datetime = models.DateTimeField()
    sold_count   = models.PositiveIntegerField(default=0)
    total_stock  = models.PositiveIntegerField(default=75)
    is_active    = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Deal of the Day'
        verbose_name_plural = 'Deals of the Day'

    def __str__(self):
        return f"Deal: {self.product.name}"


class BrandNewItem(models.Model):
    title    = models.CharField(max_length=300)
    desc     = models.CharField(max_length=500)
    image    = models.ImageField(upload_to='brandnew/')
    is_active= models.BooleanField(default=True)
    order    = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Banner(models.Model):
    BANNER_TYPES = [
        ('hero_right_top',    'Hero Right Top'),
        ('hero_right_bottom', 'Hero Right Bottom'),
        ('side_dark',         'Side Dark'),
        ('side_green',        'Side Green'),
        ('audio_cameras',     'Audios & Cameras'),
        ('gaming',            'Gaming'),
        ('office',            'Office Equipments'),
        ('top_cellphone',     'Top Cellphones'),
        ('best_laptop',       'Best Laptops'),
    ]
    banner_type = models.CharField(max_length=50, choices=BANNER_TYPES, unique=True)
    image       = models.ImageField(upload_to='banners/')
    title       = models.CharField(max_length=200, blank=True)
    subtitle    = models.CharField(max_length=200, blank=True)
    price       = models.CharField(max_length=50, blank=True)
    is_active   = models.BooleanField(default=True)

    def __str__(self):
        return self.get_banner_type_display()


class FashionProduct(models.Model):
    """Products for Women/Men/Children fashion pages."""
    GENDER_CHOICES = [
        ('Women',    'Women'),
        ('Men',      'Men'),
        ('Children', 'Children'),
    ]
    BADGE_CHOICES = [
        ('SALE', 'Sale'), ('NEW', 'New'), ('15%', '15% Off'),
        ('SALE', 'Sale'), ('HOT', 'Hot'), ('', 'None'),
    ]
    name      = models.CharField(max_length=300)
    cat       = models.CharField(max_length=20, choices=GENDER_CHOICES)
    image     = models.ImageField(upload_to='fashion/')
    images    = models.JSONField(default=list, blank=True)
    price     = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stars     = models.PositiveSmallIntegerField(default=4)
    badge     = models.CharField(max_length=10, blank=True)
    desc      = models.TextField(default='Nulla eget sem vitae eros pharetra viverra.')
    is_active = models.BooleanField(default=True)
    order     = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.cat} - {self.name}"


class JewelleryProduct(models.Model):
    CAT_CHOICES = [
        ('Earrings','Earrings'),('Necklace','Necklace'),
        ('Rings','Rings'),('Bracelets','Bracelets'),('Watches','Watches'),
    ]
    name      = models.CharField(max_length=300)
    cat       = models.CharField(max_length=20, choices=CAT_CHOICES)
    image     = models.ImageField(upload_to='jewellery/')
    price     = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stars     = models.PositiveSmallIntegerField(default=5)
    badge     = models.CharField(max_length=10, blank=True)
    desc      = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    order     = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class GiftCategory(models.Model):
    """Anniversary, Wedding, etc. gift categories for Jewellery page."""
    label     = models.CharField(max_length=100)
    image     = models.ImageField(upload_to='gifts/')
    order     = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering  = ['order']
        verbose_name_plural = 'Gift Categories'

    def __str__(self):
        return self.label


class SpecialGift(models.Model):
    """For Him / For Her / For Kids cards."""
    label     = models.CharField(max_length=100)
    image     = models.ImageField(upload_to='gifts/special/')
    order     = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label


class PerfumeProduct(models.Model):
    TAB_CHOICES = [
        ('Incense & Wood',    'Incense & Wood'),
        ('Natural Freshness', 'Natural Freshness'),
        ('Exclusive',         'Exclusive'),
    ]
    name      = models.CharField(max_length=200)
    tab       = models.CharField(max_length=30, choices=TAB_CHOICES)
    image     = models.ImageField(upload_to='perfume/')
    price     = models.DecimalField(max_digits=10, decimal_places=2, default=340)
    desc      = models.CharField(max_length=300, default='Perfect for creating a refreshing atmosphere.')
    is_active = models.BooleanField(default=True)
    order     = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title       = models.CharField(max_length=300)
    category    = models.CharField(max_length=100)
    author      = models.CharField(max_length=100, default='Admin')
    date        = models.DateField()
    image       = models.ImageField(upload_to='blog/')
    excerpt     = models.TextField(blank=True)
    is_active   = models.BooleanField(default=True)
    order       = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-date']

    def __str__(self):
        return self.title


class DealsOfMonthItem(models.Model):
    label     = models.CharField(max_length=100)
    num       = models.CharField(max_length=5)
    discount  = models.CharField(max_length=20)
    image     = models.ImageField(upload_to='deals_month/')
    end_date  = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    order     = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label


class InstagramPhoto(models.Model):
    image     = models.ImageField(upload_to='instagram/')
    is_tall   = models.BooleanField(default=False)
    order     = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Instagram photo {self.order}"


class Testimonial(models.Model):
    name      = models.CharField(max_length=100)
    role      = models.CharField(max_length=100)
    text      = models.TextField()
    stars     = models.PositiveSmallIntegerField(default=5)
    image     = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.role}"


class ProductListItem(models.Model):
    """For ProductLists component: New Arrivals / Trending / Top Rated tabs."""
    LIST_CHOICES = [
        ('new_arrivals', 'New Arrivals'),
        ('trending',     'Trending'),
        ('top_rated',    'Top Rated'),
    ]
    list_type = models.CharField(max_length=20, choices=LIST_CHOICES)
    name      = models.CharField(max_length=300)
    cat       = models.CharField(max_length=100)
    image     = models.ImageField(upload_to='product_lists/')
    price     = models.DecimalField(max_digits=10, decimal_places=2)
    old_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stars     = models.PositiveSmallIntegerField(default=4)
    is_active = models.BooleanField(default=True)
    order     = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['list_type', 'order']

    def __str__(self):
        return f"{self.list_type} - {self.name}"
