import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getProvidersApi,
  postProvidersApi,
  getProvidersProviderIdApi,
  putProvidersProviderIdApi,
  patchProvidersProviderIdApi,
  deleteProvidersProviderIdApi,
} from '@/providers/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { healthsystemProviderCreate } from '@/types/healthsystemProviderCreate.generated.ts'
import { healthsystemProviderUpdate } from '@/types/healthsystemProviderUpdate.generated.ts'

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

app.get('/providers', withSupabase, async (c) => {
  console.log('get /providers')

  const {
    offset,
    limit,
    specialty_concept_id,
    care_site_id,
    gender_concept_id,
    specialty_source_concept_id,
    gender_source_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getProvidersApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      specialty_concept_id,
      care_site_id,
      gender_concept_id,
      specialty_source_concept_id,
      gender_source_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/providers', withSupabase, async (c) => {
  console.log('post /providers')

  const requestBody = await c.req.json()
  const body = healthsystemProviderCreate.parse(requestBody)

  const res = await postProvidersApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/providers/:provider_id', withSupabase, async (c) => {
  console.log('get /providers/:provider_id')

  const { provider_id } = c.req.param()

  const res = await getProvidersProviderIdApi({
    supabase: c.get('supabase'),
    params: { provider_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/providers/:provider_id', withSupabase, async (c) => {
  console.log('put /providers/:provider_id')

  const { provider_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = healthsystemProviderCreate.parse(requestBody)

  const res = await putProvidersProviderIdApi({
    supabase: c.get('supabase'),
    body,
    params: { provider_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/providers/:provider_id', withSupabase, async (c) => {
  console.log('patch /providers/:provider_id')

  const { provider_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = healthsystemProviderUpdate.parse(requestBody)

  const res = await patchProvidersProviderIdApi({
    supabase: c.get('supabase'),
    body,
    params: { provider_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/providers/:provider_id', withSupabase, async (c) => {
  console.log('delete /providers/:provider_id')

  const { provider_id } = c.req.param()

  await deleteProvidersProviderIdApi({
    supabase: c.get('supabase'),
    params: { provider_id },
  })()

  return c.body(null, 204)
})
