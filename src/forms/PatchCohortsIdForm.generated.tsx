import { resultsCohortUpdate } from '@/types/resultsCohortUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiCohortsId } from '@/services/usePatchApiCohortsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchCohortsIdFormBody = {
  cohort_definition_id?: number | undefined
  subject_id?: number | undefined
  cohort_start_date?: string | undefined
  cohort_end_date?: string | undefined
}

export type PatchCohortsIdFormProps = {
  id: string
  defaultValues: Required<PatchCohortsIdFormBody>
  onSuccess: () => void
}

export type PatchCohortsIdFormPathParams = { id: string }

export const PatchCohortsIdForm = (props: PatchCohortsIdFormProps) => {
  const form = useForm<Required<PatchCohortsIdFormBody>>({
    resolver: zodResolver(resultsCohortUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiCohortsId()

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
