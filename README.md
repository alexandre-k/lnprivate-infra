# lnprivate-infra
Infrastructure related to lnprivate.network

## Generate SSL certificates

Serve all the docker containers with the usual command:

```
docker compose up --build -d
```

Then generate the SSL certificates with Let's encrypt for each domain used:

```
docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d <www.example.com>
```
