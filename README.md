# Books Challenge by Pedro Nicolau Carvalho
## Running Project
#### Running Docker container
### Requirements
- docker
- docker compose
- make (optional)

### How to

To run the project by deploying the 3 docker images, postgres, server application and frontend application:

- Enter server folder
```bash
cd server
```
- Create env file
```bash
cp .env.example .env
```
- Replace `SYSTEM_ADMIN_EMAIL`, `MAIL_SENDER`, `MAILJET_API_KEY` and `MAILJET_API_SECRET` to enable sending emails on upload (will log to console if not configured)

```bash
make run
```
or 
```
docker compose up -d frontend # all other services are automatically deployed due to configured depends_on
```

### Running projects locally
### Requirements
- node
- npm

# How to
## Server
- Enter project folder
```bash
cd server
```
- Create env file
```bash
cp .env.example .env
```
- Replace `SYSTEM_ADMIN_EMAIL`, `MAIL_SENDER`, `MAILJET_API_KEY` and `MAILJET_API_SECRET` to enable sending emails on upload (will log to console if not configured)
- Install dependencies
```bash
npm install
```
- Run project
```bash
npm run dev
```

## Frontend
- Enter project folder
```bash
cd frontend
```
- Install dependencies
```bash
npm install
```
- Run project
```bash
npm run dev
```

## Seed data

Books can be uploaded through the admin interface. But they can be also seeded manually. Here is a guide to call the endpoint to upload manually.

### Requirements
- httpYac vscode extension or a Jetbrains IDE

### How to

- Call "Register User" and "Upload Books" endpoints in `exampleRequests.http`

## HTTP Ports

- Frontend: 8080
- Server: 3000

## Docs

Check `docs/` for information about design choices, implementation and other technical details.

