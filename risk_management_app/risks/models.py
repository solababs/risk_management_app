from django.db import models
import uuid
from django.contrib.postgres.fields import JSONField
from django.utils.translation import ugettext_lazy as _


class FieldTypes(models.Model):
    """
        FieldTypes
        Model structure for all available field data types
        names e.g. Text, Number, Boolean, DateTime, Enum
    """
    id = models.UUIDField(_('ID'), default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    name = models.CharField(_('Name'), max_length=255, blank=False, unique=True)

    def __str__(self):
        return self.name


class RiskTypes(models.Model):
    """
        RiskTypes
        Model structure for all available risk types
        fields e.g. [{name: field_name, type: field_type}]
            field.name => name of the field
            field.type => data type of the field
    """
    id = models.UUIDField(_('ID'), default=uuid.uuid4, primary_key=True, editable=False, unique=True)
    name = models.CharField(_('Name'), max_length=255, blank=False, unique=True)
    fields = JSONField(null=False)

    def __str__(self):
        return self.name





