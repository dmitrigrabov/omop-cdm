import { SupabaseClient, JwtPayload } from '@supabase/supabase-js'
import { Database } from '../database.types.ts'
import { flow, pipe } from 'fp-ts/lib/function.js'
import * as E from 'fp-ts/lib/Either.js'
import * as T from 'fp-ts/lib/Task.js'
import { HonoRequest } from 'hono'

type GetClaimsArgs = {
  req: HonoRequest
  supabase: SupabaseClient<Database>
}

type GetClaims = ({ supabase }: GetClaimsArgs) => T.Task<JwtPayload | null>

export const getClaims: GetClaims = ({ req, supabase }) => {
  return pipe(
    T.of(req),
    T.bind('jwks', () => {
      return async () => {
        const res = await fetch(`${Deno.env.get('JWKS_ORIGIN')}/auth/v1/.well-known/jwks.json`)
        return res.json()
      }
    }),
    T.bind('claims', res => {
      return async () => {
        const token = req.header('Authorization')?.replace('Bearer ', '')

        const claims = await supabase.auth.getClaims(token, { ...res.jwks })

        return claims
      }
    }),

    T.map(
      flow(
        res => (!res.claims.data ? E.left(res.claims.error) : E.right(res.claims.data)),
        E.match(
          e => {
            // throw e
            return null
          },
          res => res.claims
        )
      )
    )
  )
}
