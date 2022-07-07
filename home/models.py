from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractUser,UserManager
from django.urls import reverse_lazy

class UserManager(UserManager):
    pass

class User(AbstractUser):
    email = models.EmailField('メールアドレス', unique=False, blank=True)
    full_name = models.CharField('氏名', null=True, max_length=255,)
    class Meta:
        verbose_name = verbose_name_plural = _('アカウント')

    def get_absolute_url(self):
        return reverse_lazy("/")

    def __str__(self):
        return str(self.full_name)