# humanode-tellr

A [Humanode](https://humanode.io/) node (humanode-peer) bioauth status reporter;
aka a "teller".

Intended to run on the same host as the Humanode node.

Serves a status report through a web server for monitoring.

An uptime keyword monitor service like [UptimeRobot](https://uptimerobot.com/)
may be used to monitor the reporter and be alerted (by email, push notification,
SMS, etc) if bioauth status becomes inactive or if the humanode-peer is down.

## Configure

Copy the environment file, then edit to your preference.

```sh
cp .env-example .env
```

## Run

### with Node.js directly

```sh
npm install
npm run start
```

### with Docker

```sh
docker compose build
docker compose up
```

# GitHub CI Workflow

This project uses GitHub CI workflow for automatic Docker image building and pushing to Docker Hub. The workflow is triggered on every push to the main branch and on every new published release.

To use this workflow, you need to have your Docker Hub username and token stored in your GitHub repository secrets. These secrets should be named DOCKERHUB_USERNAME and DOCKERHUB_TOKEN respectively.

To set these secrets, go to the "Settings" tab of your repository, select "Secrets" from the left sidebar, and click on "New repository secret".

Once these secrets are set, every time you push to the main branch, GitHub Actions will build a new Docker image and push it to your Docker Hub repository.

## Usage

Access the status report by URL. Use `AUTH` as set in `.env` within the URL.

- If using IP address: `http://$IPAddress/$AUTH/status`
- If using a domain + SSL: `https://$HOSTNAME/$AUTH/status`

Optionally report if bioauth is active but expiring within a given timeframe by
appending minutes to the URL. For example, to report if bioauth expires within
10 minutes use the URL `http://$IPAddress/$AUTH/status/10`.

### Output Format

#### bioauth is not active

`Inactive`

#### bioauth is active but expiring

`Expiring`

#### bioauth is active (example)

`{"Active":{"expires_at":1683942000000}}`

### Uptime/Keyword Monitor

- Monitor for keyword presence of "Active" (case sensitive) or "expires_at".

#### Example: UptimeRobot

![image](https://user-images.githubusercontent.com/1435589/236365721-60161603-c0df-4659-bc00-6450f125a46a.png)

## Tips

If you find this tool useful, please consider sharing some `$HMND`. Thanks! 🚀

```txt
hmsWHFeUoJqCALP1q5WNq94Pr2KcY6K439NwN3S4vcHWL6NmV
```
