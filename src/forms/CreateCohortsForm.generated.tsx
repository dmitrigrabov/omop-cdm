import { resultsCohortCreate } from '@/types/resultsCohortCreate.generated.ts'
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
  defaultValues: CreateCohortsFormBody
  onSuccess: () => void
}

export type CreateCohortsFormPathParams = Record<string, never>

export const CreateCohortsForm = (props: CreateCohortsFormProps) => {
  const form = useForm<CreateCohortsFormBody>({
    resolver: zodResolver(resultsCohortCreate),
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
