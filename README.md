# humanode-tellr

A [Humanode](https://humanode.io/) node (humanode-peer) bioauth status reporter;
aka a "teller".

Intended to run on the same host as the Humanode node.

An uptime keyword monitor service like [UptimeRobot](https://uptimerobot.com/)
may be used to monitor the reporter and be alerted (by email, push notification,
SMS, etc) if bioauth status becomes inactive or if the humanode-peer is down.

## Configure

Copy the environment file, then edit to your preference.

```sh
cp .env-example .env
```

## Run

### with Nodejs directly

```sh
npm install
source .env
npm run start
```

### with Docker

```sh
docker compose build
docker compose up
```

## Uptime/Keyword Monitor

- Monitor for keyword presence of "Active" (case sensitive) or "expires_at".

- Use `AUTH` as set in `.env` within the url.

  - If using IP address: `http://$IPAddress/$AUTH/status`

  - If using a domain + SSL: `https://$HOSTNAME/$AUTH/status`

### Example: UptimeRobot

![image](https://user-images.githubusercontent.com/1435589/236365721-60161603-c0df-4659-bc00-6450f125a46a.png)
