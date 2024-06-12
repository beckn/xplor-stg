# Xplor - Singular Transaction Gateway (STG)

Singular Transaction Gateway (STG) is a gateway service designed for implementing transactions across various networks. It operates through three layers, each serving distinct purposes in the transaction process:

1. **Onboarding Layer**
2. **App Layer**
3. **Protocol Layer**

## Table of Contents

- [Pre-requisites](#pre-requisites)
- [Installation](#installation)
- [Running tests](#running-tests)
- [Working](#working-of-stg)
- [Technologies](#technologies)
- [Configurations](#configurations)
- [Deployment](#deployment)
- [Branching Strategy](#branching-strategy)
- [Contributing](#contributing)

## Pre-requisites

Below is the list of services you need in order to run this service.

- [Xplor Core Engine](https://github.com.com/xplor-core-engine) to communicate between Implementation and STG.
- [Xplor Implementation Service](https://github.com/xplor-implementation) to communicate between front end and STG.

## Installation

### Clone or fork this Project

```bash
 git clone REPOSITORY_LINK
```

### Setup Environment Variables(.env)

You need to setup the values for the environment variables. Below is the list of required .env variables

```bash
MONGODB_URL=
PROTOCOL_DATABASE_URL=
MONGODB_URL=
PROTOCOL_APP_PORT=
APP_SERVICE_URL=
ONDC_PRIVATE_KEY=
ONDC_SUBSCRIBER_ID=xplor-core-nest-dev.thewitslab.com
ONDC_SUBSCRIBER_UNIQUE_KEY_ID=
APP_LAYER_PORT=
APP_SERVICE_URL=
PROTOCOL_SERVICE_URL=
CORE_SERVICE_URL=
NODE_Env=
NODE_ENV=
ONBOARDING_LAYER_PORT=
GRAFANA_SERVICE_URL=
IS_NETWORK_MOCK=
```

### Run service using Docker

Make sure you've the latest version of the docker installed in-order to run the application. Run the service with the following command

```bash
 docker compose --build
```

## Running Tests

The service has test cases for each module's service functions which you will get triggered on pushing the code to remote. You can run the test with the following command as well:

```bash
  npm test
```

## Working of STG

Singular Transaction Gateway (STG) provides a robust framework for implementing transactions across various networks, ensuring seamless communication, validation, and integration. With clearly defined layers and functionalities, STG streamlines the process of onboarding participants, handling requests, and managing protocol interactions.

![image](https://gitlab.thewitslab.com/wil-workspace/xplor/STG-nest-backend/raw/feat/develop/diagram.png)

This diagram illustrates the flow of transactions through the three layers of the Singular Transaction Gateway, depicting their interactions and responsibilities.

## App Layer

The App Layer functions as an intermediary between the Onboarding Layer and the Protocol Layer, facilitating communication with the implementation layer. It handles requests such as `/search`, `/select`, `/init`, `/confirm`, and `/status`, providing immediate acknowledgment of acceptance or rejection to the implementation layer. Following successful response emission to the implementation layer, the App Layer communicates with the Protocol Layer to collect actual responses.

**Explanation:**

- Handles incoming requests from the implementation layer and provides immediate acknowledgment.
- Utilizes endpoints such as `/on_search`, `/on_select`, `/on_init`, `/on_confirm`, and `/on_status` for communication with the Protocol Layer.
- Segregates requests based on domain and forwards them to the appropriate Protocol Layer.

## Protocol Layer

The Protocol Layer establishes connections between the App Layer and different networks, such as ONEST and ONDC. It validates request payloads for all listed domains within different networks and validates responses coming from these networks with their respective domains. Each domain has its own module with controllers handling requests and responses.

**Explanation:**

- Establishes connections between the App Layer and various networks.
- Validates request payloads and responses across different network domains.
- Utilizes modules corresponding to domain names (e.g., retail, scholarship, course, job) with controllers handling requests and responses.

## Technologies Used

- **Backend Framework:** NestJS
- **Containerization:** Docker
- **Proxy Server:** NGINX
- **Database:** MongoDB

## Configuration

System setup revolves around environment variables for ease of configuration. Key points include database settings, authentication parameters, and logging specifics. The `.env.example` file lists all necessary variables.

```bash
MONGODB_URL=
PROTOCOL_DATABASE_URL=
MONGODB_URL=
PROTOCOL_APP_PORT=
APP_SERVICE_URL=
ONDC_PRIVATE_KEY=
ONDC_SUBSCRIBER_ID=xplor-core-nest-dev.thewitslab.com
ONDC_SUBSCRIBER_UNIQUE_KEY_ID=
APP_LAYER_PORT=
APP_SERVICE_URL=
PROTOCOL_SERVICE_URL=
CORE_SERVICE_URL=
NODE_Env=
NODE_ENV=
ONBOARDING_LAYER_PORT=
GRAFANA_SERVICE_URL=
IS_NETWORK_MOCK=
```

## Deployment

Deploying the STG service can be achieved through:

- **Docker**: Create a Docker image and launch your service.
- **Kubernetes**: Use Kubernetes for scalable container management.
- **CI/CD**: Automate deployment with CI/CD tools like Jenkins, GitLab CI, or GitHub Actions.

## Branching Strategy

To maintain a clear and organized workflow, we use the following branching strategy:

1. **Feature Branches**

   - For new features:
   - Format: `feature/brief-description`
   - Example: `feature/user-authentication`, `feature/shopping-cart`

2. **Bugfix Branches**

   - For fixing bugs:
   - Format: `bugfix/brief-description`
   - Example: `bugfix/login-error`, `bugfix/cart-not-updating`

3. **Hotfix Branches**

   - For urgent fixes that need to be deployed immediately:
   - Format: `hotfix/brief-description`
   - Example: `hotfix/critical-security-patch`, `hotfix/payment-gateway`

4. **Improvement Branches**

   - For improvements or refactoring that aren't new features:
   - Format: `improvement/brief-description`
   - Example: `improvement/code-refactor`, `improvement/ui-enhancements`

5. **Release Branches**

   - For preparing a release:
   - Format: `release/version-number`
   - Example: `release/1.0.0`, `release/2.1.3`

6. **Experiment Branches**

   - For experimental features or spikes:
   - Format: `experiment/brief-description`
   - Example: `experiment/new-ui-concept`, `experiment/performance-tuning`

7. **Chore Branches**
   - For routine tasks such as updating dependencies or documentation:
   - Format: `chore/brief-description`
   - Example: `chore/update-dependencies`, `chore/add-documentation`

## Contributing

Contributions are welcomed! Please follow these steps to contribute:

#### 1. Fork the project.

#### 2. Create your feature branch (`git checkout -b feature/AmazingFeature`).

#### 3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).

#### 4. Push to the branch (`git push origin feature/AmazingFeature`).

#### 5. Open a pull request.

## License

Distributed under the MIT License. See [LICENSE.md](LICENSE.md) for more information.

## Acknowledgments

- Kudos to all contributors and the NestJS community.
- Appreciation for anyone dedicating time to enhance open-source software.
