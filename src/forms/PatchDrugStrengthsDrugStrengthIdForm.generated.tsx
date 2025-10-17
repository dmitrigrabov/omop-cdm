import { vocabularyDrugStrengthUpdate } from '@/types/vocabularyDrugStrengthUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { NumberField } from '@/components/fields/number-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiDrugStrengthsDrugStrengthId } from '@/services/usePatchApiDrugStrengthsDrugStrengthId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchDrugStrengthsDrugStrengthIdFormBody = {
  drug_concept_id?: number | undefined
  ingredient_concept_id?: number | undefined
  amount_value?: number | undefined
  amount_unit_concept_id?: number | undefined
  numerator_value?: number | undefined
  numerator_unit_concept_id?: number | undefined
  denominator_value?: number | undefined
  denominator_unit_concept_id?: number | undefined
  box_size?: number | undefined
  valid_start_date?: string | undefined
  valid_end_date?: string | undefined
  invalid_reason?: string | undefined
}

export const PatchDrugStrengthsDrugStrengthIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`drug_concept_id`} />
      <IntegerField fieldName={`ingredient_concept_id`} />
      <NumberField fieldName={`amount_value`} />
      <IntegerField fieldName={`amount_unit_concept_id`} />
      <NumberField fieldName={`numerator_value`} />
      <IntegerField fieldName={`numerator_unit_concept_id`} />
      <NumberField fieldName={`denominator_value`} />
      <IntegerField fieldName={`denominator_unit_concept_id`} />
      <IntegerField fieldName={`box_size`} />
      <StringField fieldName={`valid_start_date`} label="valid_start_date" />
      <StringField fieldName={`valid_end_date`} label="valid_end_date" />
      <StringField fieldName={`invalid_reason`} label="invalid_reason" />
    </>
  )
}

export type PatchDrugStrengthsDrugStrengthIdFormProps = {
  drug_strength_id: number
  defaultValues: PatchDrugStrengthsDrugStrengthIdFormBody
  onSuccess: () => void
}

export type PatchDrugStrengthsDrugStrengthIdFormPathParams = {
  drug_strength_id: number
}

export const PatchDrugStrengthsDrugStrengthIdForm = (
  props: PatchDrugStrengthsDrugStrengthIdFormProps,
) => {
  const form = useForm<PatchDrugStrengthsDrugStrengthIdFormBody>({
    resolver: zodResolver(vocabularyDrugStrengthUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiDrugStrengthsDrugStrengthId()

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
        <PatchDrugStrengthsDrugStrengthIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
