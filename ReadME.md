# Description
The need to create dynamic fields that are flexible is essential for modern day applications as different needs and 
scenerios tend to arise which will make some operations i.e. changing database structure to accomodate new and existing 
structures; very expensive.

This application is an approach in providing a solution to the above mentioned problem. 

There are 3 tables in the database used here 
##### FieldTypes 
This stores the allowed datatypes for the fields being created
##### RiskTypes
This stores the risk name and the fields/attributes for this type of risk
##### Risks
This stores all the risks and their their data as it matches the associated risk type


## Entity Relationship Diagram
![Image showing entity relationship](https://github.com/solababs/risk_management_app/blob/master/risk_management_app/Risks_ERD.png?raw=true "Entity Relationship Diagram")


# Setup 
- `git clone https://github.com/solababs/risk_management_app.git`
- `cd risk_management_app/`
- `virtualenv -p python3 env`
- `source env/bin/activate`
- `pip3 install -r requirements.txt`
- Edit settings in `risk_management_app/config/settings.ini`
- `python manage.py migrate`
- `python manage.py runserver`

To create Entity Relationship Diagram of models run the following command
`python manage.py graph_models -a -I Risks,RiskTypes,FieldTypes -o Risks_ERD.png`


## Test
- Run `pytest -v`

## Tools
- Django Rest Framework
- React JS
- Postgres

## Authors
* **Babatunde Olusola**


## Live Demo
- [Demo](https://risk-management-app.herokuapp.com)
- [Documentation](https://risk-management-app.herokuapp.com/docs/)

