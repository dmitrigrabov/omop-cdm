import { resultsCohortCreate } from '@/types/resultsCohortCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useCreateApiCohorts } from '@/services/useCreateApiCohorts.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateCohortsFormBody = {
  cohort_definition_id: number
  subject_id: number
  cohort_start_date: string
  cohort_end_date: string
}

export type CreateCohortsFormProps = {
  defaultValues: Required<CreateCohortsFormBody>
  onSuccess: () => void
}

export type CreateCohortsFormPathParams = Record<string, never>

export const CreateCohortsForm = (props: CreateCohortsFormProps) => {
  const form = useForm<Required<CreateCohortsFormBody>>({
    resolver: zodResolver(resultsCohortCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiCohorts()

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
