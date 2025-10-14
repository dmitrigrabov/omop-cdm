import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getProcedureOccurrencesApi,
  postProcedureOccurrencesApi,
  getProcedureOccurrencesProcedureOccurrenceIdApi,
  putProcedureOccurrencesProcedureOccurrenceIdApi,
  patchProcedureOccurrencesProcedureOccurrenceIdApi,
  deleteProcedureOccurrencesProcedureOccurrenceIdApi,
} from '@/procedure-occurrences/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalProcedureOccurrenceCreate } from '@/types/clinicalProcedureOccurrenceCreate.generated.ts'
import { clinicalProcedureOccurrenceUpdate } from '@/types/clinicalProcedureOccurrenceUpdate.generated.ts'

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

app.get('/procedure-occurrences', withSupabase, async (c) => {
  console.log('get /procedure-occurrences')

  const {
    offset,
    limit,
    person_id,
    procedure_concept_id,
    procedure_type_concept_id,
    modifier_concept_id,
    provider_id,
    visit_occurrence_id,
    visit_detail_id,
    procedure_source_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getProcedureOccurrencesApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      procedure_concept_id,
      procedure_type_concept_id,
      modifier_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      procedure_source_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/procedure-occurrences', withSupabase, async (c) => {
  console.log('post /procedure-occurrences')

  const requestBody = await c.req.json()
  const body = clinicalProcedureOccurrenceCreate.parse(requestBody)

  const res = await postProcedureOccurrencesApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get(
  '/procedure-occurrences/:procedure_occurrence_id',
  withSupabase,
  async (c) => {
    console.log('get /procedure-occurrences/:procedure_occurrence_id')

    const { procedure_occurrence_id } = c.req.param()

    const res = await getProcedureOccurrencesProcedureOccurrenceIdApi({
      supabase: c.get('supabase'),
      params: { procedure_occurrence_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.put(
  '/procedure-occurrences/:procedure_occurrence_id',
  withSupabase,
  async (c) => {
    console.log('put /procedure-occurrences/:procedure_occurrence_id')

    const { procedure_occurrence_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = clinicalProcedureOccurrenceCreate.parse(requestBody)

    const res = await putProcedureOccurrencesProcedureOccurrenceIdApi({
      supabase: c.get('supabase'),
      body,
      params: { procedure_occurrence_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.patch(
  '/procedure-occurrences/:procedure_occurrence_id',
  withSupabase,
  async (c) => {
    console.log('patch /procedure-occurrences/:procedure_occurrence_id')

    const { procedure_occurrence_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = clinicalProcedureOccurrenceUpdate.parse(requestBody)

    const res = await patchProcedureOccurrencesProcedureOccurrenceIdApi({
      supabase: c.get('supabase'),
      body,
      params: { procedure_occurrence_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.delete(
  '/procedure-occurrences/:procedure_occurrence_id',
  withSupabase,
  async (c) => {
    console.log('delete /procedure-occurrences/:procedure_occurrence_id')

    const { procedure_occurrence_id } = c.req.param()

    await deleteProcedureOccurrencesProcedureOccurrenceIdApi({
      supabase: c.get('supabase'),
      params: { procedure_occurrence_id },
    })()

    return c.body(null, 204)
  },
)
