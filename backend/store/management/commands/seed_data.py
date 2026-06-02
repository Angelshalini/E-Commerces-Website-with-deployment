"""
Management command to seed all frontend data into the database.
Run: python manage.py seed_data
"""
import shutil
from pathlib import Path
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta

BASE_DIR        = Path(__file__).resolve().parent.parent.parent.parent
FRONTEND_IMAGES = BASE_DIR.parent / 'frontend' / 'src' / 'assets' / 'images'
MEDIA_ROOT      = BASE_DIR / 'media'


def copy_img(src_name, dest_folder):
    src = FRONTEND_IMAGES / src_name
    if not src.exists():
        return None
    dest_dir = MEDIA_ROOT / dest_folder
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / src_name
    if not dest.exists():
        shutil.copy2(src, dest)
    return f"{dest_folder}/{src_name}"


class Command(BaseCommand):
    help = 'Seed all store data into the database'

    def handle(self, *args, **kwargs):
        from store.models import (
            Category, Brand, Product, ProductImage,
            HeroSlide, DealOfDay, BrandNewItem, Banner,
            FashionProduct, JewelleryProduct, GiftCategory,
            SpecialGift, PerfumeProduct, BlogPost,
            DealsOfMonthItem, InstagramPhoto, Testimonial, ProductListItem
        )
        self.stdout.write('Seeding data...')
        self._seed_categories(Category)
        self._seed_brands(Brand)
        self._seed_hero(HeroSlide)
        self._seed_products(Product, ProductImage, Category)
        self._seed_deal(DealOfDay, Product)
        self._seed_brandnew(BrandNewItem)
        self._seed_banners(Banner)
        self._seed_fashion(FashionProduct)
        self._seed_jewellery(JewelleryProduct)
        self._seed_gifts(GiftCategory, SpecialGift)
        self._seed_perfume(PerfumeProduct)
        self._seed_blog(BlogPost)
        self._seed_deals_month(DealsOfMonthItem)
        self._seed_instagram(InstagramPhoto)
        self._seed_testimonials(Testimonial)
        self._seed_product_lists(ProductListItem)
        self.stdout.write(self.style.SUCCESS('All data seeded!'))

    def _seed_categories(self, Category):
        data = [
            {'name':'Laptops',        'slug':'laptops',        'img':'laptop.png',                    'count':74,  'order':1},
            {'name':'PC Gaming',      'slug':'pc-gaming',      'img':'pc gaming.png',                 'count':5,   'order':2},
            {'name':'Headphones',     'slug':'headphones',     'img':'headphones.png',                'count':22,  'order':3},
            {'name':'Monitors',       'slug':'monitors',       'img':'monitors.png',                  'count':28,  'order':4},
            {'name':'PC & Computers', 'slug':'pc-computers',   'img':None,                            'count':35,  'order':5},
            {'name':'Cell Phones',    'slug':'cell-phones',    'img':'top cellphone.png',             'count':74,  'order':6},
            {'name':'Tablets',        'slug':'tablets',        'img':None,                            'count':20,  'order':7},
            {'name':'Gaming & VR',    'slug':'gaming-vr',      'img':'gaming.png',                    'count':15,  'order':8},
            {'name':'Networking',     'slug':'networking',     'img':'network.jpg',                   'count':90,  'order':9},
            {'name':'Cameras',        'slug':'cameras',        'img':'DSLR camera.jpg',               'count':9,   'order':10},
            {'name':'Sounds',         'slug':'sounds',         'img':'C&O bluetooth speaker.jpg',     'count':12,  'order':11},
            {'name':'Office',         'slug':'office',         'img':'office equipments.jpg',         'count':20,  'order':12},
            {'name':'Storage, USB',   'slug':'storage-usb',    'img':None,                            'count':30,  'order':13},
            {'name':'Accessories',    'slug':'accessories',    'img':None,                            'count':29,  'order':14},
            {'name':'Clearance',      'slug':'clearance',      'img':None,                            'count':10,  'order':15},
            {'name':'Speaker',        'slug':'speaker',        'img':'C&O bluetooth speaker.jpg',     'count':12,  'order':16},
            {'name':'DSLR Camera',    'slug':'dslr-camera',    'img':'DSLR camera.jpg',               'count':9,   'order':17},
            {'name':'Chair',          'slug':'chair',          'img':'chair.jpg',                     'count':12,  'order':18},
            {'name':'Printers',       'slug':'printers',       'img':'printers.jpg',                  'count':9,   'order':19},
            {'name':'Network',        'slug':'network',        'img':'network.jpg',                   'count':90,  'order':20},
            {'name':'Earbuds',        'slug':'earbuds',        'img':'Ear buds.jpg',                  'count':5,   'order':21},
            {'name':'Microphone',     'slug':'microphone',     'img':'microphone.jpg',                'count':12,  'order':22},
            {'name':'Controller',     'slug':'controller',     'img':'controller.jpg',                'count':9,   'order':23},
            {'name':'Keyboards',      'slug':'keyboards',      'img':'keyboards.jpg',                 'count':30,  'order':24},
            {'name':'Security',       'slug':'security',       'img':'gaming.png',                    'count':12,  'order':25},
            {'name':'Projectors',     'slug':'projectors',     'img':'projectors.jpg',                'count':12,  'order':26},
            {'name':'Smart Watch',    'slug':'smart-watch',    'img':'watches.png',                   'count':18,  'order':27},
            {'name':'Smart TV',       'slug':'smart-tv',       'img':None,                            'count':10,  'order':28},
            {'name':'Mouse',          'slug':'mouse',          'img':None,                            'count':15,  'order':29},
            {'name':'Desktop',        'slug':'desktop',        'img':None,                            'count':8,   'order':30},
            {'name':'Women Fashion',  'slug':'women-fashion',  'img':'women .png',                    'count':120, 'order':31},
            {'name':'Men Fashion',    'slug':'men-fashion',    'img':'men.jpg',                       'count':85,  'order':32},
            {'name':'Perfume',        'slug':'perfume',        'img':'fragance.png',                  'count':40,  'order':33},
            {'name':'Jewellery',      'slug':'jewellery',      'img':'ring.png',                      'count':55,  'order':34},
        ]
        for c in data:
            cat, created = Category.objects.get_or_create(slug=c['slug'], defaults={
                'name': c['name'], 'item_count': c['count'], 'order': c['order']
            })
            if c['img']:
                rel = copy_img(c['img'], 'categories')
                if rel and not cat.image:
                    cat.image = rel
                    cat.save()
            if created:
                self.stdout.write(f"  + Category: {c['name']}")

    def _seed_brands(self, Brand):
        data = [
            {'name':'JAMX',     'img':'jamk.png',        'order':1},
            {'name':'Digitek',  'img':'digitek.png',     'order':2},
            {'name':'TekReact', 'img':'tek reactjs.png', 'order':3},
            {'name':'Grafbase', 'img':'grafbase.png',    'order':4},
            {'name':'MSI',      'img':'msi.png',         'order':5},
            {'name':'OhBear',   'img':'ohbear.png',      'order':6},
            {'name':'OAK',      'img':'oak.png',         'order':7},
            {'name':'Snyk',     'img':'snyk.png',        'order':8},
            {'name':'Sonex',    'img':'sonex.png',       'order':9},
            {'name':'Stropi',   'img':'stropi.png',      'order':10},
        ]
        for b in data:
            if Brand.objects.filter(name=b['name']).exists():
                continue
            rel = copy_img(b['img'], 'brands')
            if rel:
                brand = Brand(name=b['name'], order=b['order'])
                brand.logo = rel
                brand.save()
                self.stdout.write(f"  + Brand: {b['name']}")

    def _seed_hero(self, HeroSlide):
        data = [
            {'tag':'Trending Item',        'title':"WOMEN'S LATEST FASHION SALE", 'price':20.00, 'img':'Rectangle 6.jpg', 'order':1},
            {'tag':'Sale Offer',           'title':'NEW FASHION SUMMER SALE',      'price':29.99, 'img':'herobg2.png',     'order':2},
            {'tag':'Trending Accessories', 'title':'MODERN SUNGLASSES',            'price':15.00, 'img':'herobg3.png',     'order':3},
        ]
        for h in data:
            if HeroSlide.objects.filter(tag=h['tag']).exists():
                continue
            rel = copy_img(h['img'], 'hero')
            if rel:
                s = HeroSlide(tag=h['tag'], title=h['title'], price=h['price'], order=h['order'])
                s.image = rel
                s.save()
                self.stdout.write(f"  + HeroSlide: {h['tag']}")

    def _seed_products(self, Product, ProductImage, Category):
        data = [
            # ── BEST SELLERS ─────────────────────────────────────────────
            {'name':'BOSO 2 Wireless On Ear Headphone','img':'boso2 wireless.png','price':359,'old':558,'save':199,'reviews':152,'free_ship':True,'gift':True,'stock':'in_stock','bs':True,'feat':True,'cat':'headphones','order':1,'extras':['headphones.png']},
            {'name':'OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS','img':'opod pro12.png','price':569,'old':759,'save':199,'reviews':152,'free_ship':True,'stock':'in_stock','bs':True,'feat':True,'cat':'tablets','order':2},
            {'name':'uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB','img':'ulusk mini.png','price':1729,'old':2119,'save':59,'reviews':8,'free_ship':True,'stock':'out_stock','bs':True,'cat':'pc-gaming','order':3},
            {'name':'Opplo Watch Series 8 GPS + Cellular Stainless Steel Case with Milanese Loop','img':'oppolo watch.png','price':979,'shipping':'$2.98 SHIPPING','stock':'pre_order','bs':True,'cat':'accessories','order':4},
            {'name':'iSmart 24V Charger','img':'ismart 24v.png','price':9,'old':12,'save':3,'reviews':9,'shipping':'$3.98 SHIPPING','stock':'contact','bs':True,'cat':'accessories','order':5},
            # ── DEAL OF DAY ───────────────────────────────────────────────
            {'name':'Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone','img':'xioma redmi.png','price':569,'old':759,'save':199,'reviews':12,'free_ship':True,'gift':True,'stock':'in_stock','deal':True,'cat':'cell-phones','order':6,'desc':'Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core. DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory. Commanding Power Design: Twin 16+1+2 Phases Digital VRM.'},
            # ── CELL PHONES ───────────────────────────────────────────────
            {'name':'SROK Smart Phone 128GB, Oled Retina','img':'xiamoi.png','price':579,'old':859,'save':199,'free_ship':True,'stock':'in_stock','new':True,'cat':'cell-phones','order':7},
            {'name':'aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB','img':'opod pro12.png','price':979,'shipping':'$2.98 SHIPPING','stock':'in_stock','new':True,'cat':'tablets','order':8},
            {'name':'OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS (Grey)','img':'opod pro.png','price':659,'save':59,'free_ship':True,'gift':True,'stock':'in_stock','cat':'tablets','order':9},
            {'name':'Xiaomi Redmi Note 5, 64GB','img':'xioma redmi.png','price':1239,'old':1619,'free_ship':True,'stock':'contact','cat':'cell-phones','order':10},
            {'name':'Microsute Alpha Ultra S5 Surface 128GB 2022, Sliver','img':'microsute.png','price':1729,'free_ship':True,'stock':'contact','cat':'laptops','order':11},
            # ── LAPTOPS ───────────────────────────────────────────────────
            {'name':'Pineapple Macbook Pro 2022 M1 / 512 GB','img':'pineapple macbook pro.jpg','price':579,'free_ship':True,'stock':'in_stock','new':True,'cat':'laptops','order':12},
            {'name':'C&O Bluetooth Speaker','img':'C&O bluetooth speaker.jpg','price':979,'free_ship':True,'stock':'in_stock','new':True,'cat':'sounds','order':13},
            {'name':'Gigaby Custome Case, i7/ 16GB / SSD 256GB','img':'gigaby custome case, i7.jpg','price':1259,'save':59,'free_ship':True,'gift':True,'stock':'in_stock','cat':'pc-gaming','order':14},
            {'name':'BEOS PC Gaming Case','img':'Beos pc gaming case.jpg','price':1239,'old':1619,'free_ship':True,'stock':'contact','cat':'pc-gaming','order':15},
            {'name':'aMoc All-in-one Computer M1','img':'monitors.png','price':1729,'free_ship':True,'stock':'contact','cat':'laptops','order':16},
            # ── RECENTLY VIEWED ───────────────────────────────────────────
            {'name':'Xomie Remid 8 Sport Water Resitance Watch','img':'sports water watch.png','price':579,'stock':'in_stock','new':True,'cat':'accessories','order':17},
            {'name':'Microte Surface 2.0 Laptop','img':'microsute.png','price':979,'stock':'in_stock','new':True,'cat':'laptops','order':18},
            # ── FEATURED PRODUCTS ─────────────────────────────────────────
            {'name':'Noise Cancelling Headphone Pro','img':'noise cancelling headphone.png','price':299,'old':399,'save':100,'reviews':45,'free_ship':True,'stock':'in_stock','feat':True,'new':True,'cat':'headphones','order':19},
            {'name':'Logitek Bluetooth Keyboard K780','img':'logiket bluetooth keyboard.png','price':89,'old':120,'save':31,'reviews':230,'free_ship':True,'stock':'in_stock','feat':True,'cat':'keyboards','order':20},
            {'name':'Xomia Sport Water Resistance Watch','img':'sports water watch.png','price':169,'old':249,'save':80,'reviews':88,'free_ship':True,'stock':'in_stock','feat':True,'new':True,'cat':'smart-watch','order':21},
            {'name':'Okodo Hero 11+ Black Action Camera','img':'okodo hero black.png','price':169,'old':219,'save':50,'reviews':62,'free_ship':True,'stock':'in_stock','feat':True,'cat':'cameras','order':22},
            {'name':'Gaming Chair Fantasix Edition','img':'gaming chair.png','price':349,'old':499,'save':150,'reviews':34,'free_ship':True,'stock':'in_stock','feat':True,'cat':'chair','order':23},
            {'name':'Zumac Steel Mid Tower Computer Case','img':'zumac.png','price':89,'old':120,'save':31,'reviews':19,'free_ship':True,'stock':'in_stock','feat':True,'cat':'desktop','order':24},
            # ── MORE ELECTRONICS ──────────────────────────────────────────
            {'name':'Oppolo Watch Series 8 Stainless','img':'oppolo watch.png','price':1259,'old':1619,'save':360,'reviews':9,'shipping':'$2.98 SHIPPING','stock':'pre_order','pop':True,'cat':'smart-watch','order':25},
            {'name':'MSI Gaming Laptop 15"','img':'best laptop.png','price':1199,'old':1499,'save':300,'reviews':41,'free_ship':True,'stock':'in_stock','pop':True,'cat':'laptops','order':26},
            {'name':'Digital Camera Pro X1','img':'digitek.png','price':449,'old':599,'save':150,'reviews':27,'free_ship':True,'stock':'in_stock','pop':True,'cat':'dslr-camera','order':27},
            {'name':'Grafbase RGB Gaming Monitor 27"','img':'grafbase.png','price':399,'old':549,'save':150,'reviews':33,'free_ship':True,'stock':'in_stock','pop':True,'cat':'monitors','order':28},
            {'name':'Wireless Earbuds Pro','img':'boso2 wireless.png','price':59,'old':99,'save':40,'reviews':156,'free_ship':True,'stock':'in_stock','pop':True,'new':True,'cat':'earbuds','order':29},
            {'name':'Smart Home Security Camera','img':'gaming.png','price':79,'old':129,'save':50,'reviews':44,'free_ship':True,'stock':'in_stock','pop':True,'cat':'security','order':30},
            # ── WOMEN FASHION ─────────────────────────────────────────────
            {'name':'Floral Summer Dress','img':'floral.png','price':45,'old':75,'save':30,'reviews':88,'free_ship':True,'stock':'in_stock','new':True,'cat':'women-fashion','order':31},
            {'name':'Casual Everyday Wear','img':'casual.png','price':35,'reviews':56,'free_ship':True,'stock':'in_stock','cat':'women-fashion','order':32},
            {'name':'Women Party Dress','img':'women\'s party.png','price':65,'old':95,'save':30,'reviews':72,'free_ship':True,'stock':'in_stock','new':True,'cat':'women-fashion','order':33},
            {'name':'Classic Winter Jacket Women','img':'jacket.png','price':89,'old':130,'save':41,'reviews':39,'free_ship':True,'stock':'in_stock','cat':'women-fashion','order':34},
            {'name':'Running Sports Wear','img':'running.png','price':55,'reviews':47,'free_ship':True,'stock':'in_stock','cat':'women-fashion','order':35},
            # ── MEN FASHION ───────────────────────────────────────────────
            {'name':'Men Casual T-Shirt','img':'t shirt.png','price':25,'reviews':112,'free_ship':True,'stock':'in_stock','cat':'men-fashion','order':36},
            {'name':'Men Winter Jacket','img':'men\'s winter.png','price':99,'old':149,'save':50,'reviews':63,'free_ship':True,'stock':'in_stock','new':True,'cat':'men-fashion','order':37},
            {'name':'Men Yarn Pullover','img':'men yarn.png','price':45,'reviews':38,'free_ship':True,'stock':'in_stock','cat':'men-fashion','order':38},
            {'name':'Men Sports Wear','img':'sports.png','price':55,'reviews':29,'free_ship':True,'stock':'in_stock','cat':'men-fashion','order':39},
            # ── PERFUME ───────────────────────────────────────────────────
            {'name':'Floral Fragrance Perfume 100ml','img':'fragance.png','price':85,'old':120,'save':35,'reviews':94,'free_ship':True,'stock':'in_stock','new':True,'cat':'perfume','order':40},
            {'name':'Carmelita Premium Perfume','img':'carmelita.png','price':95,'reviews':67,'free_ship':True,'stock':'in_stock','cat':'perfume','order':41},
            {'name':'Goe Clavo Deodorant Spray','img':'goe-clavo.png','price':25,'reviews':43,'free_ship':True,'stock':'in_stock','cat':'perfume','order':42},
            {'name':'Frutos Fresh Fragrance','img':'frutos.png','price':45,'reviews':31,'free_ship':True,'stock':'in_stock','cat':'perfume','order':43},
            {'name':'Nature Essence Perfume','img':'nature.png','price':75,'old':110,'save':35,'reviews':55,'free_ship':True,'stock':'in_stock','cat':'perfume','order':44},
            # ── JEWELLERY ─────────────────────────────────────────────────
            {'name':'Diamond Engagement Ring','img':'ring.png','price':299,'old':450,'save':151,'reviews':28,'free_ship':True,'stock':'in_stock','cat':'jewellery','order':45},
            {'name':'Rose Gold Necklace','img':'rose gold.png','price':125,'reviews':41,'free_ship':True,'stock':'in_stock','new':True,'cat':'jewellery','order':46},
            {'name':'Platinum Band Ring','img':'platinam.png','price':189,'old':250,'save':61,'reviews':22,'free_ship':True,'stock':'in_stock','cat':'jewellery','order':47},
        ]

        for p in data:
            if Product.objects.filter(name=p['name']).exists():
                continue
            cat = Category.objects.filter(slug=p.get('cat')).first()
            rel = copy_img(p['img'], 'products')
            if not rel:
                self.stdout.write(f"  ! Missing image: {p['img']}")
                continue
            prod = Product(
                name          = p['name'],
                category      = cat,
                price         = p['price'],
                old_price     = p.get('old'),
                save_amount   = p.get('save'),
                review_count  = p.get('reviews', 0),
                free_shipping = p.get('free_ship', False),
                free_gift     = p.get('gift', False),
                shipping_cost = p.get('shipping', ''),
                stock_status  = p.get('stock', 'in_stock'),
                description   = p.get('desc', ''),
                is_best_seller= p.get('bs', False),
                is_new        = p.get('new', False),
                is_popular    = p.get('pop', False),
                is_featured   = p.get('feat', False),
                is_deal_of_day= p.get('deal', False),
                order         = p.get('order', 0),
            )
            prod.image = rel
            prod.save()
            for ex in p.get('extras', []):
                er = copy_img(ex, 'products/variants')
                if er:
                    pi = ProductImage(product=prod)
                    pi.image = er
                    pi.save()
            self.stdout.write(f"  + Product: {p['name'][:55]}")

    def _seed_deal(self, DealOfDay, Product):
        if DealOfDay.objects.exists():
            return
        deal_prod = Product.objects.filter(is_deal_of_day=True).first()
        if deal_prod:
            DealOfDay.objects.create(
                product      = deal_prod,
                end_datetime = timezone.now() + timedelta(days=2),
                sold_count   = 26,
                total_stock  = 75,
                is_active    = True,
            )
            self.stdout.write('  + Deal of the Day')

    def _seed_brandnew(self, BrandNewItem):
        data = [
            {'title':'Zumac Steel Computer Case',                              'desc':'And an option to upgrade every three years',              'img':'zumac.png',        'order':1},
            {'title':'Summer Sale 50% OFF for Foam Gaming Chair.',             'desc':'Limited time offer. Hurry up',                            'img':'microsute.png',    'order':2},
            {'title':'Summer Sale 50% OFF for Foam Gaming Chair.',             'desc':'Limited time offer. Hurry up',                            'img':'gaming chair.png', 'order':3},
            {'title':'iPed Pro Mini 6 - Powerful I in hand',                  'desc':'From $19.99/month for 36 months. $280.35 final payment',  'img':'iped .png',        'order':4},
        ]
        for item in data:
            if BrandNewItem.objects.filter(title=item['title'], order=item['order']).exists():
                continue
            rel = copy_img(item['img'], 'brandnew')
            if rel:
                bn = BrandNewItem(title=item['title'], desc=item['desc'], order=item['order'])
                bn.image = rel
                bn.save()
                self.stdout.write(f"  + BrandNew: {item['title'][:40]}")

    def _seed_banners(self, Banner):
        data = [
            {'type':'hero_right_top',    'img':'sports water watch.png', 'title':'Sport Water Resistance Watch','subtitle':'XOMIA',  'price':''},
            {'type':'hero_right_bottom', 'img':'okodo hero black.png',   'title':'OKODO HERO 11+ BLACK',        'subtitle':'FROM',   'price':'$169'},
            {'type':'side_dark',         'img':'joystick.png',           'title':'SALE',                        'subtitle':'50%',    'price':''},
            {'type':'side_green',        'img':'ipad.png',               'title':'',                            'subtitle':'',       'price':''},
            {'type':'audio_cameras',     'img':'audios & cameras.jpg',   'title':'AUDIOS & CAMERAS',            'subtitle':'',       'price':''},
            {'type':'gaming',            'img':'gaming.png',             'title':'GAMING',                      'subtitle':'',       'price':''},
            {'type':'office',            'img':'office equipments.jpg',  'title':'OFFICE EQUIPMENTS',           'subtitle':'',       'price':''},
            {'type':'top_cellphone',     'img':'top cellphone.png',      'title':'TOP CELLPHONES & TABLETS',    'subtitle':'',       'price':''},
            {'type':'best_laptop',       'img':'best laptop.png',        'title':'BEST LAPTOPS & COMPUTERS',    'subtitle':'',       'price':''},
        ]
        for b in data:
            if Banner.objects.filter(banner_type=b['type']).exists():
                continue
            rel = copy_img(b['img'], 'banners')
            if rel:
                banner = Banner(banner_type=b['type'], title=b['title'], subtitle=b['subtitle'], price=b['price'])
                banner.image = rel
                banner.save()
                self.stdout.write(f"  + Banner: {b['title'] or b['type']}")

    def _seed_fashion(self, FashionProduct):
        data = [
            # Women
            {'name':'Esprit Ruffle Shirt',     'cat':'Women','img':'ruffle shirt.png', 'price':16.64,'old':25.00,'stars':4,'badge':'SALE','order':1},
            {'name':'Herschel Supply',          'cat':'Women','img':'supply.png',       'price':35.31,'old':50.00,'stars':5,'badge':'',   'order':2},
            {'name':'Classic Trench Coat',      'cat':'Women','img':'her.png',          'price':75.00,'old':95.00,'stars':5,'badge':'',   'order':3},
            {'name':'Front Pocket Jumper',      'cat':'Women','img':'yourself.png',     'price':34.75,'old':45.00,'stars':3,'badge':'NEW','order':4},
            {'name':"Women's Hat",              'cat':'Women','img':'hat &.png',        'price':29.64,'old':40.00,'stars':5,'badge':'NEW','order':5},
            {'name':'Floral Wrap Midi Skirt',   'cat':'Women','img':'floral.png',       'price':22.00,'old':32.00,'stars':4,'badge':'SALE','order':6},
            {'name':'Floral Print Blouse',      'cat':'Women','img':'women .png',       'price':28.00,'old':38.00,'stars':4,'badge':'',   'order':7},
            {'name':'Linen Blend Blazer',       'cat':'Women','img':'women .png',       'price':68.00,'old':85.00,'stars':5,'badge':'NEW','order':8},
            {"name":"Women's Party Wear",       'cat':'Women','img':"women's party.png",'price':58.00,'old':64.00,'stars':4,'badge':'',   'order':9},
            {'name':'Shiny Dress',              'cat':'Women','img':'i1.png',           'price':95.50,'old':120.00,'stars':5,'badge':'NEW','order':10},
            {'name':'Long Dress',               'cat':'Women','img':'i2.png',           'price':95.50,'old':110.00,'stars':5,'badge':'',  'order':11},
            {'name':'Full Sweater',             'cat':'Women','img':'i3.png',           'price':95.50,'old':115.00,'stars':5,'badge':'SALE','order':12},
            # Men
            {'name':"Men's Leather Jacket",     'cat':'Men',  'img':'jacket.png',      'price':58.00,'old':85.00,'stars':3,'badge':'',   'order':13},
            {'name':'Pure Cotton Shirt',        'cat':'Men',  'img':'shirt.png',       'price':45.00,'old':56.00,'stars':3,'badge':'SALE','order':14},
            {'name':'MEN Yarn Fleece Jacket',   'cat':'Men',  'img':'men yarn.png',    'price':58.00,'old':85.00,'stars':3,'badge':'',   'order':15},
            {"name":"Men's Winter Jacket",      'cat':'Men',  'img':"men's winter.png",'price':48.00,'old':75.00,'stars':3,'badge':'15%','order':16},
            {"name":"Men's Jeans",              'cat':'Men',  'img':'men.jpg',         'price':63.15,'old':80.00,'stars':4,'badge':'',   'order':17},
            {"name":"Men's Hat",                'cat':'Men',  'img':'hime.png',        'price':54.79,'old':70.00,'stars':3,'badge':'',   'order':18},
            # Children
            {"name":"Children's Dress",         'cat':'Children','img':'child.jpg',    'price':75.00,'old':90.00,'stars':4,'badge':'',   'order':19},
            {"name":"Esprit Ruffle Kids Shirt",  'cat':'Children','img':'d1.jpg',      'price':93.20,'old':110.00,'stars':3,'badge':'SALE','order':20},
            {"name":"Children's Shorts",        'cat':'Children','img':'d2.jpg',       'price':86.85,'old':100.00,'stars':5,'badge':'NEW','order':21},
            {"name":"Kids Casual Set",          'cat':'Children','img':'d3.jpg',       'price':45.00,'old':60.00,'stars':4,'badge':'',   'order':22},
        ]
        for p in data:
            if FashionProduct.objects.filter(name=p['name'],cat=p['cat']).exists(): continue
            rel = copy_img(p['img'], 'fashion')
            if not rel: self.stdout.write(f"  ! Missing: {p['img']}"); continue
            obj = FashionProduct(name=p['name'],cat=p['cat'],price=p['price'],
                                 old_price=p.get('old'),stars=p['stars'],
                                 badge=p.get('badge',''),order=p['order'])
            obj.image = rel; obj.save()
            self.stdout.write(f"  + Fashion: {p['cat']} - {p['name']}")

    def _seed_jewellery(self, JewelleryProduct):
        data = [
            {'name':'Diamond Ring',         'cat':'Rings',    'img':'ring.png',       'price':125,'old':160,'stars':5,'badge':'NEW', 'desc':'Elegant diamond ring.','order':1},
            {'name':'Rose Gold Peacock',    'cat':'Earrings', 'img':'rose gold.png',  'price':25, 'old':30, 'stars':5,'badge':'',   'desc':'Rose gold earrings.',  'order':2},
            {'name':'Platinum Zircon Clip', 'cat':'Necklace', 'img':'platinam.png',   'price':62, 'old':85, 'stars':5,'badge':'SALE','desc':'Platinum necklace.',  'order':3},
            {'name':'Titan Gold Card',      'cat':'Bracelets','img':'titan card.png', 'price':89, 'old':110,'stars':4,'badge':'',   'desc':'Titan bracelet.',      'order':4},
            {'name':'Pocket Watch Pouch',   'cat':'Watches',  'img':'watches.png',    'price':70, 'old':86, 'stars':3,'badge':'SALE','desc':'Classic pocket watch.','order':5},
            {'name':'Smart Watch Vital',    'cat':'Watches',  'img':'smartwatch.png', 'price':58, 'old':65, 'stars':4,'badge':'',   'desc':'Smart watch.',         'order':6},
            {'name':'Gold Hoop Earrings',   'cat':'Earrings', 'img':'rose gold.png',  'price':35, 'old':48, 'stars':4,'badge':'NEW','desc':'Gold hoop earrings.',  'order':7},
            {'name':'Silver Chain Necklace','cat':'Necklace', 'img':'platinam.png',   'price':45, 'old':60, 'stars':5,'badge':'',   'desc':'Silver necklace.',     'order':8},
        ]
        for p in data:
            if JewelleryProduct.objects.filter(name=p['name']).exists(): continue
            rel = copy_img(p['img'], 'jewellery')
            if not rel: continue
            obj = JewelleryProduct(name=p['name'],cat=p['cat'],price=p['price'],
                                   old_price=p.get('old'),stars=p['stars'],
                                   badge=p.get('badge',''),desc=p.get('desc',''),order=p['order'])
            obj.image = rel; obj.save()
            self.stdout.write(f"  + Jewellery: {p['name']}")

    def _seed_gifts(self, GiftCategory, SpecialGift):
        gifts = [
            {'label':'Anniversary Gift','img':'anniversary gitf.png','order':1},
            {'label':'Wedding Gift',    'img':'wedding gift.png',    'order':2},
            {'label':'Graduation Gift', 'img':'grad gift.png',       'order':3},
            {'label':'Birthday Gift',   'img':'birthday gift.png',   'order':4},
        ]
        for g in gifts:
            if GiftCategory.objects.filter(label=g['label']).exists(): continue
            rel = copy_img(g['img'], 'gifts')
            if rel:
                obj = GiftCategory(label=g['label'],order=g['order']); obj.image = rel; obj.save()
                self.stdout.write(f"  + GiftCategory: {g['label']}")
        specials = [
            {'label':'For Him',    'img':'hime.png',     'order':1},
            {'label':'For Her',    'img':'her.png',      'order':2},
            {'label':'For Yourself','img':'yourself.png','order':3},
            {'label':'For Kids',   'img':'kids.png',     'order':4},
        ]
        for s in specials:
            if SpecialGift.objects.filter(label=s['label']).exists(): continue
            rel = copy_img(s['img'], 'gifts/special')
            if rel:
                obj = SpecialGift(label=s['label'],order=s['order']); obj.image = rel; obj.save()
                self.stdout.write(f"  + SpecialGift: {s['label']}")

    def _seed_perfume(self, PerfumeProduct):
        data = [
            {'name':'GOE',         'tab':'Incense & Wood',   'img':'Goe.png',       'price':340,'order':1},
            {'name':'GOE-CLAVO',   'tab':'Incense & Wood',   'img':'goe-clavo.png', 'price':340,'order':2},
            {'name':'JAMAREH',     'tab':'Incense & Wood',   'img':'jamerah.png',   'price':340,'order':3},
            {'name':'CERGETADE',   'tab':'Incense & Wood',   'img':'cegr.png',      'price':340,'order':4},
            {'name':'FLORAL',      'tab':'Natural Freshness','img':'floral.png',    'price':340,'order':5},
            {'name':'FRUTOS ROJOS','tab':'Natural Freshness','img':'frutos.png',    'price':340,'order':6},
            {'name':'CARMELITA',   'tab':'Natural Freshness','img':'carmelita.png', 'price':340,'order':7},
            {'name':'MANGO',       'tab':'Natural Freshness','img':'mango.png',     'price':340,'order':8},
        ]
        for p in data:
            if PerfumeProduct.objects.filter(name=p['name']).exists(): continue
            rel = copy_img(p['img'], 'perfume')
            if rel:
                obj = PerfumeProduct(name=p['name'],tab=p['tab'],price=p['price'],order=p['order']); obj.image = rel; obj.save()
                self.stdout.write(f"  + Perfume: {p['name']}")

    def _seed_blog(self, BlogPost):
        from datetime import date
        data = [
            {'title':'Family Sofa For Your Home','cat':'Furniture',  'author':'Alan Doe', 'date':date(2022,3,1), 'img':'blog-img.png',   'excerpt':'Discover the perfect family sofa.','order':1},
            {'title':'A New Trendy Furniture',   'cat':'Trending',   'author':'Alan Doe', 'date':date(2022,2,1), 'img':'blog-img(1).png','excerpt':'New trends in modern furniture.', 'order':2},
            {'title':'Best Smart Home Gadgets',  'cat':'Technology', 'author':'Alan Doe', 'date':date(2022,1,1), 'img':'blog-img(2).png','excerpt':'Top smart home gadgets of 2022.',  'order':3},
            {'title':'Fashion Trends 2022',      'cat':'Fashion',    'author':'Alan Doe', 'date':date(2021,12,1),'img':'blog-img(3).png','excerpt':'Trending fashion styles this year.','order':4},
        ]
        for p in data:
            if BlogPost.objects.filter(title=p['title']).exists(): continue
            rel = copy_img(p['img'], 'blog')
            if rel:
                obj = BlogPost(title=p['title'],category=p['cat'],author=p['author'],
                               date=p['date'],excerpt=p['excerpt'],order=p['order']); obj.image = rel; obj.save()
                self.stdout.write(f"  + Blog: {p['title']}")

    def _seed_deals_month(self, DealsOfMonthItem):
        from django.utils import timezone
        data = [
            {'label':'Spring Sale', 'num':'01','discount':'30% OFF','img':'d1.jpg','order':1},
            {'label':'Summer Deal', 'num':'02','discount':'25% OFF','img':'d2.jpg','order':2},
            {'label':'Flash Sale',  'num':'03','discount':'40% OFF','img':'d3.jpg','order':3},
            {'label':'Hot Offer',   'num':'04','discount':'20% OFF','img':'d1.jpg','order':4},
            {'label':'New Arrival', 'num':'05','discount':'15% OFF','img':'d2.jpg','order':5},
            {'label':'Clearance',   'num':'06','discount':'50% OFF','img':'d3.jpg','order':6},
        ]
        for p in data:
            if DealsOfMonthItem.objects.filter(label=p['label']).exists(): continue
            rel = copy_img(p['img'], 'deals_month')
            if rel:
                obj = DealsOfMonthItem(label=p['label'],num=p['num'],discount=p['discount'],
                                       end_date=timezone.now()+timedelta(days=30),order=p['order']); obj.image = rel; obj.save()
                self.stdout.write(f"  + DealsMonth: {p['label']}")

    def _seed_instagram(self, InstagramPhoto):
        data = [
            {'img':'insta1.png','tall':False,'order':1},
            {'img':'insta2.png','tall':True, 'order':2},
            {'img':'insta3.png','tall':False,'order':3},
            {'img':'insta4.png','tall':True, 'order':4},
            {'img':'insta5.png','tall':False,'order':5},
            {'img':'insta6.png','tall':False,'order':6},
        ]
        for p in data:
            if InstagramPhoto.objects.filter(order=p['order']).exists(): continue
            rel = copy_img(p['img'], 'instagram')
            if rel:
                obj = InstagramPhoto(is_tall=p['tall'],order=p['order']); obj.image = rel; obj.save()
                self.stdout.write(f"  + Instagram: {p['img']}")

    def _seed_testimonials(self, Testimonial):
        if Testimonial.objects.exists(): return
        Testimonial.objects.create(
            name='Alan Doe', role='CEO of Unicef', stars=5,
            text='Lorem ipsum dolor sit amet consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.'
        )
        self.stdout.write('  + Testimonial: Alan Doe')

    def _seed_product_lists(self, ProductListItem):
        data = [
            # New Arrivals
            {'type':'new_arrivals','name':'Esprit Ruffle Shirt',   'cat':'Women', 'img':'ruffle shirt.png','price':16.64,'old':25.00,'stars':4,'order':1},
            {'type':'new_arrivals','name':'MEN Yarn Fleece Jacket','cat':'Men',   'img':'men yarn.png',   'price':58.00,'old':85.00,'stars':3,'order':2},
            {'type':'new_arrivals','name':'Pocket Watch Pouch',    'cat':'Watches','img':'watches.png',   'price':70.00,'old':86.00,'stars':3,'order':3},
            {'type':'new_arrivals','name':'Rose Gold Peacock',     'cat':'Jewellery','img':'rose gold.png','price':25.00,'old':30.00,'stars':5,'order':4},
            # Trending
            {'type':'trending',   'name':"Women's Party Wear",    'cat':'Women', 'img':"women's party.png",'price':58.00,'old':64.00,'stars':4,'order':1},
            {'type':'trending',   'name':'Smart Watch Vital',     'cat':'Watches','img':'smartwatch.png', 'price':58.00,'old':65.00,'stars':4,'order':2},
            {'type':'trending',   'name':'Running Shoes',         'cat':'Sports', 'img':'running.png',    'price':49.00,'old':65.00,'stars':5,'order':3},
            {'type':'trending',   'name':'Trekking Boots',        'cat':'Sports', 'img':'trekking.png',   'price':78.00,'old':95.00,'stars':4,'order':4},
            # Top Rated
            {'type':'top_rated',  'name':'Platinum Zircon Clip',  'cat':'Jewellery','img':'platinam.png','price':62.00,'old':85.00,'stars':5,'order':1},
            {'type':'top_rated',  'name':'Classic Trench Coat',   'cat':'Women', 'img':'her.png',        'price':75.00,'old':95.00,'stars':5,'order':2},
            {'type':'top_rated',  'name':'Shiny Dress',           'cat':'Women', 'img':'i1.png',         'price':95.50,'old':120.00,'stars':5,'order':3},
            {'type':'top_rated',  'name':"Men's Leather Jacket",  'cat':'Men',   'img':'jacket.png',     'price':58.00,'old':85.00,'stars':3,'order':4},
        ]
        for p in data:
            if ProductListItem.objects.filter(name=p['name'],list_type=p['type']).exists(): continue
            rel = copy_img(p['img'], 'product_lists')
            if rel:
                obj = ProductListItem(list_type=p['type'],name=p['name'],cat=p['cat'],
                                      price=p['price'],old_price=p.get('old'),
                                      stars=p['stars'],order=p['order']); obj.image = rel; obj.save()
                self.stdout.write(f"  + ProductList ({p['type']}): {p['name']}")
