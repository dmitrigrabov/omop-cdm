import { vocabularySourceToConceptMapCreate } from '@/types/vocabularySourceToConceptMapCreate.generated.ts'
import { useUpdateApiSourceToConceptMapsSourceToConceptMapId } from '@/services/useUpdateApiSourceToConceptMapsSourceToConceptMapId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateSourceToConceptMapsSourceToConceptMapIdFormBody = {
  source_code: string
  source_concept_id: number
  source_vocabulary_id: string
  source_code_description?: string | undefined
  target_concept_id: number
  target_vocabulary_id: string
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}

export type UpdateSourceToConceptMapsSourceToConceptMapIdFormProps = {
  source_to_concept_map_id: number
  defaultValues: UpdateSourceToConceptMapsSourceToConceptMapIdFormBody
  onSuccess: () => void
}

export type UpdateSourceToConceptMapsSourceToConceptMapIdFormPathParams = {
  source_to_concept_map_id: number
}

export const UpdateSourceToConceptMapsSourceToConceptMapIdForm = (
  props: UpdateSourceToConceptMapsSourceToConceptMapIdFormProps,
) => {
  const form = useForm<UpdateSourceToConceptMapsSourceToConceptMapIdFormBody>({
    resolver: zodResolver(vocabularySourceToConceptMapCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiSourceToConceptMapsSourceToConceptMapId()

  useEffect(() => {
    if (mutator.isSuccess && props.onSuccess) {
      props.onSuccess()
    }
  }, [mutator.isSuccess])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((body, event) => {
          event?.preventDefault()

          mutator.mutate({ ...props, body })
        })}
        className="flex flex-col flex-1 gap-4 p-4"
      >
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
