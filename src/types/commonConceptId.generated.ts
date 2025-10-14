import { z } from 'zod'

export type CommonConceptId = number

export const commonConceptId = z.number().int()
