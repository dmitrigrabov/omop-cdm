import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getFactRelationshipsApi,
  postFactRelationshipsApi,
  getFactRelationshipsFactRelationshipIdApi,
  putFactRelationshipsFactRelationshipIdApi,
  patchFactRelationshipsFactRelationshipIdApi,
  deleteFactRelationshipsFactRelationshipIdApi,
} from '@/fact-relationships/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { resultsFactRelationshipCreate } from '@/types/resultsFactRelationshipCreate.generated.ts'
import { resultsFactRelationshipUpdate } from '@/types/resultsFactRelationshipUpdate.generated.ts'

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

app.get('/fact-relationships', withSupabase, async (c) => {
  console.log('get /fact-relationships')

  const { offset, limit, relationship_concept_id, sort_by, sort_order } =
    c.req.query()

  const res = await getFactRelationshipsApi({
    supabase: c.get('supabase'),
    params: { offset, limit, relationship_concept_id, sort_by, sort_order },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/fact-relationships', withSupabase, async (c) => {
  console.log('post /fact-relationships')

  const requestBody = await c.req.json()
  const body = resultsFactRelationshipCreate.parse(requestBody)

  const res = await postFactRelationshipsApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get(
  '/fact-relationships/:fact_relationship_id',
  withSupabase,
  async (c) => {
    console.log('get /fact-relationships/:fact_relationship_id')

    const { fact_relationship_id } = c.req.param()

    const res = await getFactRelationshipsFactRelationshipIdApi({
      supabase: c.get('supabase'),
      params: { fact_relationship_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.put(
  '/fact-relationships/:fact_relationship_id',
  withSupabase,
  async (c) => {
    console.log('put /fact-relationships/:fact_relationship_id')

    const { fact_relationship_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = resultsFactRelationshipCreate.parse(requestBody)

    const res = await putFactRelationshipsFactRelationshipIdApi({
      supabase: c.get('supabase'),
      body,
      params: { fact_relationship_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.patch(
  '/fact-relationships/:fact_relationship_id',
  withSupabase,
  async (c) => {
    console.log('patch /fact-relationships/:fact_relationship_id')

    const { fact_relationship_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = resultsFactRelationshipUpdate.parse(requestBody)

    const res = await patchFactRelationshipsFactRelationshipIdApi({
      supabase: c.get('supabase'),
      body,
      params: { fact_relationship_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.delete(
  '/fact-relationships/:fact_relationship_id',
  withSupabase,
  async (c) => {
    console.log('delete /fact-relationships/:fact_relationship_id')

    const { fact_relationship_id } = c.req.param()

    await deleteFactRelationshipsFactRelationshipIdApi({
      supabase: c.get('supabase'),
      params: { fact_relationship_id },
    })()

    return c.body(null, 204)
  },
)
