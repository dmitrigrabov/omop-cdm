import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sentry } from '@hono/sentry'
import {
  getEpisodesApi,
  postEpisodesApi,
  getEpisodesEpisodeIdApi,
  putEpisodesEpisodeIdApi,
  patchEpisodesEpisodeIdApi,
  deleteEpisodesEpisodeIdApi,
} from '@/episodes/services.ts'
import { withSupabase } from '@/_shared/middleware.ts'
import { derivedEpisodeCreate } from '@/types/derivedEpisodeCreate.generated.ts'
import { derivedEpisodeUpdate } from '@/types/derivedEpisodeUpdate.generated.ts'

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

app.get('/episodes', withSupabase, async (c) => {
  console.log('get /episodes')

  const {
    offset,
    limit,
    person_id,
    episode_concept_id,
    episode_object_concept_id,
    episode_type_concept_id,
    episode_source_concept_id,
    sort_by,
    sort_order,
  } = c.req.query()

  const res = await getEpisodesApi({
    supabase: c.get('supabase'),
    params: {
      offset,
      limit,
      person_id,
      episode_concept_id,
      episode_object_concept_id,
      episode_type_concept_id,
      episode_source_concept_id,
      sort_by,
      sort_order,
    },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.post('/episodes', withSupabase, async (c) => {
  console.log('post /episodes')

  const requestBody = await c.req.json()
  const body = derivedEpisodeCreate.parse(requestBody)

  const res = await postEpisodesApi({ supabase: c.get('supabase'), body })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.get('/episodes/:episode_id', withSupabase, async (c) => {
  console.log('get /episodes/:episode_id')

  const { episode_id } = c.req.param()

  const res = await getEpisodesEpisodeIdApi({
    supabase: c.get('supabase'),
    params: { episode_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.put('/episodes/:episode_id', withSupabase, async (c) => {
  console.log('put /episodes/:episode_id')

  const { episode_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = derivedEpisodeCreate.parse(requestBody)

  const res = await putEpisodesEpisodeIdApi({
    supabase: c.get('supabase'),
    body,
    params: { episode_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.patch('/episodes/:episode_id', withSupabase, async (c) => {
  console.log('patch /episodes/:episode_id')

  const { episode_id } = c.req.param()

  const requestBody = await c.req.json()
  const body = derivedEpisodeUpdate.parse(requestBody)

  const res = await patchEpisodesEpisodeIdApi({
    supabase: c.get('supabase'),
    body,
    params: { episode_id },
  })()

  if (!res) {
    return c.body(null, 404)
  }

  return c.json(res)
})
app.delete('/episodes/:episode_id', withSupabase, async (c) => {
  console.log('delete /episodes/:episode_id')

  const { episode_id } = c.req.param()

  await deleteEpisodesEpisodeIdApi({
    supabase: c.get('supabase'),
    params: { episode_id },
  })()

  return c.body(null, 204)
})
