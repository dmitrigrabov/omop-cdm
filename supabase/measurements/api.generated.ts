import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getMeasurementsApi,
  postMeasurementsApi,
  getMeasurementsMeasurementIdApi,
  putMeasurementsMeasurementIdApi,
  patchMeasurementsMeasurementIdApi,
  deleteMeasurementsMeasurementIdApi,
} from '@/measurements/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalMeasurementCreate } from '@/types/clinicalMeasurementCreate.generated.ts'
import { clinicalMeasurementUpdate } from '@/types/clinicalMeasurementUpdate.generated.ts'

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

app.get('/measurements', withSupabase, async (c) => {
  console.log('get /measurements')

  const {
    offset,
    limit,
    person_id,
    measurement_concept_id,
    measurement_type_concept_id,
    operator_concept_id,
    value_as_concept_id,
    unit_concept_id,
    provider_id,
    visit_occurrence_id,
    visit_detail_id,
    measurement_source_concept_id,
    unit_source_concept_id,
    meas_event_field_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getMeasurementsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      measurement_concept_id,
      measurement_type_concept_id,
      operator_concept_id,
      value_as_concept_id,
      unit_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      measurement_source_concept_id,
      unit_source_concept_id,
      meas_event_field_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/measurements', withSupabase, async (c) => {
  console.log('post /measurements')

  const requestBody = await c.req.json()
  const body = clinicalMeasurementCreate.parse(requestBody)

  const res = await postMeasurementsApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/measurements/:measurement_id', withSupabase, async (c) => {
  console.log('get /measurements/:measurement_id')

  const { measurement_id } = c.req.param()

  const res = await getMeasurementsMeasurementIdApi({
    supabase: c.get('supabase'),
    params: { measurement_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/measurements/:measurement_id', withSupabase, async (c) => {
  console.log('put /measurements/:measurement_id')

  const { measurement_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalMeasurementCreate.parse(requestBody)

  const res = await putMeasurementsMeasurementIdApi({
    supabase: c.get('supabase'),
    body,
    params: { measurement_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/measurements/:measurement_id', withSupabase, async (c) => {
  console.log('patch /measurements/:measurement_id')

  const { measurement_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalMeasurementUpdate.parse(requestBody)

  const res = await patchMeasurementsMeasurementIdApi({
    supabase: c.get('supabase'),
    body,
    params: { measurement_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/measurements/:measurement_id', withSupabase, async (c) => {
  console.log('delete /measurements/:measurement_id')

  const { measurement_id } = c.req.param()

  await deleteMeasurementsMeasurementIdApi({
    supabase: c.get('supabase'),
    params: { measurement_id },
  })()

  return c.body(null, 204)
})
