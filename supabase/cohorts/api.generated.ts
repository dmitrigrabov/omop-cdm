import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getCohortsApi,
  postCohortsApi,
  getCohortsCohortIdApi,
  putCohortsCohortIdApi,
  patchCohortsCohortIdApi,
  deleteCohortsCohortIdApi,
} from '@/cohorts/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { resultsCohortCreate } from '@/types/resultsCohortCreate.generated.ts'
import { resultsCohortUpdate } from '@/types/resultsCohortUpdate.generated.ts'

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

app.get('/cohorts', withSupabase, async (c) => {
  console.log('get /cohorts')

  const { offset, limit, sort_by, sort_order } = c.req.query()

  const res = await getCohortsApi({
    supabase: c.get('supabase'),
    params: { offset, limit, sort_by, sort_order },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/cohorts', withSupabase, async (c) => {
  console.log('post /cohorts')

  const requestBody = await c.req.json()
  const body = resultsCohortCreate.parse(requestBody)

  const res = await postCohortsApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/cohorts/:cohort_id', withSupabase, async (c) => {
  console.log('get /cohorts/:cohort_id')

  const { cohort_id } = c.req.param()

  const res = await getCohortsCohortIdApi({
    supabase: c.get('supabase'),
    params: { cohort_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/cohorts/:cohort_id', withSupabase, async (c) => {
  console.log('put /cohorts/:cohort_id')

  const { cohort_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = resultsCohortCreate.parse(requestBody)

  const res = await putCohortsCohortIdApi({
    supabase: c.get('supabase'),
    body,
    params: { cohort_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/cohorts/:cohort_id', withSupabase, async (c) => {
  console.log('patch /cohorts/:cohort_id')

  const { cohort_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = resultsCohortUpdate.parse(requestBody)

  const res = await patchCohortsCohortIdApi({
    supabase: c.get('supabase'),
    body,
    params: { cohort_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/cohorts/:cohort_id', withSupabase, async (c) => {
  console.log('delete /cohorts/:cohort_id')

  const { cohort_id } = c.req.param()

  await deleteCohortsCohortIdApi({
    supabase: c.get('supabase'),
    params: { cohort_id },
  })()

  return c.body(null, 204)
})
