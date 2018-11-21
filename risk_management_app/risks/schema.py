import graphene
from graphene_django.types import DjangoObjectType
from .models import *


class RiskType(DjangoObjectType):
    """
        RiskType Object
    """
    class Meta:
        model = RiskTypes


class Query(graphene.ObjectType):
    """
        Query to return all risk types
    """
    all_risk_types = graphene.List(RiskType)

    def resolve_all_risk_types(self, info, **kwargs):
        return RiskTypes.objects.all()







