from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _

class HomeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'home'
    verbose_name = verbose_name_plural = _('システム')