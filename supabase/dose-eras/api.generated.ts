import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getDoseErasApi,
  postDoseErasApi,
  getDoseErasDoseEraIdApi,
  putDoseErasDoseEraIdApi,
  patchDoseErasDoseEraIdApi,
  deleteDoseErasDoseEraIdApi,
} from '@/dose-eras/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { derivedDoseEraCreate } from '@/types/derivedDoseEraCreate.generated.ts'
import { derivedDoseEraUpdate } from '@/types/derivedDoseEraUpdate.generated.ts'

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

app.get('/dose-eras', withSupabase, async (c) => {
  console.log('get /dose-eras')

  const {
    offset,
    limit,
    person_id,
    drug_concept_id,
    unit_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getDoseErasApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      drug_concept_id,
      unit_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/dose-eras', withSupabase, async (c) => {
  console.log('post /dose-eras')

  const requestBody = await c.req.json()
  const body = derivedDoseEraCreate.parse(requestBody)

  const res = await postDoseErasApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/dose-eras/:dose_era_id', withSupabase, async (c) => {
  console.log('get /dose-eras/:dose_era_id')

  const { dose_era_id } = c.req.param()

  const res = await getDoseErasDoseEraIdApi({
    supabase: c.get('supabase'),
    params: { dose_era_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/dose-eras/:dose_era_id', withSupabase, async (c) => {
  console.log('put /dose-eras/:dose_era_id')

  const { dose_era_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = derivedDoseEraCreate.parse(requestBody)

  const res = await putDoseErasDoseEraIdApi({
    supabase: c.get('supabase'),
    body,
    params: { dose_era_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/dose-eras/:dose_era_id', withSupabase, async (c) => {
  console.log('patch /dose-eras/:dose_era_id')

  const { dose_era_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = derivedDoseEraUpdate.parse(requestBody)

  const res = await patchDoseErasDoseEraIdApi({
    supabase: c.get('supabase'),
    body,
    params: { dose_era_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/dose-eras/:dose_era_id', withSupabase, async (c) => {
  console.log('delete /dose-eras/:dose_era_id')

  const { dose_era_id } = c.req.param()

  await deleteDoseErasDoseEraIdApi({
    supabase: c.get('supabase'),
    params: { dose_era_id },
  })()

  return c.body(null, 204)
})
