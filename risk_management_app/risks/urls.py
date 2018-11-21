from django.urls import path
from .views import RiskTypesView


app_name = 'risks'
urlpatterns = [
    path('risk-types/', RiskTypesView.as_view(), name='all_risk_types')
]

