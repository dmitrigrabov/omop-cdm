import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getDeathsApi,
  postDeathsApi,
  getDeathsDeathIdApi,
  putDeathsDeathIdApi,
  patchDeathsDeathIdApi,
  deleteDeathsDeathIdApi,
} from '@/deaths/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalDeathCreate } from '@/types/clinicalDeathCreate.generated.ts'
import { clinicalDeathUpdate } from '@/types/clinicalDeathUpdate.generated.ts'

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

app.get('/deaths', withSupabase, async (c) => {
  console.log('get /deaths')

  const {
    offset,
    limit,
    person_id,
    death_type_concept_id,
    cause_concept_id,
    cause_source_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getDeathsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      death_type_concept_id,
      cause_concept_id,
      cause_source_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/deaths', withSupabase, async (c) => {
  console.log('post /deaths')

  const requestBody = await c.req.json()
  const body = clinicalDeathCreate.parse(requestBody)

  const res = await postDeathsApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/deaths/:death_id', withSupabase, async (c) => {
  console.log('get /deaths/:death_id')

  const { death_id } = c.req.param()

  const res = await getDeathsDeathIdApi({
    supabase: c.get('supabase'),
    params: { death_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/deaths/:death_id', withSupabase, async (c) => {
  console.log('put /deaths/:death_id')

  const { death_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalDeathCreate.parse(requestBody)

  const res = await putDeathsDeathIdApi({
    supabase: c.get('supabase'),
    body,
    params: { death_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/deaths/:death_id', withSupabase, async (c) => {
  console.log('patch /deaths/:death_id')

  const { death_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalDeathUpdate.parse(requestBody)

  const res = await patchDeathsDeathIdApi({
    supabase: c.get('supabase'),
    body,
    params: { death_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/deaths/:death_id', withSupabase, async (c) => {
  console.log('delete /deaths/:death_id')

  const { death_id } = c.req.param()

  await deleteDeathsDeathIdApi({
    supabase: c.get('supabase'),
    params: { death_id },
  })()

  return c.body(null, 204)
})
