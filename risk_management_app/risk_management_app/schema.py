import graphene
from risks.schema import Query as risk_types_query


class Query(risk_types_query):
    pass


schema = graphene.Schema(query=Query)





