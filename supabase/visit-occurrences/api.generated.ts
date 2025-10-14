import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getVisitOccurrencesApi,
  postVisitOccurrencesApi,
  getVisitOccurrencesVisitOccurrenceIdApi,
  putVisitOccurrencesVisitOccurrenceIdApi,
  patchVisitOccurrencesVisitOccurrenceIdApi,
  deleteVisitOccurrencesVisitOccurrenceIdApi,
} from '@/visit-occurrences/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalVisitOccurrenceCreate } from '@/types/clinicalVisitOccurrenceCreate.generated.ts'
import { clinicalVisitOccurrenceUpdate } from '@/types/clinicalVisitOccurrenceUpdate.generated.ts'

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

app.get('/visit-occurrences', withSupabase, async (c) => {
  console.log('get /visit-occurrences')

  const {
    offset,
    limit,
    person_id,
    visit_concept_id,
    visit_type_concept_id,
    provider_id,
    care_site_id,
    visit_source_concept_id,
    admitted_from_concept_id,
    discharged_to_concept_id,
    preceding_visit_occurrence_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getVisitOccurrencesApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      visit_concept_id,
      visit_type_concept_id,
      provider_id,
      care_site_id,
      visit_source_concept_id,
      admitted_from_concept_id,
      discharged_to_concept_id,
      preceding_visit_occurrence_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/visit-occurrences', withSupabase, async (c) => {
  console.log('post /visit-occurrences')

  const requestBody = await c.req.json()
  const body = clinicalVisitOccurrenceCreate.parse(requestBody)

  const res = await postVisitOccurrencesApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/visit-occurrences/:visit_occurrence_id', withSupabase, async (c) => {
  console.log('get /visit-occurrences/:visit_occurrence_id')

  const { visit_occurrence_id } = c.req.param()

  const res = await getVisitOccurrencesVisitOccurrenceIdApi({
    supabase: c.get('supabase'),
    params: { visit_occurrence_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/visit-occurrences/:visit_occurrence_id', withSupabase, async (c) => {
  console.log('put /visit-occurrences/:visit_occurrence_id')

  const { visit_occurrence_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalVisitOccurrenceCreate.parse(requestBody)

  const res = await putVisitOccurrencesVisitOccurrenceIdApi({
    supabase: c.get('supabase'),
    body,
    params: { visit_occurrence_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch(
  '/visit-occurrences/:visit_occurrence_id',
  withSupabase,
  async (c) => {
    console.log('patch /visit-occurrences/:visit_occurrence_id')

    const { visit_occurrence_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = clinicalVisitOccurrenceUpdate.parse(requestBody)

    const res = await patchVisitOccurrencesVisitOccurrenceIdApi({
      supabase: c.get('supabase'),
      body,
      params: { visit_occurrence_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.delete(
  '/visit-occurrences/:visit_occurrence_id',
  withSupabase,
  async (c) => {
    console.log('delete /visit-occurrences/:visit_occurrence_id')

    const { visit_occurrence_id } = c.req.param()

    await deleteVisitOccurrencesVisitOccurrenceIdApi({
      supabase: c.get('supabase'),
      params: { visit_occurrence_id },
    })()

    return c.body(null, 204)
  },
)
