import { derivedDrugEraCreate } from '@/types/derivedDrugEraCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiDrugErasDrugEraId } from '@/services/useUpdateApiDrugErasDrugEraId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateDrugErasDrugEraIdFormBody = {
  person_id: number
  drug_concept_id: number
  drug_era_start_date: string
  drug_era_end_date: string
  drug_exposure_count?: number | undefined
  gap_days?: number | undefined
}

export const UpdateDrugErasDrugEraIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`drug_concept_id`} />
      <StringField
        fieldName={`drug_era_start_date`}
        label="drug_era_start_date"
      />
      <StringField fieldName={`drug_era_end_date`} label="drug_era_end_date" />
      <IntegerField fieldName={`drug_exposure_count`} />
      <IntegerField fieldName={`gap_days`} />
    </>
  )
}

export type UpdateDrugErasDrugEraIdFormProps = {
  drug_era_id: number
  defaultValues: UpdateDrugErasDrugEraIdFormBody
  onSuccess: () => void
}

export type UpdateDrugErasDrugEraIdFormPathParams = { drug_era_id: number }

export const UpdateDrugErasDrugEraIdForm = (
  props: UpdateDrugErasDrugEraIdFormProps,
) => {
  const form = useForm<UpdateDrugErasDrugEraIdFormBody>({
    resolver: zodResolver(derivedDrugEraCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiDrugErasDrugEraId()

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
        <UpdateDrugErasDrugEraIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
