# Setup 

To create Entity Relationship Diagram of models run the following command
`python manage.py graph_models -a -I Risks,RiskTypes,FieldTypes -o Risks_ERD.png`

Pull project at

`cd risk_management_app/`

Create virtualenv

`source env/bin/activate`

`pip install -r requirements`

Edit database information as with created database

Run command `python manage.py migrate`

Run `python manage.py runserver`


##Description
This project helps in the creation of dynamic content in django.


##Tools
- Django Rest Framework
- React JS
- Postgres

## Authors

* **Babatunde Olusola**


## Live Demo
[Demo](https://risk-management-app.herokuapp.com)

