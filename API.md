# API DOCS
Content Creator Pipeline Api Specification

## Globals
### Request
**Headers**
```
Content-Type: "application/json"
Authorization: "Bearer token"
Accept: "application/json"
```
### Response
```
{
    "message": "Validation failed",
    "errors": [
        {
            "field": "email",
            "message": "Must be a valid email address."
        },
        {
            "field": "password",
            "message": "Password must be at least 6 characters."
        }
    ]
}
```

### Response

## Register
### Request
```
POST /api/v1/auth/register


{
  "name": "somename",
  "email": "test@example.com",
  "password": "plain-text"
}
```
### Response
**Success** 201 (Created)
```
```
