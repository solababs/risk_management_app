from django.db import models
import uuid
from django.contrib.postgres.fields import JSONField
from django.utils.translation import ugettext_lazy as _


class RiskTypes(models.Model):
    """
        RiskTypes
        Model structure for all available risk types
    """
    id = models.UUIDField(_('ID'), default=uuid.uuid4, primary_key=True, editable=False)
    name = models.CharField(_('Name'), max_length=255, blank=False)
    format = JSONField() # {field_name: value_type, field_name: value_type}


class Risks(models.Model):
    """
        Risks
        Model structure for all available risks
    """
    id = models.UUIDField(_('ID'), default=uuid.uuid4, primary_key=True, editable=False)
    risk_type = models.ForeignKey(RiskTypes, on_delete=models.CASCADE)
    format = JSONField()  # {name: 'sola', address: '20 ebinpejo lane'}



