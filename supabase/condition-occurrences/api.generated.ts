import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getConditionOccurrencesApi,
  postConditionOccurrencesApi,
  getConditionOccurrencesConditionOccurrenceIdApi,
  putConditionOccurrencesConditionOccurrenceIdApi,
  patchConditionOccurrencesConditionOccurrenceIdApi,
  deleteConditionOccurrencesConditionOccurrenceIdApi,
} from '@/condition-occurrences/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalConditionOccurrenceCreate } from '@/types/clinicalConditionOccurrenceCreate.generated.ts'
import { clinicalConditionOccurrenceUpdate } from '@/types/clinicalConditionOccurrenceUpdate.generated.ts'

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

app.get('/condition-occurrences', withSupabase, async (c) => {
  console.log('get /condition-occurrences')

  const {
    offset,
    limit,
    person_id,
    condition_concept_id,
    condition_type_concept_id,
    condition_status_concept_id,
    provider_id,
    visit_occurrence_id,
    visit_detail_id,
    condition_source_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getConditionOccurrencesApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      condition_concept_id,
      condition_type_concept_id,
      condition_status_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      condition_source_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/condition-occurrences', withSupabase, async (c) => {
  console.log('post /condition-occurrences')

  const requestBody = await c.req.json()
  const body = clinicalConditionOccurrenceCreate.parse(requestBody)

  const res = await postConditionOccurrencesApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get(
  '/condition-occurrences/:condition_occurrence_id',
  withSupabase,
  async (c) => {
    console.log('get /condition-occurrences/:condition_occurrence_id')

    const { condition_occurrence_id } = c.req.param()

    const res = await getConditionOccurrencesConditionOccurrenceIdApi({
      supabase: c.get('supabase'),
      params: { condition_occurrence_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.put(
  '/condition-occurrences/:condition_occurrence_id',
  withSupabase,
  async (c) => {
    console.log('put /condition-occurrences/:condition_occurrence_id')

    const { condition_occurrence_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = clinicalConditionOccurrenceCreate.parse(requestBody)

    const res = await putConditionOccurrencesConditionOccurrenceIdApi({
      supabase: c.get('supabase'),
      body,
      params: { condition_occurrence_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.patch(
  '/condition-occurrences/:condition_occurrence_id',
  withSupabase,
  async (c) => {
    console.log('patch /condition-occurrences/:condition_occurrence_id')

    const { condition_occurrence_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = clinicalConditionOccurrenceUpdate.parse(requestBody)

    const res = await patchConditionOccurrencesConditionOccurrenceIdApi({
      supabase: c.get('supabase'),
      body,
      params: { condition_occurrence_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.delete(
  '/condition-occurrences/:condition_occurrence_id',
  withSupabase,
  async (c) => {
    console.log('delete /condition-occurrences/:condition_occurrence_id')

    const { condition_occurrence_id } = c.req.param()

    await deleteConditionOccurrencesConditionOccurrenceIdApi({
      supabase: c.get('supabase'),
      params: { condition_occurrence_id },
    })()

    return c.body(null, 204)
  },
)
