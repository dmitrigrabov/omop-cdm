import { vocabularyDrugStrengthUpdate } from '@/types/vocabularyDrugStrengthUpdate.generated.ts'
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
