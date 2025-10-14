import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getCohortDefinitionsApi,
  postCohortDefinitionsApi,
  getCohortDefinitionsCohortDefinitionIdApi,
  putCohortDefinitionsCohortDefinitionIdApi,
  patchCohortDefinitionsCohortDefinitionIdApi,
  deleteCohortDefinitionsCohortDefinitionIdApi,
} from '@/cohort-definitions/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { resultsCohortDefinitionCreate } from '@/types/resultsCohortDefinitionCreate.generated.ts'
import { resultsCohortDefinitionUpdate } from '@/types/resultsCohortDefinitionUpdate.generated.ts'

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

app.get('/cohort-definitions', withSupabase, async (c) => {
  console.log('get /cohort-definitions')

  const {
    offset,
    limit,
    definition_type_concept_id,
    subject_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getCohortDefinitionsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      definition_type_concept_id,
      subject_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/cohort-definitions', withSupabase, async (c) => {
  console.log('post /cohort-definitions')

  const requestBody = await c.req.json()
  const body = resultsCohortDefinitionCreate.parse(requestBody)

  const res = await postCohortDefinitionsApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get(
  '/cohort-definitions/:cohort_definition_id',
  withSupabase,
  async (c) => {
    console.log('get /cohort-definitions/:cohort_definition_id')

    const { cohort_definition_id } = c.req.param()

    const res = await getCohortDefinitionsCohortDefinitionIdApi({
      supabase: c.get('supabase'),
      params: { cohort_definition_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.put(
  '/cohort-definitions/:cohort_definition_id',
  withSupabase,
  async (c) => {
    console.log('put /cohort-definitions/:cohort_definition_id')

    const { cohort_definition_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = resultsCohortDefinitionCreate.parse(requestBody)

    const res = await putCohortDefinitionsCohortDefinitionIdApi({
      supabase: c.get('supabase'),
      body,
      params: { cohort_definition_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.patch(
  '/cohort-definitions/:cohort_definition_id',
  withSupabase,
  async (c) => {
    console.log('patch /cohort-definitions/:cohort_definition_id')

    const { cohort_definition_id } = c.req.param()

    const requestBody = await c.req.json()
    const body = resultsCohortDefinitionUpdate.parse(requestBody)

    const res = await patchCohortDefinitionsCohortDefinitionIdApi({
      supabase: c.get('supabase'),
      body,
      params: { cohort_definition_id },
    })()

    if (!res) {
      return c.body(null, 404)
    }

    return c.json(res)
  },
)
app.delete(
  '/cohort-definitions/:cohort_definition_id',
  withSupabase,
  async (c) => {
    console.log('delete /cohort-definitions/:cohort_definition_id')

    const { cohort_definition_id } = c.req.param()

    await deleteCohortDefinitionsCohortDefinitionIdApi({
      supabase: c.get('supabase'),
      params: { cohort_definition_id },
    })()

    return c.body(null, 204)
  },
)
