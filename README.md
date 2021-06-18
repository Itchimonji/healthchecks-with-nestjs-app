
# How To Monitor a Distributed System with a NestJS Application

Nowadays it is very important to monitor your application for availability (for example in a Kubernetes cluster) and ensure that all dependencies are achievable in order to provide the user with a maximum experience.

Additionally it is quite important to check dependencies of a service (e.g. a database or authorization system) and report their unhealtiness.

## Run the project

Run `npm install` to install all dependencies

Run `nx serve api` for starting the backend application

Run `nx serve frontend` for starting the frontend part

Default URLs are `http://localhost:3333/api/v1/metrics` for metrics and `http://localhost:3333/api/v1/health` for the healthcheck

To use the frontend part you need to enter `http://localhost:4200/`

## Docker Compose

Run `docker-compose up` for starting Prometheus and Grafana container
