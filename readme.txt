This is a User Authentication and Authorization API built using Node.js, Express.js, and MongoDB.
It provides user signup, login, authentication using JWT tokens, and role-based access control.

Features 
User Authentication (Register/Login)
JWT-Based Authorization
Role-Based Access Control (Admin/User)
MongoDB Database Integration
Middleware for Protected Routes

API Endpoints 
1. User Authentication
method:POST 
endpoint: /api/users/register 
description:	Register a new user

method:POST 
endpoint: /api/users/login
description:	Login and Get JWT token

2. Protected Routes
method:GET
endpoint: /api/user/users 
description:	Protected user route

method:GET
endpoint: /api/admin/users 
description:	Protected admin route
