import { vocabularyDrugStrengthUpdate } from '@/types/vocabularyDrugStrengthUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { NumberField } from '@/components/fields/number-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiDrugStrengthsId } from '@/services/usePatchApiDrugStrengthsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchDrugStrengthsIdFormBody = {
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

export type PatchDrugStrengthsIdFormProps = {
  id: string
  defaultValues: Required<PatchDrugStrengthsIdFormBody>
  onSuccess: () => void
}

export type PatchDrugStrengthsIdFormPathParams = { id: string }

export const PatchDrugStrengthsIdForm = (
  props: PatchDrugStrengthsIdFormProps,
) => {
  const form = useForm<Required<PatchDrugStrengthsIdFormBody>>({
    resolver: zodResolver(vocabularyDrugStrengthUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiDrugStrengthsId()

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
          lens={lens.focus('drug_concept_id')}
          label="drug_concept_id"
        />
        <IntegerField
          lens={lens.focus('ingredient_concept_id')}
          label="ingredient_concept_id"
        />
        <NumberField lens={lens.focus('amount_value')} />
        <IntegerField
          lens={lens.focus('amount_unit_concept_id')}
          label="amount_unit_concept_id"
        />
        <NumberField lens={lens.focus('numerator_value')} />
        <IntegerField
          lens={lens.focus('numerator_unit_concept_id')}
          label="numerator_unit_concept_id"
        />
        <NumberField lens={lens.focus('denominator_value')} />
        <IntegerField
          lens={lens.focus('denominator_unit_concept_id')}
          label="denominator_unit_concept_id"
        />
        <IntegerField lens={lens.focus('box_size')} label="box_size" />
        <StringField
          lens={lens.focus('valid_start_date')}
          label="valid_start_date"
        />
        <StringField
          lens={lens.focus('valid_end_date')}
          label="valid_end_date"
        />
        <StringField
          lens={lens.focus('invalid_reason')}
          label="invalid_reason"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
