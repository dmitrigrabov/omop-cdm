import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getVisitDetailsApi,
  postVisitDetailsApi,
  getVisitDetailsVisitDetailIdApi,
  putVisitDetailsVisitDetailIdApi,
  patchVisitDetailsVisitDetailIdApi,
  deleteVisitDetailsVisitDetailIdApi,
} from '@/visit-details/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalVisitDetailCreate } from '@/types/clinicalVisitDetailCreate.generated.ts'
import { clinicalVisitDetailUpdate } from '@/types/clinicalVisitDetailUpdate.generated.ts'

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

app.get('/visit-details', withSupabase, async (c) => {
  console.log('get /visit-details')

  const {
    offset,
    limit,
    person_id,
    visit_detail_concept_id,
    visit_detail_type_concept_id,
    provider_id,
    care_site_id,
    visit_detail_source_concept_id,
    admitted_from_concept_id,
    discharged_to_concept_id,
    preceding_visit_detail_id,
    parent_visit_detail_id,
    visit_occurrence_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getVisitDetailsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      visit_detail_concept_id,
      visit_detail_type_concept_id,
      provider_id,
      care_site_id,
      visit_detail_source_concept_id,
      admitted_from_concept_id,
      discharged_to_concept_id,
      preceding_visit_detail_id,
      parent_visit_detail_id,
      visit_occurrence_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/visit-details', withSupabase, async (c) => {
  console.log('post /visit-details')

  const requestBody = await c.req.json()
  const body = clinicalVisitDetailCreate.parse(requestBody)

  const res = await postVisitDetailsApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/visit-details/:visit_detail_id', withSupabase, async (c) => {
  console.log('get /visit-details/:visit_detail_id')

  const { visit_detail_id } = c.req.param()

  const res = await getVisitDetailsVisitDetailIdApi({
    supabase: c.get('supabase'),
    params: { visit_detail_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/visit-details/:visit_detail_id', withSupabase, async (c) => {
  console.log('put /visit-details/:visit_detail_id')

  const { visit_detail_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalVisitDetailCreate.parse(requestBody)

  const res = await putVisitDetailsVisitDetailIdApi({
    supabase: c.get('supabase'),
    body,
    params: { visit_detail_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/visit-details/:visit_detail_id', withSupabase, async (c) => {
  console.log('patch /visit-details/:visit_detail_id')

  const { visit_detail_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalVisitDetailUpdate.parse(requestBody)

  const res = await patchVisitDetailsVisitDetailIdApi({
    supabase: c.get('supabase'),
    body,
    params: { visit_detail_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/visit-details/:visit_detail_id', withSupabase, async (c) => {
  console.log('delete /visit-details/:visit_detail_id')

  const { visit_detail_id } = c.req.param()

  await deleteVisitDetailsVisitDetailIdApi({
    supabase: c.get('supabase'),
    params: { visit_detail_id },
  })()

  return c.body(null, 204)
})
