import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getConceptSynonymsApi,
  postConceptSynonymsApi,
  getConceptSynonymsConceptSynonymIdApi,
  putConceptSynonymsConceptSynonymIdApi,
  patchConceptSynonymsConceptSynonymIdApi,
  deleteConceptSynonymsConceptSynonymIdApi,
} from '@/concept-synonyms/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { vocabularyConceptSynonymCreate } from '@/types/vocabularyConceptSynonymCreate.generated.ts'
import { vocabularyConceptSynonymUpdate } from '@/types/vocabularyConceptSynonymUpdate.generated.ts'

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

app.get('/concept-synonyms', withSupabase, async (c) => {
  console.log('get /concept-synonyms')

  const {
    offset,
    limit,
    concept_id,
    language_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getConceptSynonymsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      concept_id,
      language_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/concept-synonyms', withSupabase, async (c) => {
  console.log('post /concept-synonyms')

  const requestBody = await c.req.json()
  const body = vocabularyConceptSynonymCreate.parse(requestBody)

  const res = await postConceptSynonymsApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/concept-synonyms/:concept_synonym_id', withSupabase, async (c) => {
  console.log('get /concept-synonyms/:concept_synonym_id')

  const { concept_synonym_id } = c.req.param()

  const res = await getConceptSynonymsConceptSynonymIdApi({
    supabase: c.get('supabase'),
    params: { concept_synonym_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/concept-synonyms/:concept_synonym_id', withSupabase, async (c) => {
  console.log('put /concept-synonyms/:concept_synonym_id')

  const { concept_synonym_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyConceptSynonymCreate.parse(requestBody)

  const res = await putConceptSynonymsConceptSynonymIdApi({
    supabase: c.get('supabase'),
    body,
    params: { concept_synonym_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/concept-synonyms/:concept_synonym_id', withSupabase, async (c) => {
  console.log('patch /concept-synonyms/:concept_synonym_id')

  const { concept_synonym_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyConceptSynonymUpdate.parse(requestBody)

  const res = await patchConceptSynonymsConceptSynonymIdApi({
    supabase: c.get('supabase'),
    body,
    params: { concept_synonym_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/concept-synonyms/:concept_synonym_id', withSupabase, async (c) => {
  console.log('delete /concept-synonyms/:concept_synonym_id')

  const { concept_synonym_id } = c.req.param()

  await deleteConceptSynonymsConceptSynonymIdApi({
    supabase: c.get('supabase'),
    params: { concept_synonym_id },
  })()

  return c.body(null, 204)
})
