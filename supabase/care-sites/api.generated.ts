import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getCareSitesApi,
  postCareSitesApi,
  getCareSitesCareSiteIdApi,
  putCareSitesCareSiteIdApi,
  patchCareSitesCareSiteIdApi,
  deleteCareSitesCareSiteIdApi,
} from '@/care-sites/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { healthsystemCareSiteCreate } from '@/types/healthsystemCareSiteCreate.generated.ts'
import { healthsystemCareSiteUpdate } from '@/types/healthsystemCareSiteUpdate.generated.ts'

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

app.get('/care-sites', withSupabase, async (c) => {
  console.log('get /care-sites')

  const {
    offset,
    limit,
    place_of_service_concept_id,
    location_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getCareSitesApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      place_of_service_concept_id,
      location_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/care-sites', withSupabase, async (c) => {
  console.log('post /care-sites')

  const requestBody = await c.req.json()
  const body = healthsystemCareSiteCreate.parse(requestBody)

  const res = await postCareSitesApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/care-sites/:care_site_id', withSupabase, async (c) => {
  console.log('get /care-sites/:care_site_id')

  const { care_site_id } = c.req.param()

  const res = await getCareSitesCareSiteIdApi({
    supabase: c.get('supabase'),
    params: { care_site_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/care-sites/:care_site_id', withSupabase, async (c) => {
  console.log('put /care-sites/:care_site_id')

  const { care_site_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = healthsystemCareSiteCreate.parse(requestBody)

  const res = await putCareSitesCareSiteIdApi({
    supabase: c.get('supabase'),
    body,
    params: { care_site_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/care-sites/:care_site_id', withSupabase, async (c) => {
  console.log('patch /care-sites/:care_site_id')

  const { care_site_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = healthsystemCareSiteUpdate.parse(requestBody)

  const res = await patchCareSitesCareSiteIdApi({
    supabase: c.get('supabase'),
    body,
    params: { care_site_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/care-sites/:care_site_id', withSupabase, async (c) => {
  console.log('delete /care-sites/:care_site_id')

  const { care_site_id } = c.req.param()

  await deleteCareSitesCareSiteIdApi({
    supabase: c.get('supabase'),
    params: { care_site_id },
  })()

  return c.body(null, 204)
})
