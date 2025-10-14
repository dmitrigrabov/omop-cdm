import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getConceptRelationshipsApi,
  postConceptRelationshipsApi,
  getConceptRelationshipsConceptRelationshipIdApi,
  putConceptRelationshipsConceptRelationshipIdApi,
  patchConceptRelationshipsConceptRelationshipIdApi,
  deleteConceptRelationshipsConceptRelationshipIdApi,
} from '@/concept-relationships/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { vocabularyConceptRelationshipCreate } from '@/types/vocabularyConceptRelationshipCreate.generated.ts'
import { vocabularyConceptRelationshipUpdate } from '@/types/vocabularyConceptRelationshipUpdate.generated.ts'

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

app.get('/concept-relationships', withSupabase, async (c) => {
  console.log('get /concept-relationships')

  const { offset, limit, relationship_id, sort_by, sort_order } = c.req.query()

  const res = await getConceptRelationshipsApi({
    supabase: c.get('supabase'),
    params: { offset, limit, relationship_id, sort_by, sort_order },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/concept-relationships', withSupabase, async (c) => {
  console.log('post /concept-relationships')

  const requestBody = await c.req.json()
  const body = vocabularyConceptRelationshipCreate.parse(requestBody)

  const res = await postConceptRelationshipsApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get(
  '/concept-relationships/:concept_relationship_id',
  withSupabase,
  async (c) => {
    console.log('get /concept-relationships/:concept_relationship_id')

    const { concept_relationship_id } = c.req.param()

    const res = await getConceptRelationshipsConceptRelationshipIdApi({
      supabase: c.get('supabase'),
      params: { concept_relationship_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.put(
  '/concept-relationships/:concept_relationship_id',
  withSupabase,
  async (c) => {
    console.log('put /concept-relationships/:concept_relationship_id')

    const { concept_relationship_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = vocabularyConceptRelationshipCreate.parse(requestBody)

    const res = await putConceptRelationshipsConceptRelationshipIdApi({
      supabase: c.get('supabase'),
      body,
      params: { concept_relationship_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.patch(
  '/concept-relationships/:concept_relationship_id',
  withSupabase,
  async (c) => {
    console.log('patch /concept-relationships/:concept_relationship_id')

    const { concept_relationship_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = vocabularyConceptRelationshipUpdate.parse(requestBody)

    const res = await patchConceptRelationshipsConceptRelationshipIdApi({
      supabase: c.get('supabase'),
      body,
      params: { concept_relationship_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.delete(
  '/concept-relationships/:concept_relationship_id',
  withSupabase,
  async (c) => {
    console.log('delete /concept-relationships/:concept_relationship_id')

    const { concept_relationship_id } = c.req.param()

    await deleteConceptRelationshipsConceptRelationshipIdApi({
      supabase: c.get('supabase'),
      params: { concept_relationship_id },
    })()

    return c.body(null, 204)
  },
)
