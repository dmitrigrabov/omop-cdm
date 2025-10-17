import { resultsCohortCreate } from '@/types/resultsCohortCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiCohortsId } from '@/services/useUpdateApiCohortsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateCohortsIdFormBody = {
  cohort_definition_id: number
  subject_id: number
  cohort_start_date: string
  cohort_end_date: string
}

export const UpdateCohortsIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`cohort_definition_id`} />
      <IntegerField fieldName={`subject_id`} />
      <StringField fieldName={`cohort_start_date`} label="cohort_start_date" />
      <StringField fieldName={`cohort_end_date`} label="cohort_end_date" />
    </>
  )
}

export type UpdateCohortsIdFormProps = {
  id: number
  defaultValues: UpdateCohortsIdFormBody
  onSuccess: () => void
}

export type UpdateCohortsIdFormPathParams = { id: number }

export const UpdateCohortsIdForm = (props: UpdateCohortsIdFormProps) => {
  const form = useForm<UpdateCohortsIdFormBody>({
    resolver: zodResolver(resultsCohortCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiCohortsId()

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
        <UpdateCohortsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
