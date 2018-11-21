from rest_framework.generics import ListAPIView
from rest_framework import status

from .serializers import RiskTypesSerializer
from .models import RiskTypes
# from utils.utils import CustomPagination


class RiskTypesView(ListAPIView):
    """
        Endpoint to return all risk types
    """
    serializer_class = RiskTypesSerializer
    authentication_classes = ()
    permission_classes = ()
    queryset = RiskTypes.objects.all()



