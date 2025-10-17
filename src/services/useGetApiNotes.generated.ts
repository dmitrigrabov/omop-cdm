import { clinicalNoteList } from '@/types/clinicalNoteList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiNotesArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  note_type_concept_id?: CommonConceptId | undefined
  note_class_concept_id?: CommonConceptId | undefined
  encoding_concept_id?: CommonConceptId | undefined
  language_concept_id?: CommonConceptId | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  note_event_field_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiNotes = ({
  offset,
  limit,
  person_id,
  note_type_concept_id,
  note_class_concept_id,
  encoding_concept_id,
  language_concept_id,
  provider_id,
  visit_occurrence_id,
  visit_detail_id,
  note_event_field_concept_id,
  sort_by,
  sort_order,
}: UseGetApiNotesArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - Notes',
      offset,
      limit,
      person_id,
      note_type_concept_id,
      note_class_concept_id,
      encoding_concept_id,
      language_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      note_event_field_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/notes`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return clinicalNoteList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
