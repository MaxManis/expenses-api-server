# Expenses API Server (with Node.js and PostgreSQL)

**RESTful API server for the XPNS Web App. Build on NodeJS, Express, PostgresSQL, SequelizeORM, JWT, BCrypt, Nodemailer etc.**

- [XPNS Web App](https://drab-cyan-chinchilla-slip.cyclic.app)

## Endpoints:

### **users:**
- /users/registration | POST - user registration.
- /users/activation/:token | GET - user account activation using token from email.
- /users/login | POST - user login.
- /users/logout | GET - user logout.

### **expenses:**
- /expenses | GET - Get all expenses.
- /expenses?userid=1&category=Cars | GET - Get all expenses with a specified params.
- /users/[id] | GET - Get one expense.
- /users | POST - Create new expense.
- /users/[id] | PATCH - Update one expense.
- /users/[id] | DELETE - Delete expense.

### **categories:**
- /categories | GET - Get all categories.
- /categories/[id] | GET - Get categories for one user.
- /categories | POST - Create new category.
- /categories/[id] | PATCH - Update one category.
- /categories/[id] | DELETE - Delete category.
