import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import * as dotenv from 'dotenv';

// source environment from .env file, if present
dotenv.config();

const PORT = process.env.PORT || 3000;
const AUTH = process.env.AUTH || 'TODO'; // no colons!
const RPC_URL = process.env.RPC_URL || 'http://localhost:9933';

const app = new Koa();
const router = new Router();

// catch koa errors for more tidy console output
// https://github.com/koajs/koa/wiki/Error-Handling#catching-downstream-errors
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
  console.log(`[${ctx.status}] ${ctx.path}`, JSON.stringify(err));
});

// useful for local requests
app.use(cors());

// get bioauth status from the humanode-peer
const getBioauthStatus = async () => {
  const request = {
    jsonrpc: '2.0',
    id: 1,
    method: 'bioauth_status',
    params: [],
  };
  const response = await fetch(RPC_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  return await response.json();
};

// return bioauth status result as requested
// or error upon failure
router.get(`/${AUTH}/status/:expire?`, async (ctx) => {
  const s = await getBioauthStatus();
  if (!s.result) ctx.throw(500, 'bioauth_status result not found');

  // if expire param is given, check if bioauth expires within the given time
  if (ctx.params.expire) {
    try {
      const {
        Active: { expires_at },
      } = s.result;
      const t = (expires_at - Date.now()) / 1000 / 60; // minutes remaining
      ctx.body = t <= Number(ctx.params.expire) ? 'Expiring' : s.result;
    } catch {
      // if status is "Inactive" (or other error parsing data), pass through results
      ctx.body = s.result;
    }
  } else {
    ctx.body = s.result;
  }
  console.log(`[${ctx.status}] /{AUTH}/status`, JSON.stringify(ctx.body));
  console.log();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT);

console.log(
  `listening on port ${PORT}`,
  `monitoring humanode-peer @ ${RPC_URL}`
);
