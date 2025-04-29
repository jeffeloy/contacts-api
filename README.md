# 📞 Contacts API - GraphQL with Node.js, TypeGraphQL, Apollo Server

This project is a GraphQL API to manage mobile contacts, where each client stores their data in different databases (MySQL or MongoDB).  
Authentication is handled via JWT.

---

## 🛠️ Technologies Used

- Node.js
- TypeScript
- GraphQL
- Apollo Server (@apollo/server)
- TypeGraphQL
- Prisma (MySQL)
- Mongoose (MongoDB)
- JWT (jsonwebtoken)

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/jeffeloy/contacts-api
cd contacts-api
```

2. Create a .env file based on .env.example:

```bash
cp .env.example .env
```

3. Set your environment variables:
```env
SECRET_KEY="your_secret_key"
DATABASE_URL="mysql://root:root@mysql:3306/contacts-db"
MONGO_URI=mongodb://localhost:27017/contacts-db
```

## 🚀 Running the Project

4. Execute the project with [Docker Compose](https://docs.docker.com/compose/)
```bash
docker-compose up -d
```
This will bring up:

The API (Node.js)
MySQL
MongoDB

5. Make sure your databases are running:

6. Access the API at http://localhost:4000/graphql

## 🔐 Authentication - Generating JWT Token

Auth Route
```bash
POST http://localhost:4000/auth
```
Request Body
```json
{
  "clientId": "clientId" // clientsConfig in ./src/graphql/config/clientConfig.ts
}
  ```
Response Body
```json
{
  "token": "seu-token-jwt-aqui"
}
```

## 📚 Usage Example in GraphQL Playground
```
Authorization: Bearer seu-token-jwt-aqui
```

## ➡️ Mutation to add contacts
```graphql
mutation AddContacts($contacts: [ContactInput!]!) {
  addContacts(contacts: $contacts)
}
```
Variables
```json
{
  "contacts": [
    {
      "name": "Your Name",
      "phone": "5541999999999"
    }
  ]
}
```

## ➡️ Query to list contacts
```graphql
query {
  contacts {
    id
    name
    phone
  }
}
```

👨‍💻 Developed by

Jefferson Eloy - [LinkedIn](https://www.linkedin.com/in/jefferson-eloy/) - [GitHub](https://github.com/jeffeloy)