from rest_framework.generics import ListAPIView, ListCreateAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import RiskTypesSerializer, FieldTypesSerializer
from .models import RiskTypes, FieldTypes


class RiskTypesView(ListCreateAPIView):
    """
        Endpoint to return all risk types
    """
    serializer_class = RiskTypesSerializer
    authentication_classes = ()
    permission_classes = ()
    queryset = RiskTypes.objects.all()


class FieldTypesView(ListCreateAPIView):
    """
        Endpoint to return all field types
    """
    serializer_class = FieldTypesSerializer
    authentication_classes = ()
    permission_classes = ()
    queryset = FieldTypes.objects.all()


