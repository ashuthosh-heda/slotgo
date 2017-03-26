# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('slotgo_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Downloads',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time_stamp', models.DateTimeField()),
                ('notes_id', models.ForeignKey(to='slotgo_app.Notes')),
                ('user_id', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
