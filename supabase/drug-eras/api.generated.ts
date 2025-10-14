import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getDrugErasApi,
  postDrugErasApi,
  getDrugErasDrugEraIdApi,
  putDrugErasDrugEraIdApi,
  patchDrugErasDrugEraIdApi,
  deleteDrugErasDrugEraIdApi,
} from '@/drug-eras/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { derivedDrugEraCreate } from '@/types/derivedDrugEraCreate.generated.ts'
import { derivedDrugEraUpdate } from '@/types/derivedDrugEraUpdate.generated.ts'

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

app.get('/drug-eras', withSupabase, async (c) => {
  console.log('get /drug-eras')

  const { offset, limit, person_id, drug_concept_id, sort_by, sort_order } =
    c.req.query()

  const res = await getDrugErasApi({
    supabase: c.get('supabase'),
    params: { offset, limit, person_id, drug_concept_id, sort_by, sort_order },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/drug-eras', withSupabase, async (c) => {
  console.log('post /drug-eras')

  const requestBody = await c.req.json()
  const body = derivedDrugEraCreate.parse(requestBody)

  const res = await postDrugErasApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/drug-eras/:drug_era_id', withSupabase, async (c) => {
  console.log('get /drug-eras/:drug_era_id')

  const { drug_era_id } = c.req.param()

  const res = await getDrugErasDrugEraIdApi({
    supabase: c.get('supabase'),
    params: { drug_era_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/drug-eras/:drug_era_id', withSupabase, async (c) => {
  console.log('put /drug-eras/:drug_era_id')

  const { drug_era_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = derivedDrugEraCreate.parse(requestBody)

  const res = await putDrugErasDrugEraIdApi({
    supabase: c.get('supabase'),
    body,
    params: { drug_era_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/drug-eras/:drug_era_id', withSupabase, async (c) => {
  console.log('patch /drug-eras/:drug_era_id')

  const { drug_era_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = derivedDrugEraUpdate.parse(requestBody)

  const res = await patchDrugErasDrugEraIdApi({
    supabase: c.get('supabase'),
    body,
    params: { drug_era_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/drug-eras/:drug_era_id', withSupabase, async (c) => {
  console.log('delete /drug-eras/:drug_era_id')

  const { drug_era_id } = c.req.param()

  await deleteDrugErasDrugEraIdApi({
    supabase: c.get('supabase'),
    params: { drug_era_id },
  })()

  return c.body(null, 204)
})
