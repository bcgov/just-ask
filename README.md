# [Just Ask](https://justask.cloud)
[![Lifecycle:End-of-life](https://img.shields.io/badge/Lifecycle-End%20of%20life-orange)](https://github.com/bcgov/just-ask/)
[![Aqua Trivy Vulnerability Scanner](https://github.com/bcgov/just-ask/actions/workflows/trivy.yaml/badge.svg)](https://github.com/bcgov/just-ask/actions/workflows/trivy.yaml)

This project is end-of-life. It provides a landing page with links to instructions to join the `bcgov` and `bcgov-c` GitHub organizations. 

This project will be archived in the future.

# Local Development

## Running Web

1. `cd web && npm i`
1. `npm run start`


## Dockerfile

### Docker

```
cd web
docker build -t just-ask .`
docker run -d -p 2015:2015 just-ask-trial
```

### Podman

```
cd web
podman build -t just-ask .
podman run -d -p 2015:2015 just-ask
```

# Deployment

The project is deployed via a workflow in the [bcgov/bcgov-just-ask](https://github.com/bcgov/bcgov-just-ask) repo.

# Contributions

This project is end-of-life. Contributions are closed.


