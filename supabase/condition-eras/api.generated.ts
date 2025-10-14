import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getConditionErasApi,
  postConditionErasApi,
  getConditionErasConditionEraIdApi,
  putConditionErasConditionEraIdApi,
  patchConditionErasConditionEraIdApi,
  deleteConditionErasConditionEraIdApi,
} from '@/condition-eras/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { derivedConditionEraCreate } from '@/types/derivedConditionEraCreate.generated.ts'
import { derivedConditionEraUpdate } from '@/types/derivedConditionEraUpdate.generated.ts'

export const app = new Hono()

app.use(
  '*',
  sentry({
    dsn: Deno.env.get('SENTRY_DSN_SUPABASE'),
    tracesSampleRate: 1.0,
  }),
)

app.onError((error, c) => {
  console.log('ERROR', error)

  c.get('sentry').captureException(error)

  return c.json({ message: 'Internal server error' }, 500)
})

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    maxAge: 600,
    allowHeaders: [
      'authorization',
      'x-client-info',
      'apikey',
      'sentry-trace',
      'baggage',
      'content-type',
    ],
  }),
)

app.get('/condition-eras', withSupabase, async (c) => {
  console.log('get /condition-eras')

  const {
    offset,
    limit,
    person_id,
    condition_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getConditionErasApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      condition_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/condition-eras', withSupabase, async (c) => {
  console.log('post /condition-eras')

  const requestBody = await c.req.json()
  const body = derivedConditionEraCreate.parse(requestBody)

  const res = await postConditionErasApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/condition-eras/:condition_era_id', withSupabase, async (c) => {
  console.log('get /condition-eras/:condition_era_id')

  const { condition_era_id } = c.req.param()

  const res = await getConditionErasConditionEraIdApi({
    supabase: c.get('supabase'),
    params: { condition_era_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/condition-eras/:condition_era_id', withSupabase, async (c) => {
  console.log('put /condition-eras/:condition_era_id')

  const { condition_era_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = derivedConditionEraCreate.parse(requestBody)

  const res = await putConditionErasConditionEraIdApi({
    supabase: c.get('supabase'),
    body,
    params: { condition_era_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/condition-eras/:condition_era_id', withSupabase, async (c) => {
  console.log('patch /condition-eras/:condition_era_id')

  const { condition_era_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = derivedConditionEraUpdate.parse(requestBody)

  const res = await patchConditionErasConditionEraIdApi({
    supabase: c.get('supabase'),
    body,
    params: { condition_era_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/condition-eras/:condition_era_id', withSupabase, async (c) => {
  console.log('delete /condition-eras/:condition_era_id')

  const { condition_era_id } = c.req.param()

  await deleteConditionErasConditionEraIdApi({
    supabase: c.get('supabase'),
    params: { condition_era_id },
  })()

  return c.body(null, 204)
})
