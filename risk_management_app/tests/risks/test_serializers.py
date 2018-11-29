import uuid

from rest_framework import status
from rest_framework.test import APITestCase
from risks.serializers import RiskTypesSerializer, FieldTypesSerializer
from .test_models import RiskTypesFactory, FieldTypesFactory
from utilities.test_utils import CustomTestCase


class FieldTypesSerializerTest(CustomTestCase, APITestCase):
    INVALID_DATA_DICT = [
        {
            'data': [
                {
                    "name": ""
                }
            ],
             'error': ('name', ['Name cannot be blank.']),
             'label': 'Name cannot be blank.',
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
        self.not_required_fields = ['description']

    def test_fields(self):
        serializer = FieldTypesSerializer()
        self.assert_fields_required(True, serializer, self.required_fields)
        self.assert_fields_required(False, serializer, self.not_required_fields)
        self.assertEqual(len(serializer.fields), len(self.required_fields) + len(self.not_required_fields))

    def test_invalid_data(self):
        serializer = FieldTypesSerializer
        FieldTypesFactory.create(name='')
        self.assert_invalid_data(serializer, self.INVALID_DATA_DICT)

    def test_valid_data(self):
        serializer = FieldTypesSerializer
        self.assert_valid_data(serializer, self.VALID_DATA_DICT)


class RiskTypesSerializerTest(CustomTestCase, APITestCase):
    INVALID_DATA_DICT = [
        {'data': [
            {
                "name": "Automobile"
            }
        ],
         'error': ('type', ['Type is required']),
         'label': 'Type is required.',
         'method': 'POST',
         'status': status.HTTP_400_BAD_REQUEST},
        {'data': [
            {
                "name": "Name",
                "type": "String"
            }
        ],
            'error': ('type', ['Field type not allowed']),
            'label': 'Field type not allowed.',
            'method': 'POST',
            'status': status.HTTP_400_BAD_REQUEST},
        {'data': [
            {
                "name": "Model",
                "type": "Enumeration",
                "values": []
            }
        ],
            'error': ('values', ['Enumeration values cannot be empty.']),
            'label': 'Enumeration values cannot be empty.',
            'method': 'POST',
            'status': status.HTTP_400_BAD_REQUEST},
        {'data': [
            {
                "name": "Model",
                "type": "Enumeration",
                "values": [
                    {
                        "key": "CMR",
                    }
                ]
            }
        ],
            'error': ('values', ['Error in enumerator values schema format sent.']),
            'label': 'Error in enumerator values schema format sent.',
            'method': 'POST',
            'status': status.HTTP_400_BAD_REQUEST},
    ]
    VALID_DATA_DICT = [
            {
                "name": "Automobile",
                "type": "Text"
            },
            {
                "name":"Address",
                "type": "Text"

            },
            {
                "name":"Age",
                "type": "Number"
            },
            {
                "name":"Model",
                "type": "Enumeration",
                "values": [
                    {
                        "key": "CMR",
                        "value": "Camry"
                    },
                    {
                        "key": "MB",
                        "value": "Mercedes Benz"
                    }
                ]
            },
            {
                "name": "Branded",
                "type": "Boolean"
            }
        ]

    def setUp(self):
        self.required_fields = ['name']
        self.not_required_fields = ['description']

    def test_fields(self):
        serializer = RiskTypesSerializer
        self.assert_fields_required(True, serializer, self.required_fields)
        self.assert_fields_required(False, serializer, self.not_required_fields)
        self.assertEqual(len(serializer.fields), len(self.required_fields) + len(self.not_required_fields))

    def test_invalid_data(self):
        serializer = RiskTypesSerializer
        RiskTypesFactory.create()
        self.assert_invalid_data(serializer, self.INVALID_DATA_DICT)

    def test_valid_data(self):
        serializer = RiskTypesSerializer
        self.assert_valid_data(serializer, self.VALID_DATA_DICT)




