import { clinicalNoteNlp } from '@/types/clinicalNoteNlp.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiNoteNlpsResponse = z.object({
  data: z.array(clinicalNoteNlp),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiNoteNlpsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  section_concept_id?: CommonConceptId | undefined
  note_nlp_concept_id?: CommonConceptId | undefined
  note_nlp_source_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiNoteNlps = ({
  offset,
  limit,
  section_concept_id,
  note_nlp_concept_id,
  note_nlp_source_concept_id,
  sort_by,
  sort_order,
}: UseGetApiNoteNlpsArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - NoteNlps',
      offset,
      limit,
      section_concept_id,
      note_nlp_concept_id,
      note_nlp_source_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/note-nlps`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return useGetApiNoteNlpsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
