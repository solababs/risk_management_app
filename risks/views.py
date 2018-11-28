from rest_framework.generics import ListCreateAPIView
from .serializers import RiskTypesSerializer, FieldTypesSerializer, RisksSerializer
from .models import RiskTypes, FieldTypes, Risks


class RiskTypesView(ListCreateAPIView):
    """
        Endpoint to create risk types and return all risk types
    """
    serializer_class = RiskTypesSerializer
    authentication_classes = ()
    permission_classes = ()
    queryset = RiskTypes.objects.all()


class FieldTypesView(ListCreateAPIView):
    """
        Endpoint to create field types and return all field types
    """
    serializer_class = FieldTypesSerializer
    authentication_classes = ()
    permission_classes = ()
    queryset = FieldTypes.objects.all()


class RisksView(ListCreateAPIView):
    """
            Endpoint to create risks and return all risks
        """
    serializer_class = RisksSerializer
    authentication_classes = ()
    permission_classes = ()
    queryset = Risks.objects.all()



