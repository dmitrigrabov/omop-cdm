import { vocabularyConceptClassCreate } from '@/types/vocabularyConceptClassCreate.generated.ts'
import { useUpdateApiConceptClasssConceptClassId } from '@/services/useUpdateApiConceptClasssConceptClassId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConceptClasssConceptClassIdFormBody = {
  concept_class_name: string
  concept_class_concept_id: number
}

export type UpdateConceptClasssConceptClassIdFormProps = {
  concept_class_id: string
  defaultValues: UpdateConceptClasssConceptClassIdFormBody
  onSuccess: () => void
}

export type UpdateConceptClasssConceptClassIdFormPathParams = {
  concept_class_id: string
}

export const UpdateConceptClasssConceptClassIdForm = (
  props: UpdateConceptClasssConceptClassIdFormProps,
) => {
  const form = useForm<UpdateConceptClasssConceptClassIdFormBody>({
    resolver: zodResolver(vocabularyConceptClassCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiConceptClasssConceptClassId()

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
