# Feedback

**Requirements:**

- node.js
- MongoDB (or docker, use `docker compose up` on the backend folder)

## Backend

Run (in dev mode)

```
cd back
npm i
npm run dev
```

## Frontend

First, start the backend server (it's required to fetch the OpenApi spec)

Prepare:

```
cd front
npm i
npm run update-api-spec # fetch OpenAPI spec
npm run gen:api # generate API service
```

Run (in dev mode)

```
npm run dev
```
