# Generated by Django 5.2.2 on 2025-06-07 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='customiser',
            managers=[
            ],
        ),
        migrations.AlterField(
            model_name='customiser',
            name='username',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
