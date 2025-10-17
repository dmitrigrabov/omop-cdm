import { resultsCohortDefinitionUpdate } from '@/types/resultsCohortDefinitionUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiCohortDefinitionsCohortDefinitionId } from '@/services/usePatchApiCohortDefinitionsCohortDefinitionId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchCohortDefinitionsCohortDefinitionIdFormBody = {
  cohort_definition_id?: number | undefined
  cohort_definition_name?: string | undefined
  cohort_definition_description?: string | undefined
  definition_type_concept_id?: number | undefined
  cohort_definition_syntax?: string | undefined
  subject_concept_id?: number | undefined
  cohort_initiation_date?: string | undefined
}

export const PatchCohortDefinitionsCohortDefinitionIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`cohort_definition_id`} />
      <StringField
        fieldName={`cohort_definition_name`}
        label="cohort_definition_name"
      />
      <StringField
        fieldName={`cohort_definition_description`}
        label="cohort_definition_description"
      />
      <IntegerField fieldName={`definition_type_concept_id`} />
      <StringField
        fieldName={`cohort_definition_syntax`}
        label="cohort_definition_syntax"
      />
      <IntegerField fieldName={`subject_concept_id`} />
      <StringField
        fieldName={`cohort_initiation_date`}
        label="cohort_initiation_date"
      />
    </>
  )
}

export type PatchCohortDefinitionsCohortDefinitionIdFormProps = {
  cohort_definition_id: number
  defaultValues: PatchCohortDefinitionsCohortDefinitionIdFormBody
  onSuccess: () => void
}

export type PatchCohortDefinitionsCohortDefinitionIdFormPathParams = {
  cohort_definition_id: number
}

export const PatchCohortDefinitionsCohortDefinitionIdForm = (
  props: PatchCohortDefinitionsCohortDefinitionIdFormProps,
) => {
  const form = useForm<PatchCohortDefinitionsCohortDefinitionIdFormBody>({
    resolver: zodResolver(resultsCohortDefinitionUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiCohortDefinitionsCohortDefinitionId()

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
        <PatchCohortDefinitionsCohortDefinitionIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
