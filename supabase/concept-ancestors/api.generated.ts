import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getConceptAncestorsApi,
  postConceptAncestorsApi,
  getConceptAncestorsConceptAncestorIdApi,
  putConceptAncestorsConceptAncestorIdApi,
  patchConceptAncestorsConceptAncestorIdApi,
  deleteConceptAncestorsConceptAncestorIdApi,
} from '@/concept-ancestors/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { vocabularyConceptAncestorCreate } from '@/types/vocabularyConceptAncestorCreate.generated.ts'
import { vocabularyConceptAncestorUpdate } from '@/types/vocabularyConceptAncestorUpdate.generated.ts'

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

app.get('/concept-ancestors', withSupabase, async (c) => {
  console.log('get /concept-ancestors')

  const {
    offset,
    limit,
    ancestor_concept_id,
    descendant_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getConceptAncestorsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      ancestor_concept_id,
      descendant_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/concept-ancestors', withSupabase, async (c) => {
  console.log('post /concept-ancestors')

  const requestBody = await c.req.json()
  const body = vocabularyConceptAncestorCreate.parse(requestBody)

  const res = await postConceptAncestorsApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/concept-ancestors/:concept_ancestor_id', withSupabase, async (c) => {
  console.log('get /concept-ancestors/:concept_ancestor_id')

  const { concept_ancestor_id } = c.req.param()

  const res = await getConceptAncestorsConceptAncestorIdApi({
    supabase: c.get('supabase'),
    params: { concept_ancestor_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/concept-ancestors/:concept_ancestor_id', withSupabase, async (c) => {
  console.log('put /concept-ancestors/:concept_ancestor_id')

  const { concept_ancestor_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyConceptAncestorCreate.parse(requestBody)

  const res = await putConceptAncestorsConceptAncestorIdApi({
    supabase: c.get('supabase'),
    body,
    params: { concept_ancestor_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch(
  '/concept-ancestors/:concept_ancestor_id',
  withSupabase,
  async (c) => {
    console.log('patch /concept-ancestors/:concept_ancestor_id')

    const { concept_ancestor_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = vocabularyConceptAncestorUpdate.parse(requestBody)

    const res = await patchConceptAncestorsConceptAncestorIdApi({
      supabase: c.get('supabase'),
      body,
      params: { concept_ancestor_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.delete(
  '/concept-ancestors/:concept_ancestor_id',
  withSupabase,
  async (c) => {
    console.log('delete /concept-ancestors/:concept_ancestor_id')

    const { concept_ancestor_id } = c.req.param()

    await deleteConceptAncestorsConceptAncestorIdApi({
      supabase: c.get('supabase'),
      params: { concept_ancestor_id },
    })()

    return c.body(null, 204)
  },
)
