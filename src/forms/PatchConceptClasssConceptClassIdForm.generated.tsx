import { vocabularyConceptClassUpdate } from '@/types/vocabularyConceptClassUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiConceptClasssConceptClassId } from '@/services/usePatchApiConceptClasssConceptClassId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchConceptClasssConceptClassIdFormBody = {
  concept_class_name?: string | undefined
  concept_class_concept_id?: number | undefined
}

export const PatchConceptClasssConceptClassIdFormFields = () => {
  return (
    <>
      <StringField
        fieldName={`concept_class_name`}
        label="concept_class_name"
      />
      <IntegerField fieldName={`concept_class_concept_id`} />
    </>
  )
}

export type PatchConceptClasssConceptClassIdFormProps = {
  concept_class_id: string
  defaultValues: PatchConceptClasssConceptClassIdFormBody
  onSuccess: () => void
}

export type PatchConceptClasssConceptClassIdFormPathParams = {
  concept_class_id: string
}

export const PatchConceptClasssConceptClassIdForm = (
  props: PatchConceptClasssConceptClassIdFormProps,
) => {
  const form = useForm<PatchConceptClasssConceptClassIdFormBody>({
    resolver: zodResolver(vocabularyConceptClassUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiConceptClasssConceptClassId()

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
        <PatchConceptClasssConceptClassIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
