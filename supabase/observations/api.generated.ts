import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getObservationsApi,
  postObservationsApi,
  getObservationsObservationIdApi,
  putObservationsObservationIdApi,
  patchObservationsObservationIdApi,
  deleteObservationsObservationIdApi,
} from '@/observations/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalObservationCreate } from '@/types/clinicalObservationCreate.generated.ts'
import { clinicalObservationUpdate } from '@/types/clinicalObservationUpdate.generated.ts'

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

app.get('/observations', withSupabase, async (c) => {
  console.log('get /observations')

  const {
    offset,
    limit,
    person_id,
    observation_concept_id,
    observation_type_concept_id,
    value_as_concept_id,
    qualifier_concept_id,
    unit_concept_id,
    provider_id,
    visit_occurrence_id,
    visit_detail_id,
    observation_source_concept_id,
    obs_event_field_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getObservationsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      observation_concept_id,
      observation_type_concept_id,
      value_as_concept_id,
      qualifier_concept_id,
      unit_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      observation_source_concept_id,
      obs_event_field_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/observations', withSupabase, async (c) => {
  console.log('post /observations')

  const requestBody = await c.req.json()
  const body = clinicalObservationCreate.parse(requestBody)

  const res = await postObservationsApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/observations/:observation_id', withSupabase, async (c) => {
  console.log('get /observations/:observation_id')

  const { observation_id } = c.req.param()

  const res = await getObservationsObservationIdApi({
    supabase: c.get('supabase'),
    params: { observation_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/observations/:observation_id', withSupabase, async (c) => {
  console.log('put /observations/:observation_id')

  const { observation_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalObservationCreate.parse(requestBody)

  const res = await putObservationsObservationIdApi({
    supabase: c.get('supabase'),
    body,
    params: { observation_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/observations/:observation_id', withSupabase, async (c) => {
  console.log('patch /observations/:observation_id')

  const { observation_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalObservationUpdate.parse(requestBody)

  const res = await patchObservationsObservationIdApi({
    supabase: c.get('supabase'),
    body,
    params: { observation_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/observations/:observation_id', withSupabase, async (c) => {
  console.log('delete /observations/:observation_id')

  const { observation_id } = c.req.param()

  await deleteObservationsObservationIdApi({
    supabase: c.get('supabase'),
    params: { observation_id },
  })()

  return c.body(null, 204)
})
