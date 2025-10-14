import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getPersonsApi,
  postPersonsApi,
  getPersonsPersonIdApi,
  putPersonsPersonIdApi,
  patchPersonsPersonIdApi,
  deletePersonsPersonIdApi,
} from '@/persons/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalPersonCreate } from '@/types/clinicalPersonCreate.generated.ts'
import { clinicalPersonUpdate } from '@/types/clinicalPersonUpdate.generated.ts'

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

app.get('/persons', withSupabase, async (c) => {
  console.log('get /persons')

  const {
    offset,
    limit,
    gender_concept_id,
    race_concept_id,
    ethnicity_concept_id,
    location_id,
    provider_id,
    care_site_id,
    gender_source_concept_id,
    race_source_concept_id,
    ethnicity_source_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getPersonsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      gender_concept_id,
      race_concept_id,
      ethnicity_concept_id,
      location_id,
      provider_id,
      care_site_id,
      gender_source_concept_id,
      race_source_concept_id,
      ethnicity_source_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/persons', withSupabase, async (c) => {
  console.log('post /persons')

  const requestBody = await c.req.json()
  const body = clinicalPersonCreate.parse(requestBody)

  const res = await postPersonsApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/persons/:person_id', withSupabase, async (c) => {
  console.log('get /persons/:person_id')

  const { person_id } = c.req.param()

  const res = await getPersonsPersonIdApi({
    supabase: c.get('supabase'),
    params: { person_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/persons/:person_id', withSupabase, async (c) => {
  console.log('put /persons/:person_id')

  const { person_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalPersonCreate.parse(requestBody)

  const res = await putPersonsPersonIdApi({
    supabase: c.get('supabase'),
    body,
    params: { person_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/persons/:person_id', withSupabase, async (c) => {
  console.log('patch /persons/:person_id')

  const { person_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalPersonUpdate.parse(requestBody)

  const res = await patchPersonsPersonIdApi({
    supabase: c.get('supabase'),
    body,
    params: { person_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/persons/:person_id', withSupabase, async (c) => {
  console.log('delete /persons/:person_id')

  const { person_id } = c.req.param()

  await deletePersonsPersonIdApi({
    supabase: c.get('supabase'),
    params: { person_id },
  })()

  return c.body(null, 204)
})
