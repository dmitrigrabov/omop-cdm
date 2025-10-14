import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getPayerPlanPeriodsApi,
  postPayerPlanPeriodsApi,
  getPayerPlanPeriodsPayerPlanPeriodIdApi,
  putPayerPlanPeriodsPayerPlanPeriodIdApi,
  patchPayerPlanPeriodsPayerPlanPeriodIdApi,
  deletePayerPlanPeriodsPayerPlanPeriodIdApi,
} from '@/payer-plan-periods/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { healthsystemPayerPlanPeriodCreate } from '@/types/healthsystemPayerPlanPeriodCreate.generated.ts'
import { healthsystemPayerPlanPeriodUpdate } from '@/types/healthsystemPayerPlanPeriodUpdate.generated.ts'

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

app.get('/payer-plan-periods', withSupabase, async (c) => {
  console.log('get /payer-plan-periods')

  const {
    offset,
    limit,
    person_id,
    payer_concept_id,
    payer_source_concept_id,
    plan_concept_id,
    plan_source_concept_id,
    sponsor_concept_id,
    sponsor_source_concept_id,
    stop_reason_concept_id,
    stop_reason_source_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getPayerPlanPeriodsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      payer_concept_id,
      payer_source_concept_id,
      plan_concept_id,
      plan_source_concept_id,
      sponsor_concept_id,
      sponsor_source_concept_id,
      stop_reason_concept_id,
      stop_reason_source_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/payer-plan-periods', withSupabase, async (c) => {
  console.log('post /payer-plan-periods')

  const requestBody = await c.req.json()
  const body = healthsystemPayerPlanPeriodCreate.parse(requestBody)

  const res = await postPayerPlanPeriodsApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get(
  '/payer-plan-periods/:payer_plan_period_id',
  withSupabase,
  async (c) => {
    console.log('get /payer-plan-periods/:payer_plan_period_id')

    const { payer_plan_period_id } = c.req.param()

    const res = await getPayerPlanPeriodsPayerPlanPeriodIdApi({
      supabase: c.get('supabase'),
      params: { payer_plan_period_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.put(
  '/payer-plan-periods/:payer_plan_period_id',
  withSupabase,
  async (c) => {
    console.log('put /payer-plan-periods/:payer_plan_period_id')

    const { payer_plan_period_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = healthsystemPayerPlanPeriodCreate.parse(requestBody)

    const res = await putPayerPlanPeriodsPayerPlanPeriodIdApi({
      supabase: c.get('supabase'),
      body,
      params: { payer_plan_period_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.patch(
  '/payer-plan-periods/:payer_plan_period_id',
  withSupabase,
  async (c) => {
    console.log('patch /payer-plan-periods/:payer_plan_period_id')

    const { payer_plan_period_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = healthsystemPayerPlanPeriodUpdate.parse(requestBody)

    const res = await patchPayerPlanPeriodsPayerPlanPeriodIdApi({
      supabase: c.get('supabase'),
      body,
      params: { payer_plan_period_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.delete(
  '/payer-plan-periods/:payer_plan_period_id',
  withSupabase,
  async (c) => {
    console.log('delete /payer-plan-periods/:payer_plan_period_id')

    const { payer_plan_period_id } = c.req.param()

    await deletePayerPlanPeriodsPayerPlanPeriodIdApi({
      supabase: c.get('supabase'),
      params: { payer_plan_period_id },
    })()

    return c.body(null, 204)
  },
)
