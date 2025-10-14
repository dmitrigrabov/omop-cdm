import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getVocabularysApi,
  postVocabularysApi,
  getVocabularysVocabularyIdApi,
  putVocabularysVocabularyIdApi,
  patchVocabularysVocabularyIdApi,
  deleteVocabularysVocabularyIdApi,
} from '@/vocabularys/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { vocabularyVocabularyCreate } from '@/types/vocabularyVocabularyCreate.generated.ts'
import { vocabularyVocabularyUpdate } from '@/types/vocabularyVocabularyUpdate.generated.ts'

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

app.get('/vocabularys', withSupabase, async (c) => {
  console.log('get /vocabularys')

  const { offset, limit, vocabulary_concept_id, sort_by, sort_order } =
    c.req.query()

  const res = await getVocabularysApi({
    supabase: c.get('supabase'),
    params: { offset, limit, vocabulary_concept_id, sort_by, sort_order },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/vocabularys', withSupabase, async (c) => {
  console.log('post /vocabularys')

  const requestBody = await c.req.json()
  const body = vocabularyVocabularyCreate.parse(requestBody)

  const res = await postVocabularysApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/vocabularys/:vocabulary_id', withSupabase, async (c) => {
  console.log('get /vocabularys/:vocabulary_id')

  const { vocabulary_id } = c.req.param()

  const res = await getVocabularysVocabularyIdApi({
    supabase: c.get('supabase'),
    params: { vocabulary_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/vocabularys/:vocabulary_id', withSupabase, async (c) => {
  console.log('put /vocabularys/:vocabulary_id')

  const { vocabulary_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyVocabularyCreate.parse(requestBody)

  const res = await putVocabularysVocabularyIdApi({
    supabase: c.get('supabase'),
    body,
    params: { vocabulary_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/vocabularys/:vocabulary_id', withSupabase, async (c) => {
  console.log('patch /vocabularys/:vocabulary_id')

  const { vocabulary_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyVocabularyUpdate.parse(requestBody)

  const res = await patchVocabularysVocabularyIdApi({
    supabase: c.get('supabase'),
    body,
    params: { vocabulary_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/vocabularys/:vocabulary_id', withSupabase, async (c) => {
  console.log('delete /vocabularys/:vocabulary_id')

  const { vocabulary_id } = c.req.param()

  await deleteVocabularysVocabularyIdApi({
    supabase: c.get('supabase'),
    params: { vocabulary_id },
  })()

  return c.body(null, 204)
})
