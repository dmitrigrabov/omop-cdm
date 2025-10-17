import { resultsCohortCreate } from '@/types/resultsCohortCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiCohortsCohortId } from '@/services/useUpdateApiCohortsCohortId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateCohortsCohortIdFormBody = {
  cohort_definition_id: number
  subject_id: number
  cohort_start_date: string
  cohort_end_date: string
}

export const UpdateCohortsCohortIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`cohort_definition_id`} />
      <IntegerField fieldName={`subject_id`} />
      <StringField fieldName={`cohort_start_date`} label="cohort_start_date" />
      <StringField fieldName={`cohort_end_date`} label="cohort_end_date" />
    </>
  )
}

export type UpdateCohortsCohortIdFormProps = {
  cohort_id: number
  defaultValues: UpdateCohortsCohortIdFormBody
  onSuccess: () => void
}

export type UpdateCohortsCohortIdFormPathParams = { cohort_id: number }

export const UpdateCohortsCohortIdForm = (
  props: UpdateCohortsCohortIdFormProps,
) => {
  const form = useForm<UpdateCohortsCohortIdFormBody>({
    resolver: zodResolver(resultsCohortCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiCohortsCohortId()

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
        <UpdateCohortsCohortIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
