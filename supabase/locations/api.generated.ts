import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getLocationsApi,
  postLocationsApi,
  getLocationsLocationIdApi,
  putLocationsLocationIdApi,
  patchLocationsLocationIdApi,
  deleteLocationsLocationIdApi,
} from '@/locations/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { healthsystemLocationCreate } from '@/types/healthsystemLocationCreate.generated.ts'
import { healthsystemLocationUpdate } from '@/types/healthsystemLocationUpdate.generated.ts'

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

app.get('/locations', withSupabase, async (c) => {
  console.log('get /locations')

  const { offset, limit, country_concept_id, sort_by, sort_order } =
    c.req.query()

  const res = await getLocationsApi({
    supabase: c.get('supabase'),
    params: { offset, limit, country_concept_id, sort_by, sort_order },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/locations', withSupabase, async (c) => {
  console.log('post /locations')

  const requestBody = await c.req.json()
  const body = healthsystemLocationCreate.parse(requestBody)

  const res = await postLocationsApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/locations/:location_id', withSupabase, async (c) => {
  console.log('get /locations/:location_id')

  const { location_id } = c.req.param()

  const res = await getLocationsLocationIdApi({
    supabase: c.get('supabase'),
    params: { location_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/locations/:location_id', withSupabase, async (c) => {
  console.log('put /locations/:location_id')

  const { location_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = healthsystemLocationCreate.parse(requestBody)

  const res = await putLocationsLocationIdApi({
    supabase: c.get('supabase'),
    body,
    params: { location_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/locations/:location_id', withSupabase, async (c) => {
  console.log('patch /locations/:location_id')

  const { location_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = healthsystemLocationUpdate.parse(requestBody)

  const res = await patchLocationsLocationIdApi({
    supabase: c.get('supabase'),
    body,
    params: { location_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/locations/:location_id', withSupabase, async (c) => {
  console.log('delete /locations/:location_id')

  const { location_id } = c.req.param()

  await deleteLocationsLocationIdApi({
    supabase: c.get('supabase'),
    params: { location_id },
  })()

  return c.body(null, 204)
})
