from rest_framework import serializers
from .models import RiskTypes


class RiskTypesSerializer(serializers.ModelSerializer):
    """
        RiskTypesSerializer
    """
    class Meta:
        model = RiskTypes
        fields = '__all__'




