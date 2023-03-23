# Blog App

Project for [Full Stack Open Databases](https://fullstackopen.com/es/part13)

## Prerequisites

- [Node](https://nodejs.org/en/download/)
- [npm](https://nodejs.org/en/download/package-manager/)
- [Docker](https://docs.docker.com/desktop/)
- [Docker Compose](https://docs.docker.com/compose/)

## Dev Mode

```bash
# start containers
docker compose -f docker-compose.dev.yml up

# down containers
docker compose -f docker-compose.dev.yml down --volumes
```

## Prod Mode

```bash
# start containers
docker compose up

# down containers
docker compose down --volumes
```

## DB Cli

```bash
# enter db container
docker exec -it <db_container_name> bash

# connect to db
psql -U <user> -d <db_name>

# run any query
select * from <table_name>;
```

## Other considerations

To execute cli.js create .env file and set variable DATABASE_URL.

Then run command:

```bash
node cli.js
```
