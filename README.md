Fisave 
### [Link to Web App](https://networth-client.now.sh/main)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Summary: 
Fisave is a full stack web app for helping people track their networth over time. 

### Technologies Used: 
Front-end: 
React 
Javascript
HTML/CSS
D3.js for data visualizations

Back-end: 
Node
Express
PostgreSQL

### Sample Login Credentials: 
user name: TestLogin
password: TestLogin1!

Use the homepage as a trial of the service before committing to a log in. 
Fill in any of the options on the form & click submit to see what your current networth is. 


![homepage](Fisave-homepage.png)

### Endpoints: 
URL


/api/advice

Method:

GET

URL Params

None

Data Params

None

Success Response:

Code: 200
Content: [ ]

URL


/api/advice:adviceid

Method:

GET

URL Params

adviceid=[integer]

Data Params

None

Success Response:

Code: 200
Content: [ ]

Code: 404 NOT FOUND
{"error":{"message":"Advice doesn't exist"}}

____________________________________________


URL


/api/calculations

Method:

GET

URL Params

None

login-credentials (username & password -strings)

None

Success Response:

Code: 200
Content: [ ]


/api/calculations

Method:

POST

URL Params

None

login-credentials (username & password -strings)

None
Success Response:

Code: 201 & URl

Code: 400 NOT FOUND
{"error":{"message":"Missing {key} in request"}}



URL


/api/calculations/calculationsid

Method:

GET

URL Params

calculationsid=[integer]

Data Params

login-credentials (username & password -strings)


Success Response:

Code: 200
Content: [ ]

Code: 404 NOT FOUND
{"error":{"message":"Calculation doesn't exist"}}

DELETE

URL Params

calculationsid=[integer]

Data Params

login-credentials (username & password -strings)


Success Response:

Code: 204
Content: [ ]

_____________________________________

URL


/api/goals

Method:

GET

URL Params

None

login-credentials (username & password -strings)

None

Success Response:

Code: 200
Content: [ ]


/api/goals

Method:

POST

URL Params

None

login-credentials (username & password -strings)

None
Success Response:

Code: 201 & URl

Code: 400 NOT FOUND
{"error":{"message":"Missing {key} in request"}}


URL


/api/goals/id

Method:

GET

URL Params

id=[integer]

Data Params

login-credentials (username & password -strings)


Success Response:

Code: 200
Content: [ ]

Code: 404 NOT FOUND
{"error":{"message":"Entry doesn't exist"}}

DELETE

URL Params

id=[integer]

Data Params

login-credentials (username & password -strings)


Success Response:

Code: 204

_________________________________________

/api/wallets

Method:

GET

URL Params

None

Data Params

login-credentials (username & password -strings)

Success Response:

Code: 200
Content: [ ]

_________________________________________

/api/users

Method:

POST

URL Params

fullname, username, password=[str]

Data Params

None

Success Response:

Code: 201 & URL

Code: 400 NOT FOUND
{"error":{"message":"Missing {key} in request"}}


