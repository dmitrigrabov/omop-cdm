import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getEpisodeEventsApi,
  postEpisodeEventsApi,
  getEpisodeEventsEpisodeEventIdApi,
  putEpisodeEventsEpisodeEventIdApi,
  patchEpisodeEventsEpisodeEventIdApi,
  deleteEpisodeEventsEpisodeEventIdApi,
} from '@/episode-events/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { derivedEpisodeEventCreate } from '@/types/derivedEpisodeEventCreate.generated.ts'
import { derivedEpisodeEventUpdate } from '@/types/derivedEpisodeEventUpdate.generated.ts'

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

app.get('/episode-events', withSupabase, async (c) => {
  console.log('get /episode-events')

  const {
    offset,
    limit,
    episode_id,
    episode_event_field_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getEpisodeEventsApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      episode_id,
      episode_event_field_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/episode-events', withSupabase, async (c) => {
  console.log('post /episode-events')

  const requestBody = await c.req.json()
  const body = derivedEpisodeEventCreate.parse(requestBody)

  const res = await postEpisodeEventsApi({
    supabase: c.get('supabase'),
    body,
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/episode-events/:episode_event_id', withSupabase, async (c) => {
  console.log('get /episode-events/:episode_event_id')

  const { episode_event_id } = c.req.param()

  const res = await getEpisodeEventsEpisodeEventIdApi({
    supabase: c.get('supabase'),
    params: { episode_event_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/episode-events/:episode_event_id', withSupabase, async (c) => {
  console.log('put /episode-events/:episode_event_id')

  const { episode_event_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = derivedEpisodeEventCreate.parse(requestBody)

  const res = await putEpisodeEventsEpisodeEventIdApi({
    supabase: c.get('supabase'),
    body,
    params: { episode_event_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/episode-events/:episode_event_id', withSupabase, async (c) => {
  console.log('patch /episode-events/:episode_event_id')

  const { episode_event_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = derivedEpisodeEventUpdate.parse(requestBody)

  const res = await patchEpisodeEventsEpisodeEventIdApi({
    supabase: c.get('supabase'),
    body,
    params: { episode_event_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/episode-events/:episode_event_id', withSupabase, async (c) => {
  console.log('delete /episode-events/:episode_event_id')

  const { episode_event_id } = c.req.param()

  await deleteEpisodeEventsEpisodeEventIdApi({
    supabase: c.get('supabase'),
    params: { episode_event_id },
  })()

  return c.body(null, 204)
})
