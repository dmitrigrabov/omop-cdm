import {
  vocabularyDrugStrength,
  VocabularyDrugStrength,
} from '@/types/vocabularyDrugStrength.generated.ts'
import { z } from 'zod'

export const vocabularyDrugStrengthList = z.object({
  data: z.array(vocabularyDrugStrength),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type VocabularyDrugStrengthList = {
  data: Array<VocabularyDrugStrength>
  pagination: { total: number; offset: number; limit: number; count: number }
}
