from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .test_models import RiskTypesFactory, FieldTypesFactory
from .test_serializers import RiskTypesSerializerTest, FieldTypesSerializerTest


class FieldTypesViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('risks:all_field_types')
        self.field_type = FieldTypesFactory.create()

    def test_create_field_type__invalid_data(self):
        self.assert_invalid_data_response(self.url, FieldTypesSerializerTest.INVALID_DATA_DICT)

    def test_create_field_type__valid(self):
        response = self.client.post(self.url, data=FieldTypesSerializerTest.VALID_DATA_DICT[0], format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_diseases__no_disease(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)

    def test_list_diseases__with_disease(self):
        DiseaseFactory.create()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)


class RiskTypesViewTests(APITestCase):
    def setUp(self):
        self.url = reverse('risks:all_field_types')
        self.field_type = RiskTypesFactory.create()

    def test_create_field_type__invalid_data(self):
        self.assert_invalid_data_response(self.url, RiskTypesSerializerTest.INVALID_DATA_DICT)

    def test_create_field_type__valid(self):
        response = self.client.post(self.url, data=RiskTypesSerializerTest.VALID_DATA_DICT[0], format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_diseases__no_disease(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)

    def test_list_diseases__with_disease(self):
        DiseaseFactory.create()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)




