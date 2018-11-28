from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import RiskTypes, FieldTypes, Risks
from cerberus import Validator


class RiskTypesSerializer(serializers.ModelSerializer):
    """
        RiskTypesSerializer
    """
    class Meta:
        model = RiskTypes
        fields = '__all__'

    def validate_fields(self, fields):
        allowed_field_types = FieldTypes.objects.values_list('name', flat=True)
        validator = Validator()

        schema = {
            'name': {'type': 'string', 'required': True, 'minlength': 2},
            'type': {'type': 'string', 'required': True, 'minlength': 2},
            'values': {'type': 'list', 'required': False}
        }

        schema2 = {
            'key': {'type': 'string', 'required': True, 'minlength': 2},
            'value': {'type': 'string', 'required': True, 'minlength': 2}
        }

        if len(fields) < 1:
            raise ValidationError('Fields cannot be empty')

        for field in fields:
            if not (validator.validate(field, schema)):
                raise ValidationError('Error in schema format sent')

            if field['type'] not in allowed_field_types:
                raise ValidationError('Field type not allowed')

            if field['type'] == 'Enumeration' and 'values' not in field:
                raise ValidationError('Enum fields must have values')

            if field['type'] == 'Enumeration':
                if len(field['values']) < 1:
                    raise ValidationError('Enumeration values cannot be empty')

                for value in field['values']:
                    if not (validator.validate(value, schema2)):
                        raise ValidationError('Error in enumerator values schema format sent')

        return fields


class FieldTypesSerializer(serializers.ModelSerializer):
    """
        FieldTypesSerializer
    """
    class Meta:
        model = FieldTypes
        fields = '__all__'


class RisksSerializer(serializers.ModelSerializer):
    """
        FieldTypesSerializer
    """
    class Meta:
        model = Risks
        fields = '__all__'



