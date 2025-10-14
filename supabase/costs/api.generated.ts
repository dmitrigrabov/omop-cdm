import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getCostsApi,
  postCostsApi,
  getCostsCostIdApi,
  putCostsCostIdApi,
  patchCostsCostIdApi,
  deleteCostsCostIdApi,
} from '@/costs/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { healthsystemCostCreate } from '@/types/healthsystemCostCreate.generated.ts'
import { healthsystemCostUpdate } from '@/types/healthsystemCostUpdate.generated.ts'

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

app.get('/costs', withSupabase, async (c) => {
  console.log('get /costs')

  const {
    offset,
    limit,
    cost_domain_id,
    cost_type_concept_id,
    currency_concept_id,
    revenue_code_concept_id,
    drg_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getCostsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      cost_domain_id,
      cost_type_concept_id,
      currency_concept_id,
      revenue_code_concept_id,
      drg_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/costs', withSupabase, async (c) => {
  console.log('post /costs')

  const requestBody = await c.req.json()
  const body = healthsystemCostCreate.parse(requestBody)

  const res = await postCostsApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/costs/:cost_id', withSupabase, async (c) => {
  console.log('get /costs/:cost_id')

  const { cost_id } = c.req.param()

  const res = await getCostsCostIdApi({
    supabase: c.get('supabase'),
    params: { cost_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/costs/:cost_id', withSupabase, async (c) => {
  console.log('put /costs/:cost_id')

  const { cost_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = healthsystemCostCreate.parse(requestBody)

  const res = await putCostsCostIdApi({
    supabase: c.get('supabase'),
    body,
    params: { cost_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/costs/:cost_id', withSupabase, async (c) => {
  console.log('patch /costs/:cost_id')

  const { cost_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = healthsystemCostUpdate.parse(requestBody)

  const res = await patchCostsCostIdApi({
    supabase: c.get('supabase'),
    body,
    params: { cost_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/costs/:cost_id', withSupabase, async (c) => {
  console.log('delete /costs/:cost_id')

  const { cost_id } = c.req.param()

  await deleteCostsCostIdApi({
    supabase: c.get('supabase'),
    params: { cost_id },
  })()

  return c.body(null, 204)
})
