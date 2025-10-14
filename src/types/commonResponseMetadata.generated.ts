import { z } from 'zod'

export const commonResponseMetadata = z.object({
  timestamp: z.string(),
  version: z.string(),
  requestId: z.string().optional(),
})

export type CommonResponseMetadata = {
  timestamp: string
  version: string
  requestId?: string | undefined
}
