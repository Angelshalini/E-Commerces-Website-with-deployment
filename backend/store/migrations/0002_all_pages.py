from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FashionProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=300)),
                ('cat', models.CharField(choices=[('Women','Women'),('Men','Men'),('Children','Children')], max_length=20)),
                ('image', models.ImageField(upload_to='fashion/')),
                ('images', models.JSONField(blank=True, default=list)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('old_price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('stars', models.PositiveSmallIntegerField(default=4)),
                ('badge', models.CharField(blank=True, max_length=10)),
                ('desc', models.TextField(default='Nulla eget sem vitae eros pharetra viverra.')),
                ('is_active', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['order']},
        ),
        migrations.CreateModel(
            name='JewelleryProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=300)),
                ('cat', models.CharField(choices=[('Earrings','Earrings'),('Necklace','Necklace'),('Rings','Rings'),('Bracelets','Bracelets'),('Watches','Watches')], max_length=20)),
                ('image', models.ImageField(upload_to='jewellery/')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('old_price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('stars', models.PositiveSmallIntegerField(default=5)),
                ('badge', models.CharField(blank=True, max_length=10)),
                ('desc', models.TextField(blank=True)),
                ('is_active', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['order']},
        ),
        migrations.CreateModel(
            name='GiftCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='gifts/')),
                ('order', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={'ordering': ['order'], 'verbose_name_plural': 'Gift Categories'},
        ),
        migrations.CreateModel(
            name='SpecialGift',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='gifts/special/')),
                ('order', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={'ordering': ['order']},
        ),
        migrations.CreateModel(
            name='PerfumeProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('tab', models.CharField(choices=[('Incense & Wood','Incense & Wood'),('Natural Freshness','Natural Freshness'),('Exclusive','Exclusive')], max_length=30)),
                ('image', models.ImageField(upload_to='perfume/')),
                ('price', models.DecimalField(decimal_places=2, default=340, max_digits=10)),
                ('desc', models.CharField(default='Perfect for creating a refreshing atmosphere.', max_length=300)),
                ('is_active', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['order']},
        ),
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=300)),
                ('category', models.CharField(max_length=100)),
                ('author', models.CharField(default='Admin', max_length=100)),
                ('date', models.DateField()),
                ('image', models.ImageField(upload_to='blog/')),
                ('excerpt', models.TextField(blank=True)),
                ('is_active', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['order', '-date']},
        ),
        migrations.CreateModel(
            name='DealsOfMonthItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False)),
                ('label', models.CharField(max_length=100)),
                ('num', models.CharField(max_length=5)),
                ('discount', models.CharField(max_length=20)),
                ('image', models.ImageField(upload_to='deals_month/')),
                ('end_date', models.DateTimeField()),
                ('is_active', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['order']},
        ),
        migrations.CreateModel(
            name='InstagramPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='instagram/')),
                ('is_tall', models.BooleanField(default=False)),
                ('order', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={'ordering': ['order']},
        ),
        migrations.CreateModel(
            name='Testimonial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('role', models.CharField(max_length=100)),
                ('text', models.TextField()),
                ('stars', models.PositiveSmallIntegerField(default=5)),
                ('image', models.ImageField(blank=True, null=True, upload_to='testimonials/')),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductListItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False)),
                ('list_type', models.CharField(choices=[('new_arrivals','New Arrivals'),('trending','Trending'),('top_rated','Top Rated')], max_length=20)),
                ('name', models.CharField(max_length=300)),
                ('cat', models.CharField(max_length=100)),
                ('image', models.ImageField(upload_to='product_lists/')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('old_price', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('stars', models.PositiveSmallIntegerField(default=4)),
                ('is_active', models.BooleanField(default=True)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={'ordering': ['list_type', 'order']},
        ),
    ]
