import { resultsCohortDefinitionUpdate } from '@/types/resultsCohortDefinitionUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiCohortDefinitionsId } from '@/services/usePatchApiCohortDefinitionsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchCohortDefinitionsIdFormBody = {
  cohort_definition_name?: string | undefined
  cohort_definition_description?: string | undefined
  definition_type_concept_id?: number | undefined
  cohort_definition_syntax?: string | undefined
  subject_concept_id?: number | undefined
  cohort_initiation_date?: string | undefined
}

export type PatchCohortDefinitionsIdFormProps = {
  id: string
  defaultValues: Required<PatchCohortDefinitionsIdFormBody>
  onSuccess: () => void
}

export type PatchCohortDefinitionsIdFormPathParams = { id: string }

export const PatchCohortDefinitionsIdForm = (
  props: PatchCohortDefinitionsIdFormProps,
) => {
  const form = useForm<Required<PatchCohortDefinitionsIdFormBody>>({
    resolver: zodResolver(resultsCohortDefinitionUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiCohortDefinitionsId()

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
          lens={lens.focus('cohort_definition_name')}
          label="cohort_definition_name"
        />
        <StringField
          lens={lens.focus('cohort_definition_description')}
          label="cohort_definition_description"
        />
        <IntegerField
          lens={lens.focus('definition_type_concept_id')}
          label="definition_type_concept_id"
        />
        <StringField
          lens={lens.focus('cohort_definition_syntax')}
          label="cohort_definition_syntax"
        />
        <IntegerField
          lens={lens.focus('subject_concept_id')}
          label="subject_concept_id"
        />
        <StringField
          lens={lens.focus('cohort_initiation_date')}
          label="cohort_initiation_date"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
