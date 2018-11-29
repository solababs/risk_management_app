import factory

from django.test import TestCase
from risks.models import FieldTypes, RiskTypes, Risks


class FieldTypesFactory(factory.DjangoModelFactory):
    class Meta:
        model = FieldTypes
        django_get_or_create = ('name',)


class TestFieldTypesFactory(TestCase):
    def setUp(self):
        self.field_types = FieldTypesFactory.create(name="Text")

    def test_unicode(self):
        self.assertEqual(str(self.field_types), self.field_types.name)


class RiskTypesFactory(factory.DjangoModelFactory):
    class Meta:
        model = RiskTypes
        django_get_or_create = ('fields',)

    name = 'Accident'


class TestRiskTypesFactory(TestCase):
    def setUp(self):
        fields = [
            {
                "name":"Name",
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
        self.field_types = RiskTypesFactory.create(fields=fields)

    def test_unicode(self):
        self.assertEqual(str(self.field_types), self.field_types.name)
        for field in self.field_types.fields:
            self.assertTrue(field['name'] and field['type'])
            if field['type'] == 'Enumeration':
                self.assertIn('values', field)








