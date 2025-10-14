
import { createServer } from 'jsr:@skmtc/server'
import skmtcGenSupabaseHono from '@skmtc/gen-supabase-hono'
import skmtcGenTypescript from '@skmtc/gen-typescript'
import skmtcGenZod from '@skmtc/gen-zod'

export default createServer({toGeneratorConfigMap: () => Object.fromEntries([skmtcGenSupabaseHono,
skmtcGenTypescript,
skmtcGenZod].map(g => [g.id, g])), logsPath: undefined})