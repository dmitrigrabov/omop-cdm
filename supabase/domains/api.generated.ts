import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getDomainsApi,
  postDomainsApi,
  getDomainsDomainIdApi,
  putDomainsDomainIdApi,
  patchDomainsDomainIdApi,
  deleteDomainsDomainIdApi,
} from '@/domains/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { vocabularyDomainCreate } from '@/types/vocabularyDomainCreate.generated.ts'
import { vocabularyDomainUpdate } from '@/types/vocabularyDomainUpdate.generated.ts'

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

app.get('/domains', withSupabase, async (c) => {
  console.log('get /domains')

  const { offset, limit, domain_concept_id, sort_by, sort_order } =
    c.req.query()

  const res = await getDomainsApi({
    supabase: c.get('supabase'),
    params: { offset, limit, domain_concept_id, sort_by, sort_order },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/domains', withSupabase, async (c) => {
  console.log('post /domains')

  const requestBody = await c.req.json()
  const body = vocabularyDomainCreate.parse(requestBody)

  const res = await postDomainsApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/domains/:domain_id', withSupabase, async (c) => {
  console.log('get /domains/:domain_id')

  const { domain_id } = c.req.param()

  const res = await getDomainsDomainIdApi({
    supabase: c.get('supabase'),
    params: { domain_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/domains/:domain_id', withSupabase, async (c) => {
  console.log('put /domains/:domain_id')

  const { domain_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyDomainCreate.parse(requestBody)

  const res = await putDomainsDomainIdApi({
    supabase: c.get('supabase'),
    body,
    params: { domain_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/domains/:domain_id', withSupabase, async (c) => {
  console.log('patch /domains/:domain_id')

  const { domain_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = vocabularyDomainUpdate.parse(requestBody)

  const res = await patchDomainsDomainIdApi({
    supabase: c.get('supabase'),
    body,
    params: { domain_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/domains/:domain_id', withSupabase, async (c) => {
  console.log('delete /domains/:domain_id')

  const { domain_id } = c.req.param()

  await deleteDomainsDomainIdApi({
    supabase: c.get('supabase'),
    params: { domain_id },
  })()

  return c.body(null, 204)
})
