import { derivedDoseEraUpdate } from '@/types/derivedDoseEraUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { NumberField } from '@/components/fields/number-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiDoseErasId } from '@/services/usePatchApiDoseErasId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchDoseErasIdFormBody = {
  person_id?: number | undefined
  drug_concept_id?: number | undefined
  unit_concept_id?: number | undefined
  dose_value?: number | undefined
  dose_era_start_date?: string | undefined
  dose_era_end_date?: string | undefined
}

export const PatchDoseErasIdFormFields = () => {
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

export type PatchDoseErasIdFormProps = {
  id: number
  defaultValues: PatchDoseErasIdFormBody
  onSuccess: () => void
}

export type PatchDoseErasIdFormPathParams = { id: number }

export const PatchDoseErasIdForm = (props: PatchDoseErasIdFormProps) => {
  const form = useForm<PatchDoseErasIdFormBody>({
    resolver: zodResolver(derivedDoseEraUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiDoseErasId()

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
        <PatchDoseErasIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
