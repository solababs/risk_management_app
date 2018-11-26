from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import RiskTypes, FieldTypes
from cerberus import Validator


class RiskTypesSerializer(serializers.ModelSerializer):
    """
        RiskTypesSerializer
    """
    class Meta:
        model = RiskTypes
        fields = '__all__'

    def validate_fields(self, fields):
        validator = Validator(allow_unknown=True)

        schema = {
            'name': {'type': 'string', 'required': True, 'minlength': 2},
            'type': {'type': 'string', 'required': True, 'minlength': 2},
            'values': [
                {
                    'key': {'type': 'string', 'required': True, 'minlength': 2},
                    'value': {'type': 'string', 'required': True, 'minlength': 2}
                }
            ]
        }

        for field in fields:
            if not (validator.validate(field, schema)):
                raise ValidationError('Error in format sent')
        return fields


class FieldTypesSerializer(serializers.ModelSerializer):
    """
        FieldTypesSerializer
    """
    class Meta:
        model = FieldTypes
        fields = '__all__'




