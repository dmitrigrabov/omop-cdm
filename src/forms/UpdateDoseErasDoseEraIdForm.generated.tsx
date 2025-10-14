import { derivedDoseEraCreate } from '@/types/derivedDoseEraCreate.generated.ts'
import { useUpdateApiDoseErasDoseEraId } from '@/services/useUpdateApiDoseErasDoseEraId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateDoseErasDoseEraIdFormBody = {
  person_id: number
  drug_concept_id: number
  unit_concept_id: number
  dose_value: number
  dose_era_start_date: string
  dose_era_end_date: string
}

export type UpdateDoseErasDoseEraIdFormProps = {
  dose_era_id: number
  defaultValues: UpdateDoseErasDoseEraIdFormBody
  onSuccess: () => void
}

export type UpdateDoseErasDoseEraIdFormPathParams = { dose_era_id: number }

export const UpdateDoseErasDoseEraIdForm = (
  props: UpdateDoseErasDoseEraIdFormProps,
) => {
  const form = useForm<UpdateDoseErasDoseEraIdFormBody>({
    resolver: zodResolver(derivedDoseEraCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiDoseErasDoseEraId()

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
