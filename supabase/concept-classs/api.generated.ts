import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getConceptClasssApi,
  postConceptClasssApi,
  getConceptClasssConceptClassIdApi,
  putConceptClasssConceptClassIdApi,
  patchConceptClasssConceptClassIdApi,
  deleteConceptClasssConceptClassIdApi,
} from '@/concept-classs/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { vocabularyConceptClassCreate } from '@/types/vocabularyConceptClassCreate.generated.ts'
import { vocabularyConceptClassUpdate } from '@/types/vocabularyConceptClassUpdate.generated.ts'

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

app.get('/concept-classs', withSupabase, async (c) => {
  console.log('get /concept-classs')

  const { offset, limit, concept_class_concept_id, sort_by, sort_order } =
    c.req.query()

  const res = await getConceptClasssApi({
    supabase: c.get('supabase'),
    params: { offset, limit, concept_class_concept_id, sort_by, sort_order },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/concept-classs', withSupabase, async (c) => {
  console.log('post /concept-classs')

  const requestBody = await c.req.json()
  const body = vocabularyConceptClassCreate.parse(requestBody)

  const res = await postConceptClasssApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/concept-classs/:concept_class_id', withSupabase, async (c) => {
  console.log('get /concept-classs/:concept_class_id')

  const { concept_class_id } = c.req.param()

  const res = await getConceptClasssConceptClassIdApi({
    supabase: c.get('supabase'),
    params: { concept_class_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/concept-classs/:concept_class_id', withSupabase, async (c) => {
  console.log('put /concept-classs/:concept_class_id')

  const { concept_class_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyConceptClassCreate.parse(requestBody)

  const res = await putConceptClasssConceptClassIdApi({
    supabase: c.get('supabase'),
    body,
    params: { concept_class_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/concept-classs/:concept_class_id', withSupabase, async (c) => {
  console.log('patch /concept-classs/:concept_class_id')

  const { concept_class_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyConceptClassUpdate.parse(requestBody)

  const res = await patchConceptClasssConceptClassIdApi({
    supabase: c.get('supabase'),
    body,
    params: { concept_class_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/concept-classs/:concept_class_id', withSupabase, async (c) => {
  console.log('delete /concept-classs/:concept_class_id')

  const { concept_class_id } = c.req.param()

  await deleteConceptClasssConceptClassIdApi({
    supabase: c.get('supabase'),
    params: { concept_class_id },
  })()

  return c.body(null, 204)
})
