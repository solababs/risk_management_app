from django.urls import path
from .views import RiskTypesView, FieldTypesView, RisksView


app_name = 'risks'
urlpatterns = [
    path('risk-types/', RiskTypesView.as_view(), name='all_risk_types'),
    path('field-types/', FieldTypesView.as_view(), name='all_field_types'),
    path('risks/', RisksView.as_view(), name='all_risks')
]

