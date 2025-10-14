import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getConceptsApi,
  postConceptsApi,
  getConceptsConceptIdApi,
  putConceptsConceptIdApi,
  patchConceptsConceptIdApi,
  deleteConceptsConceptIdApi,
} from '@/concepts/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { vocabularyConceptCreate } from '@/types/vocabularyConceptCreate.generated.ts'
import { vocabularyConceptUpdate } from '@/types/vocabularyConceptUpdate.generated.ts'

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

app.get('/concepts', withSupabase, async (c) => {
  console.log('get /concepts')

  const {
    offset,
    limit,
    domain_id,
    vocabulary_id,
    concept_class_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getConceptsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      domain_id,
      vocabulary_id,
      concept_class_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/concepts', withSupabase, async (c) => {
  console.log('post /concepts')

  const requestBody = await c.req.json()
  const body = vocabularyConceptCreate.parse(requestBody)

  const res = await postConceptsApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/concepts/:concept_id', withSupabase, async (c) => {
  console.log('get /concepts/:concept_id')

  const { concept_id } = c.req.param()

  const res = await getConceptsConceptIdApi({
    supabase: c.get('supabase'),
    params: { concept_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/concepts/:concept_id', withSupabase, async (c) => {
  console.log('put /concepts/:concept_id')

  const { concept_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyConceptCreate.parse(requestBody)

  const res = await putConceptsConceptIdApi({
    supabase: c.get('supabase'),
    body,
    params: { concept_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/concepts/:concept_id', withSupabase, async (c) => {
  console.log('patch /concepts/:concept_id')

  const { concept_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyConceptUpdate.parse(requestBody)

  const res = await patchConceptsConceptIdApi({
    supabase: c.get('supabase'),
    body,
    params: { concept_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/concepts/:concept_id', withSupabase, async (c) => {
  console.log('delete /concepts/:concept_id')

  const { concept_id } = c.req.param()

  await deleteConceptsConceptIdApi({
    supabase: c.get('supabase'),
    params: { concept_id },
  })()

  return c.body(null, 204)
})
