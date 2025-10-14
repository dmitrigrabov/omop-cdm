import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getDrugExposuresApi,
  postDrugExposuresApi,
  getDrugExposuresDrugExposureIdApi,
  putDrugExposuresDrugExposureIdApi,
  patchDrugExposuresDrugExposureIdApi,
  deleteDrugExposuresDrugExposureIdApi,
} from '@/drug-exposures/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalDrugExposureCreate } from '@/types/clinicalDrugExposureCreate.generated.ts'
import { clinicalDrugExposureUpdate } from '@/types/clinicalDrugExposureUpdate.generated.ts'

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

app.get('/drug-exposures', withSupabase, async (c) => {
  console.log('get /drug-exposures')

  const {
    offset,
    limit,
    person_id,
    drug_concept_id,
    drug_type_concept_id,
    route_concept_id,
    provider_id,
    visit_occurrence_id,
    visit_detail_id,
    drug_source_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getDrugExposuresApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      drug_concept_id,
      drug_type_concept_id,
      route_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      drug_source_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/drug-exposures', withSupabase, async (c) => {
  console.log('post /drug-exposures')

  const requestBody = await c.req.json()
  const body = clinicalDrugExposureCreate.parse(requestBody)

  const res = await postDrugExposuresApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/drug-exposures/:drug_exposure_id', withSupabase, async (c) => {
  console.log('get /drug-exposures/:drug_exposure_id')

  const { drug_exposure_id } = c.req.param()

  const res = await getDrugExposuresDrugExposureIdApi({
    supabase: c.get('supabase'),
    params: { drug_exposure_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/drug-exposures/:drug_exposure_id', withSupabase, async (c) => {
  console.log('put /drug-exposures/:drug_exposure_id')

  const { drug_exposure_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalDrugExposureCreate.parse(requestBody)

  const res = await putDrugExposuresDrugExposureIdApi({
    supabase: c.get('supabase'),
    body,
    params: { drug_exposure_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/drug-exposures/:drug_exposure_id', withSupabase, async (c) => {
  console.log('patch /drug-exposures/:drug_exposure_id')

  const { drug_exposure_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = clinicalDrugExposureUpdate.parse(requestBody)

  const res = await patchDrugExposuresDrugExposureIdApi({
    supabase: c.get('supabase'),
    body,
    params: { drug_exposure_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/drug-exposures/:drug_exposure_id', withSupabase, async (c) => {
  console.log('delete /drug-exposures/:drug_exposure_id')

  const { drug_exposure_id } = c.req.param()

  await deleteDrugExposuresDrugExposureIdApi({
    supabase: c.get('supabase'),
    params: { drug_exposure_id },
  })()

  return c.body(null, 204)
})
