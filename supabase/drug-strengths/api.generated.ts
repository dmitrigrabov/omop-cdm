import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getDrugStrengthsApi,
  postDrugStrengthsApi,
  getDrugStrengthsDrugStrengthIdApi,
  putDrugStrengthsDrugStrengthIdApi,
  patchDrugStrengthsDrugStrengthIdApi,
  deleteDrugStrengthsDrugStrengthIdApi,
} from '@/drug-strengths/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { vocabularyDrugStrengthCreate } from '@/types/vocabularyDrugStrengthCreate.generated.ts'
import { vocabularyDrugStrengthUpdate } from '@/types/vocabularyDrugStrengthUpdate.generated.ts'

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

app.get('/drug-strengths', withSupabase, async (c) => {
  console.log('get /drug-strengths')

  const {
    offset,
    limit,
    drug_concept_id,
    ingredient_concept_id,
    amount_unit_concept_id,
    numerator_unit_concept_id,
    denominator_unit_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getDrugStrengthsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      drug_concept_id,
      ingredient_concept_id,
      amount_unit_concept_id,
      numerator_unit_concept_id,
      denominator_unit_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/drug-strengths', withSupabase, async (c) => {
  console.log('post /drug-strengths')

  const requestBody = await c.req.json()
  const body = vocabularyDrugStrengthCreate.parse(requestBody)

  const res = await postDrugStrengthsApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/drug-strengths/:drug_strength_id', withSupabase, async (c) => {
  console.log('get /drug-strengths/:drug_strength_id')

  const { drug_strength_id } = c.req.param()

  const res = await getDrugStrengthsDrugStrengthIdApi({
    supabase: c.get('supabase'),
    params: { drug_strength_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/drug-strengths/:drug_strength_id', withSupabase, async (c) => {
  console.log('put /drug-strengths/:drug_strength_id')

  const { drug_strength_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyDrugStrengthCreate.parse(requestBody)

  const res = await putDrugStrengthsDrugStrengthIdApi({
    supabase: c.get('supabase'),
    body,
    params: { drug_strength_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/drug-strengths/:drug_strength_id', withSupabase, async (c) => {
  console.log('patch /drug-strengths/:drug_strength_id')

  const { drug_strength_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyDrugStrengthUpdate.parse(requestBody)

  const res = await patchDrugStrengthsDrugStrengthIdApi({
    supabase: c.get('supabase'),
    body,
    params: { drug_strength_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/drug-strengths/:drug_strength_id', withSupabase, async (c) => {
  console.log('delete /drug-strengths/:drug_strength_id')

  const { drug_strength_id } = c.req.param()

  await deleteDrugStrengthsDrugStrengthIdApi({
    supabase: c.get('supabase'),
    params: { drug_strength_id },
  })()

  return c.body(null, 204)
})
