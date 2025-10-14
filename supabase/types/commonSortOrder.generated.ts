import { z } from 'zod'

export type CommonSortOrder = 'asc' | 'desc'

export const commonSortOrder = z.enum(['asc', 'desc'])
