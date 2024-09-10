# pw-practice-app-containerized

This project is a modified and lightweight version of the **Ngx-Admin** application created by [Akveo](https://www.akveo.com/). The main objective of this fork is to practice UI automation using **Playwright**, as well as to containerize the project for ease of deployment.

## Description

The original repository can be found [here](https://github.com/akveo/ngx-admin).

This fork includes:

* A more lightweight setup of the **Ngx-Admin** application.
* A containerized environment using Docker.
* Automation testing configurations using **Playwright** for UI tests.

## Prerequisites

Before you begin, ensure you have the following installed:

* [Docker](https://www.docker.com/)
* [Node.js](https://nodejs.org/en) (for local development)
* [Playwright](https://playwright.dev/) (for UI automation)

## Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/GeoLuigi/pw-practice-app-containerized.git
    cd pw-practice-app-containerized
    ```

2. **Build and run the Docker container:**
    ```bash
    docker compose up --build -d
    ```
    This will pull the necessary dependencies and run the application in a containerized environment.
    The container may take a few minutes to start. Since the command runs in detached mode, you will not see the logs. Please be patient as the exact startup time may vary depending on your machine. You can check if the application is ready by accessing `http://localhost:4200` or by looking at the logs with `docker compose logs`.

3. **Stop the Docker container:**
To stop the container, run:

    ```bash
    docker compose down
    ```
    This will stop and remove the running container without deleting the image, allowing you to restart it later.

4. **Restart the Docker container:**

    When you need to restart the application without rebuilding the image, simply run:

    ```bash
    docker compose up -d
    ```
    The application should start more quickly, but you may still need to wait a short time.

## Usage

The application will be accessible on `http://localhost:4200`. You can start automating UI interactions using Playwright or extend the project with more containerized services if needed.

## License
This project is licensed under the terms of the MIT license.
