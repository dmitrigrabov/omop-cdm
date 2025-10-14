import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getRelationshipsApi,
  postRelationshipsApi,
  getRelationshipsRelationshipIdApi,
  putRelationshipsRelationshipIdApi,
  patchRelationshipsRelationshipIdApi,
  deleteRelationshipsRelationshipIdApi,
} from '@/relationships/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { vocabularyRelationshipCreate } from '@/types/vocabularyRelationshipCreate.generated.ts'
import { vocabularyRelationshipUpdate } from '@/types/vocabularyRelationshipUpdate.generated.ts'

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

app.get('/relationships', withSupabase, async (c) => {
  console.log('get /relationships')

  const { offset, limit, relationship_concept_id, sort_by, sort_order } =
    c.req.query()

  const res = await getRelationshipsApi({
    supabase: c.get('supabase'),
    params: { offset, limit, relationship_concept_id, sort_by, sort_order },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/relationships', withSupabase, async (c) => {
  console.log('post /relationships')

  const requestBody = await c.req.json()
  const body = vocabularyRelationshipCreate.parse(requestBody)

  const res = await postRelationshipsApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/relationships/:relationship_id', withSupabase, async (c) => {
  console.log('get /relationships/:relationship_id')

  const { relationship_id } = c.req.param()

  const res = await getRelationshipsRelationshipIdApi({
    supabase: c.get('supabase'),
    params: { relationship_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/relationships/:relationship_id', withSupabase, async (c) => {
  console.log('put /relationships/:relationship_id')

  const { relationship_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyRelationshipCreate.parse(requestBody)

  const res = await putRelationshipsRelationshipIdApi({
    supabase: c.get('supabase'),
    body,
    params: { relationship_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/relationships/:relationship_id', withSupabase, async (c) => {
  console.log('patch /relationships/:relationship_id')

  const { relationship_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyRelationshipUpdate.parse(requestBody)

  const res = await patchRelationshipsRelationshipIdApi({
    supabase: c.get('supabase'),
    body,
    params: { relationship_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/relationships/:relationship_id', withSupabase, async (c) => {
  console.log('delete /relationships/:relationship_id')

  const { relationship_id } = c.req.param()

  await deleteRelationshipsRelationshipIdApi({
    supabase: c.get('supabase'),
    params: { relationship_id },
  })()

  return c.body(null, 204)
})
