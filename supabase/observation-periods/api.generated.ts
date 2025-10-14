import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getObservationPeriodsApi,
  postObservationPeriodsApi,
  getObservationPeriodsObservationPeriodIdApi,
  putObservationPeriodsObservationPeriodIdApi,
  patchObservationPeriodsObservationPeriodIdApi,
  deleteObservationPeriodsObservationPeriodIdApi,
} from '@/observation-periods/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { clinicalObservationPeriodCreate } from '@/types/clinicalObservationPeriodCreate.generated.ts'
import { clinicalObservationPeriodUpdate } from '@/types/clinicalObservationPeriodUpdate.generated.ts'

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

app.get('/observation-periods', withSupabase, async (c) => {
  console.log('get /observation-periods')

  const {
    offset,
    limit,
    person_id,
    period_type_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getObservationPeriodsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      period_type_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/observation-periods', withSupabase, async (c) => {
  console.log('post /observation-periods')

  const requestBody = await c.req.json()
  const body = clinicalObservationPeriodCreate.parse(requestBody)

  const res = await postObservationPeriodsApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get(
  '/observation-periods/:observation_period_id',
  withSupabase,
  async (c) => {
    console.log('get /observation-periods/:observation_period_id')

    const { observation_period_id } = c.req.param()

    const res = await getObservationPeriodsObservationPeriodIdApi({
      supabase: c.get('supabase'),
      params: { observation_period_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.put(
  '/observation-periods/:observation_period_id',
  withSupabase,
  async (c) => {
    console.log('put /observation-periods/:observation_period_id')

    const { observation_period_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = clinicalObservationPeriodCreate.parse(requestBody)

    const res = await putObservationPeriodsObservationPeriodIdApi({
      supabase: c.get('supabase'),
      body,
      params: { observation_period_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.patch(
  '/observation-periods/:observation_period_id',
  withSupabase,
  async (c) => {
    console.log('patch /observation-periods/:observation_period_id')

    const { observation_period_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = clinicalObservationPeriodUpdate.parse(requestBody)

    const res = await patchObservationPeriodsObservationPeriodIdApi({
      supabase: c.get('supabase'),
      body,
      params: { observation_period_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.delete(
  '/observation-periods/:observation_period_id',
  withSupabase,
  async (c) => {
    console.log('delete /observation-periods/:observation_period_id')

    const { observation_period_id } = c.req.param()

    await deleteObservationPeriodsObservationPeriodIdApi({
      supabase: c.get('supabase'),
      params: { observation_period_id },
    })()

    return c.body(null, 204)
  },
)
