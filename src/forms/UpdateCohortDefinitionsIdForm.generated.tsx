import { resultsCohortDefinitionCreate } from '@/types/resultsCohortDefinitionCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiCohortDefinitionsId } from '@/services/useUpdateApiCohortDefinitionsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateCohortDefinitionsIdFormBody = {
  cohort_definition_id: number
  cohort_definition_name: string
  cohort_definition_description?: string | undefined
  definition_type_concept_id: number
  cohort_definition_syntax?: string | undefined
  subject_concept_id: number
  cohort_initiation_date?: string | undefined
}

export const UpdateCohortDefinitionsIdFormFields = () => {
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

export type UpdateCohortDefinitionsIdFormProps = {
  id: number
  defaultValues: UpdateCohortDefinitionsIdFormBody
  onSuccess: () => void
}

export type UpdateCohortDefinitionsIdFormPathParams = { id: number }

export const UpdateCohortDefinitionsIdForm = (
  props: UpdateCohortDefinitionsIdFormProps,
) => {
  const form = useForm<UpdateCohortDefinitionsIdFormBody>({
    resolver: zodResolver(resultsCohortDefinitionCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiCohortDefinitionsId()

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
        <UpdateCohortDefinitionsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
