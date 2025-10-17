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

export type UpdateCohortsIdFormProps = {
  id: string
  defaultValues: Required<UpdateCohortsIdFormBody>
  onSuccess: () => void
}

export type UpdateCohortsIdFormPathParams = { id: string }

export const UpdateCohortsIdForm = (props: UpdateCohortsIdFormProps) => {
  const form = useForm<Required<UpdateCohortsIdFormBody>>({
    resolver: zodResolver(resultsCohortCreate.required()),
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
        <IntegerField
          lens={lens.focus('cohort_definition_id')}
          label="cohort_definition_id"
        />
        <IntegerField lens={lens.focus('subject_id')} label="subject_id" />
        <StringField
          lens={lens.focus('cohort_start_date')}
          label="cohort_start_date"
        />
        <StringField
          lens={lens.focus('cohort_end_date')}
          label="cohort_end_date"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
