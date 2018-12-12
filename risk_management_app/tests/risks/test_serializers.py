import uuid

from rest_framework import status
from rest_framework.test import APITestCase
from risks.serializers import RiskTypesSerializer, FieldTypesSerializer
from .test_models import RiskTypesFactory, FieldTypesFactory
from utilities.test_utils import CustomTestCase


class FieldTypesSerializerTest(CustomTestCase, APITestCase):
    INVALID_DATA_DICT = [
        {
            'data': {"name": ""},
            'error': ('name', ['This field may not be blank.']),
            'label': 'This field may not be blank.',
            'method': 'POST',
            'status': status.HTTP_400_BAD_REQUEST
        }
    ]

    VALID_DATA_DICT = [
        {
            "name": "Text"
        }
    ]

    def setUp(self):
        self.required_fields = ['name']
        self.not_required_fields = ['id', 'description']

    def test_fields(self):
        serializer = FieldTypesSerializer()
        self.assert_fields_required(True, serializer, self.required_fields)
        self.assert_fields_required(False, serializer, self.not_required_fields)
        self.assertEqual(len(serializer.fields), len(self.required_fields) + len(self.not_required_fields))

    def test_invalid_data(self):
        serializer = FieldTypesSerializer
        self.assert_invalid_data(serializer, self.INVALID_DATA_DICT)

    def test_valid_data(self):
        serializer = FieldTypesSerializer
        self.assert_valid_data(serializer, self.VALID_DATA_DICT)


class RiskTypesSerializerTest(CustomTestCase, APITestCase):
    INVALID_DATA_DICT = [
        {
            'data': {
                "name": "Automobile",
                "description": "",
                "fields": []
            },
            'error': ('fields', ['Fields cannot be empty']),
            'label': 'Fields cannot be empty.',
            'method': 'POST',
            'status': status.HTTP_400_BAD_REQUEST},
        {
            'data': {
                "name": "Automobile",
                "description": "",
                "fields": [
                    {
                        "name": "Name",
                        "type": "String"
                    }
                ]
            },
            'error': ('fields', ['Field type not allowed']),
            'label': 'Field type not allowed.',
            'method': 'POST',
            'status': status.HTTP_400_BAD_REQUEST},
        {
            'data': {
                "name": "Automobile",
                "description": "",
                "fields": [
                    {
                        "name": "Model",
                        "type": "Enumeration",
                        "values": ""
                    }
                ]
            },
            'error': ('fields', ['Error in schema format sent']),
            'label': 'Error in schema format sent',
            'method': 'POST',
            'status': status.HTTP_400_BAD_REQUEST},
        {
            'data': {
                "name": "Automobile",
                "description": "",
                "fields": [
                    {
                        "name": "Model",
                        "type": "Enumeration",
                        "values": [
                            {
                                "key": "CMR",
                            }
                        ]
                    }
                ]
            },
            'error': ('fields', ['Field type not allowed']),
            'label': 'Field type not allowed',
            'method': 'POST',
            'status': status.HTTP_400_BAD_REQUEST},
    ]
    VALID_DATA_DICT = [
        {
            "name": "Automobile",
            "description": "",
            "fields": [
                {
                    "name": "Name",
                    "type": "Text"
                }
            ]
        },
        {
            "name": "Automobile",
            "description": "",
            "fields": [
                {
                    "name": "Name",
                    "type": "Enumeration",
                    "values": [
                        {
                            "key": "sola",
                            "value": "Sola"
                        }
                    ]
                }
            ]
        },
        {
            "name": "Automobile",
            "description": "",
            "fields": [
                {
                    "name": "Name",
                    "type": "Boolean"
                }
            ]
        }
    ]

    def setUp(self):
        self.required_fields = ['name', 'fields']
        self.not_required_fields = ['id', 'description']

    def test_fields(self):
        serializer = RiskTypesSerializer()
        self.assert_fields_required(True, serializer, self.required_fields)
        self.assert_fields_required(False, serializer, self.not_required_fields)
        self.assertEqual(len(serializer.fields), len(self.required_fields) + len(self.not_required_fields))

    def test_invalid_data(self):
        serializer = RiskTypesSerializer
        self.assert_invalid_data(serializer, self.INVALID_DATA_DICT)

    def test_valid_data(self):
        FieldTypesFactory.create(name="Text")
        FieldTypesFactory.create(name="Enumeration")
        FieldTypesFactory.create(name="Boolean")
        serializer = RiskTypesSerializer
        self.assert_valid_data(serializer, self.VALID_DATA_DICT)




