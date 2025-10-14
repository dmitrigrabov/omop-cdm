import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getCdmSourcesApi,
  postCdmSourcesApi,
  getCdmSourcesCdmSourceIdApi,
  putCdmSourcesCdmSourceIdApi,
  patchCdmSourcesCdmSourceIdApi,
  deleteCdmSourcesCdmSourceIdApi,
} from '@/cdm-sources/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { metadataCdmSourceCreate } from '@/types/metadataCdmSourceCreate.generated.ts'
import { metadataCdmSourceUpdate } from '@/types/metadataCdmSourceUpdate.generated.ts'

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

app.get('/cdm-sources', withSupabase, async (c) => {
  console.log('get /cdm-sources')

  const { offset, limit, cdm_version_concept_id, sort_by, sort_order } =
    c.req.query()

  const res = await getCdmSourcesApi({
    supabase: c.get('supabase'),
    params: { offset, limit, cdm_version_concept_id, sort_by, sort_order },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/cdm-sources', withSupabase, async (c) => {
  console.log('post /cdm-sources')

  const requestBody = await c.req.json()
  const body = metadataCdmSourceCreate.parse(requestBody)

  const res = await postCdmSourcesApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/cdm-sources/:cdm_source_id', withSupabase, async (c) => {
  console.log('get /cdm-sources/:cdm_source_id')

  const { cdm_source_id } = c.req.param()

  const res = await getCdmSourcesCdmSourceIdApi({
    supabase: c.get('supabase'),
    params: { cdm_source_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/cdm-sources/:cdm_source_id', withSupabase, async (c) => {
  console.log('put /cdm-sources/:cdm_source_id')

  const { cdm_source_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = metadataCdmSourceCreate.parse(requestBody)

  const res = await putCdmSourcesCdmSourceIdApi({
    supabase: c.get('supabase'),
    body,
    params: { cdm_source_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/cdm-sources/:cdm_source_id', withSupabase, async (c) => {
  console.log('patch /cdm-sources/:cdm_source_id')

  const { cdm_source_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = metadataCdmSourceUpdate.parse(requestBody)

  const res = await patchCdmSourcesCdmSourceIdApi({
    supabase: c.get('supabase'),
    body,
    params: { cdm_source_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/cdm-sources/:cdm_source_id', withSupabase, async (c) => {
  console.log('delete /cdm-sources/:cdm_source_id')

  const { cdm_source_id } = c.req.param()

  await deleteCdmSourcesCdmSourceIdApi({
    supabase: c.get('supabase'),
    params: { cdm_source_id },
  })()

  return c.body(null, 204)
})
