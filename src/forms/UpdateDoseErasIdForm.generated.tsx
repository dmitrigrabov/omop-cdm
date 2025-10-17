import { derivedDoseEraCreate } from '@/types/derivedDoseEraCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { NumberField } from '@/components/fields/number-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiDoseErasId } from '@/services/useUpdateApiDoseErasId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateDoseErasIdFormBody = {
  person_id: number
  drug_concept_id: number
  unit_concept_id: number
  dose_value: number
  dose_era_start_date: string
  dose_era_end_date: string
}

export const UpdateDoseErasIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`drug_concept_id`} />
      <IntegerField fieldName={`unit_concept_id`} />
      <NumberField fieldName={`dose_value`} />
      <StringField
        fieldName={`dose_era_start_date`}
        label="dose_era_start_date"
      />
      <StringField fieldName={`dose_era_end_date`} label="dose_era_end_date" />
    </>
  )
}

export type UpdateDoseErasIdFormProps = {
  id: number
  defaultValues: UpdateDoseErasIdFormBody
  onSuccess: () => void
}

export type UpdateDoseErasIdFormPathParams = { id: number }

export const UpdateDoseErasIdForm = (props: UpdateDoseErasIdFormProps) => {
  const form = useForm<UpdateDoseErasIdFormBody>({
    resolver: zodResolver(derivedDoseEraCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiDoseErasId()

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
        <UpdateDoseErasIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
