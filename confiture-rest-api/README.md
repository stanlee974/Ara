# Ara API

## Requirements

- node
- yarn
- PostgreSQL database

## Configuration

The applicatoin requires the following environement variables.

**`DATABASE_URL`** : Connection URL for the postgre database.

**`MAILER_USER`**,
**`MAILER_PASSWORD`**,
**`MAILER_SMTP_HOST`**,
**`MAILER_SMTP_PORT`** and
**`MAILER_SMTP_SECURE`** : Email server configuration. For development purpose, you can create a debug email address at https://ethereal.email/.

**`FONT_BASE_URL`** : Base url of the client app. Used in mails. Defaults to `http://localhost:3000`.

**`AIRTABLE_ACCESS_TOKEN`** : API token used to add feeback rows on Airtable.

**`AIRTABLE_BASE_ID`**: ID of the Airtable base storing feedbacks.

**`S3_ENDPOINT`**,
**`S3_REGION`**,
**`S3_BUCKET`** and
**`S3_VIRTUAL_HOST`** : S3 Object storage configuration.

**`AWS_ACCESS_KEY_ID`** and
**`AWS_SECRET_ACCESS_KEY`** : AWS user credentials used to access S3 Object Storage.

Here's an example of a `.env` file.

```ini
DATABASE_URL="postgresql://db-user:db-password@localhost:5432/confiture-db"

MAILER_USER="username@ethereal.email"
MAILER_PASSWORD="password"
MAILER_SMTP_HOST="smtp.ethereal.email"
MAILER_SMTP_PORT=587
MAILER_SMTP_SECURE=false

FRONT_BASE_URL="http://example.com"

AIRTABLE_ACCESS_TOKEN="xxxxxxxxxxxxxxxxxxxx"
AIRTABLE_BASE_ID="xxxxxxxxxxxxxxxxxxxx"
AIRTABLE_TABLE_ID="xxxxxxxxxxxxxxxxxxxx"

S3_ENDPOINT="https://aws-endpoint.com/"
S3_REGION="region"
S3_BUCKET="my-bucket"
S3_VIRTUAL_HOST="https://my-bucket.s3.example.com/"
AWS_ACCESS_KEY_ID="xxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

## How to run

```sh
# Install dependencies
yarn install

# Run database migrations
yarn migrate:dev

# Run development server
yarn start:dev
```

## Deployment

```sh
# Deploy backend in dev environment
git push heroku <branche>:main
```

```sh
# Reset database in dev environment
DATABASE_URL="<database_url>" yarn prisma migrate reset
```

Before deploying on production environment, make sure your IP address is whitelisted on OVH. Then:

```sh
# Deploy backend in prod environment
DATABASE_URL="<database_url>" yarn prisma migrate deploy
```

## API documentation

The API routes are documented using Swagger. Go to http://localhost:4000/swagger
to see the list of available routes.
