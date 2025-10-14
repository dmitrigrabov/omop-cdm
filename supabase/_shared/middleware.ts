import { createMiddleware } from 'hono/factory'
import { createClient, JwtPayload, SupabaseClient } from '@supabase/supabase-js'
import invariant from 'tiny-invariant'
import { getClaims } from './loaders.ts'

export const withSupabase = createMiddleware<{
  Variables: {
    supabase: SupabaseClient
  }
}>(async (c, next) => {
  const Authorization = c.req.header('Authorization')!

  const isApiKey = Authorization.startsWith('Bearer sb_publishable')

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: {
      headers: { Authorization: isApiKey ? '' : Authorization }
    }
  })

  c.set('supabase', supabase)

  await next()
})

export const withClaims = createMiddleware<{
  Variables: {
    supabase: SupabaseClient
    claims: JwtPayload
  }
}>(async (c, next) => {
  const claims = await getClaims({ req: c.req, supabase: c.get('supabase') })()

  if (!claims) {
    return c.body(null, 401)
  }

  invariant(claims, 'Claims are required')

  c.set('claims', claims)

  await next()
})
