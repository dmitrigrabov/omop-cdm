import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getNotesApi,
  postNotesApi,
  getNotesNoteIdApi,
  putNotesNoteIdApi,
  patchNotesNoteIdApi,
  deleteNotesNoteIdApi,
} from '@/notes/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalNoteCreate } from '@/types/clinicalNoteCreate.generated.ts'
import { clinicalNoteUpdate } from '@/types/clinicalNoteUpdate.generated.ts'

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

app.get('/notes', withSupabase, async (c) => {
  console.log('get /notes')

  const {
    offset,
    limit,
    person_id,
    note_type_concept_id,
    note_class_concept_id,
    encoding_concept_id,
    language_concept_id,
    provider_id,
    visit_occurrence_id,
    visit_detail_id,
    note_event_field_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getNotesApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      note_type_concept_id,
      note_class_concept_id,
      encoding_concept_id,
      language_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      note_event_field_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/notes', withSupabase, async (c) => {
  console.log('post /notes')

  const requestBody = await c.req.json()
  const body = clinicalNoteCreate.parse(requestBody)

  const res = await postNotesApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/notes/:note_id', withSupabase, async (c) => {
  console.log('get /notes/:note_id')

  const { note_id } = c.req.param()

  const res = await getNotesNoteIdApi({
    supabase: c.get('supabase'),
    params: { note_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/notes/:note_id', withSupabase, async (c) => {
  console.log('put /notes/:note_id')

  const { note_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalNoteCreate.parse(requestBody)

  const res = await putNotesNoteIdApi({
    supabase: c.get('supabase'),
    body,
    params: { note_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/notes/:note_id', withSupabase, async (c) => {
  console.log('patch /notes/:note_id')

  const { note_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalNoteUpdate.parse(requestBody)

  const res = await patchNotesNoteIdApi({
    supabase: c.get('supabase'),
    body,
    params: { note_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/notes/:note_id', withSupabase, async (c) => {
  console.log('delete /notes/:note_id')

  const { note_id } = c.req.param()

  await deleteNotesNoteIdApi({
    supabase: c.get('supabase'),
    params: { note_id },
  })()

  return c.body(null, 204)
})
