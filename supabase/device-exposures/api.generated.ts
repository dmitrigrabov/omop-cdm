import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getDeviceExposuresApi,
  postDeviceExposuresApi,
  getDeviceExposuresDeviceExposureIdApi,
  putDeviceExposuresDeviceExposureIdApi,
  patchDeviceExposuresDeviceExposureIdApi,
  deleteDeviceExposuresDeviceExposureIdApi,
} from '@/device-exposures/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalDeviceExposureCreate } from '@/types/clinicalDeviceExposureCreate.generated.ts'
import { clinicalDeviceExposureUpdate } from '@/types/clinicalDeviceExposureUpdate.generated.ts'

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

app.get('/device-exposures', withSupabase, async (c) => {
  console.log('get /device-exposures')

  const {
    offset,
    limit,
    person_id,
    device_concept_id,
    device_type_concept_id,
    provider_id,
    visit_occurrence_id,
    visit_detail_id,
    device_source_concept_id,
    unit_concept_id,
    unit_source_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getDeviceExposuresApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      device_concept_id,
      device_type_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      device_source_concept_id,
      unit_concept_id,
      unit_source_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/device-exposures', withSupabase, async (c) => {
  console.log('post /device-exposures')

  const requestBody = await c.req.json()
  const body = clinicalDeviceExposureCreate.parse(requestBody)

  const res = await postDeviceExposuresApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/device-exposures/:device_exposure_id', withSupabase, async (c) => {
  console.log('get /device-exposures/:device_exposure_id')

  const { device_exposure_id } = c.req.param()

  const res = await getDeviceExposuresDeviceExposureIdApi({
    supabase: c.get('supabase'),
    params: { device_exposure_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/device-exposures/:device_exposure_id', withSupabase, async (c) => {
  console.log('put /device-exposures/:device_exposure_id')

  const { device_exposure_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalDeviceExposureCreate.parse(requestBody)

  const res = await putDeviceExposuresDeviceExposureIdApi({
    supabase: c.get('supabase'),
    body,
    params: { device_exposure_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/device-exposures/:device_exposure_id', withSupabase, async (c) => {
  console.log('patch /device-exposures/:device_exposure_id')

  const { device_exposure_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalDeviceExposureUpdate.parse(requestBody)

  const res = await patchDeviceExposuresDeviceExposureIdApi({
    supabase: c.get('supabase'),
    body,
    params: { device_exposure_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/device-exposures/:device_exposure_id', withSupabase, async (c) => {
  console.log('delete /device-exposures/:device_exposure_id')

  const { device_exposure_id } = c.req.param()

  await deleteDeviceExposuresDeviceExposureIdApi({
    supabase: c.get('supabase'),
    params: { device_exposure_id },
  })()

  return c.body(null, 204)
})
