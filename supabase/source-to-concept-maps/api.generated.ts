import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getSourceToConceptMapsApi,
  postSourceToConceptMapsApi,
  getSourceToConceptMapsSourceToConceptMapIdApi,
  putSourceToConceptMapsSourceToConceptMapIdApi,
  patchSourceToConceptMapsSourceToConceptMapIdApi,
  deleteSourceToConceptMapsSourceToConceptMapIdApi,
} from '@/source-to-concept-maps/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { vocabularySourceToConceptMapCreate } from '@/types/vocabularySourceToConceptMapCreate.generated.ts'
import { vocabularySourceToConceptMapUpdate } from '@/types/vocabularySourceToConceptMapUpdate.generated.ts'

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

app.get('/source-to-concept-maps', withSupabase, async (c) => {
  console.log('get /source-to-concept-maps')

  const {
    offset,
    limit,
    source_concept_id,
    target_concept_id,
    target_vocabulary_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getSourceToConceptMapsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      source_concept_id,
      target_concept_id,
      target_vocabulary_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/source-to-concept-maps', withSupabase, async (c) => {
  console.log('post /source-to-concept-maps')

  const requestBody = await c.req.json()
  const body = vocabularySourceToConceptMapCreate.parse(requestBody)

  const res = await postSourceToConceptMapsApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get(
  '/source-to-concept-maps/:source_to_concept_map_id',
  withSupabase,
  async (c) => {
    console.log('get /source-to-concept-maps/:source_to_concept_map_id')

    const { source_to_concept_map_id } = c.req.param()

    const res = await getSourceToConceptMapsSourceToConceptMapIdApi({
      supabase: c.get('supabase'),
      params: { source_to_concept_map_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.put(
  '/source-to-concept-maps/:source_to_concept_map_id',
  withSupabase,
  async (c) => {
    console.log('put /source-to-concept-maps/:source_to_concept_map_id')

    const { source_to_concept_map_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = vocabularySourceToConceptMapCreate.parse(requestBody)

    const res = await putSourceToConceptMapsSourceToConceptMapIdApi({
      supabase: c.get('supabase'),
      body,
      params: { source_to_concept_map_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.patch(
  '/source-to-concept-maps/:source_to_concept_map_id',
  withSupabase,
  async (c) => {
    console.log('patch /source-to-concept-maps/:source_to_concept_map_id')

    const { source_to_concept_map_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = vocabularySourceToConceptMapUpdate.parse(requestBody)

    const res = await patchSourceToConceptMapsSourceToConceptMapIdApi({
      supabase: c.get('supabase'),
      body,
      params: { source_to_concept_map_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.delete(
  '/source-to-concept-maps/:source_to_concept_map_id',
  withSupabase,
  async (c) => {
    console.log('delete /source-to-concept-maps/:source_to_concept_map_id')

    const { source_to_concept_map_id } = c.req.param()

    await deleteSourceToConceptMapsSourceToConceptMapIdApi({
      supabase: c.get('supabase'),
      params: { source_to_concept_map_id },
    })()

    return c.body(null, 204)
  },
)
