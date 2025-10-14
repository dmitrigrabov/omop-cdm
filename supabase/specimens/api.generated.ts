import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getSpecimensApi,
  postSpecimensApi,
  getSpecimensSpecimenIdApi,
  putSpecimensSpecimenIdApi,
  patchSpecimensSpecimenIdApi,
  deleteSpecimensSpecimenIdApi,
} from '@/specimens/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalSpecimenCreate } from '@/types/clinicalSpecimenCreate.generated.ts'
import { clinicalSpecimenUpdate } from '@/types/clinicalSpecimenUpdate.generated.ts'

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

app.get('/specimens', withSupabase, async (c) => {
  console.log('get /specimens')

  const {
    offset,
    limit,
    person_id,
    specimen_concept_id,
    specimen_type_concept_id,
    unit_concept_id,
    anatomic_site_concept_id,
    disease_status_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getSpecimensApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      specimen_concept_id,
      specimen_type_concept_id,
      unit_concept_id,
      anatomic_site_concept_id,
      disease_status_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/specimens', withSupabase, async (c) => {
  console.log('post /specimens')

  const requestBody = await c.req.json()
  const body = clinicalSpecimenCreate.parse(requestBody)

  const res = await postSpecimensApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/specimens/:specimen_id', withSupabase, async (c) => {
  console.log('get /specimens/:specimen_id')

  const { specimen_id } = c.req.param()

  const res = await getSpecimensSpecimenIdApi({
    supabase: c.get('supabase'),
    params: { specimen_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/specimens/:specimen_id', withSupabase, async (c) => {
  console.log('put /specimens/:specimen_id')

  const { specimen_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalSpecimenCreate.parse(requestBody)

  const res = await putSpecimensSpecimenIdApi({
    supabase: c.get('supabase'),
    body,
    params: { specimen_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/specimens/:specimen_id', withSupabase, async (c) => {
  console.log('patch /specimens/:specimen_id')

  const { specimen_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalSpecimenUpdate.parse(requestBody)

  const res = await patchSpecimensSpecimenIdApi({
    supabase: c.get('supabase'),
    body,
    params: { specimen_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/specimens/:specimen_id', withSupabase, async (c) => {
  console.log('delete /specimens/:specimen_id')

  const { specimen_id } = c.req.param()

  await deleteSpecimensSpecimenIdApi({
    supabase: c.get('supabase'),
    params: { specimen_id },
  })()

  return c.body(null, 204)
})
