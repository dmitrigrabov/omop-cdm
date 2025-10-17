import { vocabularyConceptClassUpdate } from '@/types/vocabularyConceptClassUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiConceptClasssId } from '@/services/usePatchApiConceptClasssId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchConceptClasssIdFormBody = {
  concept_class_name?: string | undefined
  concept_class_concept_id?: number | undefined
}

export const PatchConceptClasssIdFormFields = () => {
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

export type PatchConceptClasssIdFormProps = {
  id: string
  defaultValues: PatchConceptClasssIdFormBody
  onSuccess: () => void
}

export type PatchConceptClasssIdFormPathParams = { id: string }

export const PatchConceptClasssIdForm = (
  props: PatchConceptClasssIdFormProps,
) => {
  const form = useForm<PatchConceptClasssIdFormBody>({
    resolver: zodResolver(vocabularyConceptClassUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiConceptClasssId()

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
        <PatchConceptClasssIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
