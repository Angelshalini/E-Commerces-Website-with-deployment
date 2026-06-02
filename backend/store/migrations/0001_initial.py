from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('slug', models.SlugField(unique=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='categories/')),
                ('item_count', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children', to='store.category')),
            ],
            options={'verbose_name_plural': 'Categories', 'ordering': ['order', 'name']},
        ),
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('logo', models.ImageField(upload_to='brands/')),
                ('is_active', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['order', 'name']},
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
                ('image', models.ImageField(upload_to='products/')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('old_price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('save_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('review_count', models.PositiveIntegerField(default=0)),
                ('free_shipping', models.BooleanField(default=False)),
                ('free_gift', models.BooleanField(default=False)),
                ('shipping_cost', models.CharField(blank=True, max_length=50)),
                ('stock_status', models.CharField(choices=[('in_stock', 'In stock'), ('out_stock', 'Out of stock'), ('pre_order', 'PRE - ORDER'), ('contact', 'Contact')], default='in_stock', max_length=20)),
                ('description', models.TextField(blank=True)),
                ('is_best_seller', models.BooleanField(default=False)),
                ('is_new', models.BooleanField(default=False)),
                ('is_popular', models.BooleanField(default=False)),
                ('is_featured', models.BooleanField(default=False)),
                ('is_deal_of_day', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='products', to='store.category')),
                ('brand', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.brand')),
            ],
            options={'ordering': ['order', '-created_at']},
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='products/variants/')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='extra_images', to='store.product')),
            ],
        ),
        migrations.CreateModel(
            name='HeroSlide',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=300)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('image', models.ImageField(upload_to='hero/')),
                ('is_active', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['order']},
        ),
        migrations.CreateModel(
            name='DealOfDay',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('end_datetime', models.DateTimeField()),
                ('sold_count', models.PositiveIntegerField(default=0)),
                ('total_stock', models.PositiveIntegerField(default=75)),
                ('is_active', models.BooleanField(default=True)),
                ('product', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='store.product')),
            ],
            options={'verbose_name': 'Deal of the Day', 'verbose_name_plural': 'Deals of the Day'},
        ),
        migrations.CreateModel(
            name='BrandNewItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('desc', models.CharField(max_length=500)),
                ('image', models.ImageField(upload_to='brandnew/')),
                ('is_active', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['order']},
        ),
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('banner_type', models.CharField(choices=[('hero_right_top', 'Hero Right Top'), ('hero_right_bottom', 'Hero Right Bottom'), ('side_dark', 'Side Dark'), ('side_green', 'Side Green'), ('audio_cameras', 'Audios & Cameras'), ('gaming', 'Gaming'), ('office', 'Office Equipments'), ('top_cellphone', 'Top Cellphones'), ('best_laptop', 'Best Laptops')], max_length=50, unique=True)),
                ('image', models.ImageField(upload_to='banners/')),
                ('title', models.CharField(blank=True, max_length=200)),
                ('subtitle', models.CharField(blank=True, max_length=200)),
                ('price', models.CharField(blank=True, max_length=50)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
    ]
