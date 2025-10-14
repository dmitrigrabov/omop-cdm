
import { createServer } from 'jsr:@skmtc/server'
import skmtcGenShadcnForm from '@skmtc/gen-shadcn-form'
import skmtcGenShadcnSelect from '@skmtc/gen-shadcn-select'
import skmtcGenTanstackQuerySupabaseZod from '@skmtc/gen-tanstack-query-supabase-zod'
import skmtcGenZod from '@skmtc/gen-zod'
import skmtcGenTypescript from '@skmtc/gen-typescript'
import skmtcGenMsw from '@skmtc/gen-msw'

export default createServer({toGeneratorConfigMap: () => Object.fromEntries([skmtcGenShadcnForm,
skmtcGenShadcnSelect,
skmtcGenTanstackQuerySupabaseZod,
skmtcGenZod,
skmtcGenTypescript,
skmtcGenMsw].map(g => [g.id, g])), logsPath: undefined})