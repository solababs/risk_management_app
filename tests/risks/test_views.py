from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .test_models import RiskTypesFactory, FieldTypesFactory
from .test_serializers import RiskTypesSerializerTest, FieldTypesSerializerTest


class FieldTypesViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('risks:all_field_types')

    def test_list_field_types__no_field_types(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)

    def test_list_field_types__has_field_types(self):
        FieldTypesFactory.create()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)


class RiskTypesViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('risks:all_risk_types')

    def test_list_field_types__no_risk_types(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)

    def test_list_field_types__has_risk_types(self):
        RiskTypesFactory.create()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)




