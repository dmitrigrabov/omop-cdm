import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getMetadatasApi,
  postMetadatasApi,
  getMetadatasMetadataIdApi,
  putMetadatasMetadataIdApi,
  patchMetadatasMetadataIdApi,
  deleteMetadatasMetadataIdApi,
} from '@/metadatas/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { metadataMetadataCreate } from '@/types/metadataMetadataCreate.generated.ts'
import { metadataMetadataUpdate } from '@/types/metadataMetadataUpdate.generated.ts'

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

app.get('/metadatas', withSupabase, async (c) => {
  console.log('get /metadatas')

  const {
    offset,
    limit,
    metadata_concept_id,
    metadata_type_concept_id,
    value_as_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getMetadatasApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      metadata_concept_id,
      metadata_type_concept_id,
      value_as_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/metadatas', withSupabase, async (c) => {
  console.log('post /metadatas')

  const requestBody = await c.req.json()
  const body = metadataMetadataCreate.parse(requestBody)

  const res = await postMetadatasApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/metadatas/:metadata_id', withSupabase, async (c) => {
  console.log('get /metadatas/:metadata_id')

  const { metadata_id } = c.req.param()

  const res = await getMetadatasMetadataIdApi({
    supabase: c.get('supabase'),
    params: { metadata_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/metadatas/:metadata_id', withSupabase, async (c) => {
  console.log('put /metadatas/:metadata_id')

  const { metadata_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = metadataMetadataCreate.parse(requestBody)

  const res = await putMetadatasMetadataIdApi({
    supabase: c.get('supabase'),
    body,
    params: { metadata_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/metadatas/:metadata_id', withSupabase, async (c) => {
  console.log('patch /metadatas/:metadata_id')

  const { metadata_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = metadataMetadataUpdate.parse(requestBody)

  const res = await patchMetadatasMetadataIdApi({
    supabase: c.get('supabase'),
    body,
    params: { metadata_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/metadatas/:metadata_id', withSupabase, async (c) => {
  console.log('delete /metadatas/:metadata_id')

  const { metadata_id } = c.req.param()

  await deleteMetadatasMetadataIdApi({
    supabase: c.get('supabase'),
    params: { metadata_id },
  })()

  return c.body(null, 204)
})
