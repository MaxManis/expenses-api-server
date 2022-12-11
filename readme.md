# XPNS Web App
> ❕ **RESTful API server for the XPNS Web App built on NodeJS, Express, PostgresSQL(cloud claster), SequelizeORM, JWT, BCrypt, Cookies, Nodemailer etc.**
---
> ❕ **Frontend for the XPNS Web App built on React + TypeScript. Bulma for main styling and SASS for additional styles. React-Router for routing. Redux for state management.**

- [XPNS Web App](https://drab-cyan-chinchilla-slip.cyclic.app) 👀

## 🟢 Parts of application:
- [FrontEnd source code](https://github.com/MaxManis/accounting-app-front-end-side)
- [BackEnd REST API](https://github.com/MaxManis/expenses-api-server)
- [Client side server](https://github.com/MaxManis/xpns-accounting-app-client-side-server)
- [Deployed XPNS Web App](https://drab-cyan-chinchilla-slip.cyclic.app)
-----
## XPNS API Server (with Node.js(Express) and cloud claster of PostgresSQL)
> ⚠️ **This repository contains only backend RESTful API of XPNS App. Other parts of application are in other repositories**

### API Endpoints:

#### **users:**
- /users/registration | POST - user registration.
- /users/activation/:token | GET - user account activation using token from email.
- /users/login | POST - user login.
- /users/logout | GET - user logout.

#### **expenses (protected with auth middleware):**
- /expenses | GET - Get all expenses.
- /expenses?userid=1&category=Cars | GET - Get all expenses with a specified params.
- /expenses | POST - Create new expense.
- /categories/[id] | PATCH - Update one expense.
- /categories/[id] | DELETE - Delete one expense.

#### **categories:**
- /categories | GET - Get all categories.
- /categories/[id] | GET - Get categories for one user.
- /categories | POST - Create new category.
- /categories/[id] | DELETE - Delete one category.
