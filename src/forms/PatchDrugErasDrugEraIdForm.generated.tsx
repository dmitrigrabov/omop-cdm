import { derivedDrugEraUpdate } from '@/types/derivedDrugEraUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiDrugErasDrugEraId } from '@/services/usePatchApiDrugErasDrugEraId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchDrugErasDrugEraIdFormBody = {
  person_id?: number | undefined
  drug_concept_id?: number | undefined
  drug_era_start_date?: string | undefined
  drug_era_end_date?: string | undefined
  drug_exposure_count?: number | undefined
  gap_days?: number | undefined
}

export const PatchDrugErasDrugEraIdFormFields = () => {
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

export type PatchDrugErasDrugEraIdFormProps = {
  drug_era_id: number
  defaultValues: PatchDrugErasDrugEraIdFormBody
  onSuccess: () => void
}

export type PatchDrugErasDrugEraIdFormPathParams = { drug_era_id: number }

export const PatchDrugErasDrugEraIdForm = (
  props: PatchDrugErasDrugEraIdFormProps,
) => {
  const form = useForm<PatchDrugErasDrugEraIdFormBody>({
    resolver: zodResolver(derivedDrugEraUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiDrugErasDrugEraId()

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
        <PatchDrugErasDrugEraIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
