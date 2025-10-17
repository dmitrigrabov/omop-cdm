import { vocabularyConceptAncestorUpdate } from '@/types/vocabularyConceptAncestorUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiConceptAncestorsId } from '@/services/usePatchApiConceptAncestorsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchConceptAncestorsIdFormBody = {
  ancestor_concept_id?: number | undefined
  descendant_concept_id?: number | undefined
  min_levels_of_separation?: number | undefined
  max_levels_of_separation?: number | undefined
}

export type PatchConceptAncestorsIdFormProps = {
  id: string
  defaultValues: Required<PatchConceptAncestorsIdFormBody>
  onSuccess: () => void
}

export type PatchConceptAncestorsIdFormPathParams = { id: string }

export const PatchConceptAncestorsIdForm = (
  props: PatchConceptAncestorsIdFormProps,
) => {
  const form = useForm<Required<PatchConceptAncestorsIdFormBody>>({
    resolver: zodResolver(vocabularyConceptAncestorUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiConceptAncestorsId()

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
        <IntegerField
          lens={lens.focus('ancestor_concept_id')}
          label="ancestor_concept_id"
        />
        <IntegerField
          lens={lens.focus('descendant_concept_id')}
          label="descendant_concept_id"
        />
        <IntegerField
          lens={lens.focus('min_levels_of_separation')}
          label="min_levels_of_separation"
        />
        <IntegerField
          lens={lens.focus('max_levels_of_separation')}
          label="max_levels_of_separation"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
