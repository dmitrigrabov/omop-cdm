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

export type PatchConceptClasssIdFormProps = {
  id: string
  defaultValues: Required<PatchConceptClasssIdFormBody>
  onSuccess: () => void
}

export type PatchConceptClasssIdFormPathParams = { id: string }

export const PatchConceptClasssIdForm = (
  props: PatchConceptClasssIdFormProps,
) => {
  const form = useForm<Required<PatchConceptClasssIdFormBody>>({
    resolver: zodResolver(vocabularyConceptClassUpdate.required()),
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
        <StringField
          lens={lens.focus('concept_class_name')}
          label="concept_class_name"
        />
        <IntegerField
          lens={lens.focus('concept_class_concept_id')}
          label="concept_class_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
