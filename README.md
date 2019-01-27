## Usage instructions

start with **make run**

run the test suite with: **make test**

### Endpoints

#### POST /api/auth/register
Register a new user. Example post request body:
```javascript
{
  "role":"admin",
  "email": "shota@email.com",
  "username": "shota",
  "password": "shota123456"
}
```

#### POST /api/auth/login
get JWT token. Example patch request body:
```javascript
{
  "email": "shota@email.com",
  "password": "shota123456
}
```

#### GET /api/status
requires `x-access-token` with valid JWT token to acces

#### GET /api/auth/activate/:token
activates the user and enables login
