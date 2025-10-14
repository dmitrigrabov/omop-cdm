import { vocabularyDrugStrengthCreate } from '@/types/vocabularyDrugStrengthCreate.generated.ts'
import { useUpdateApiDrugStrengthsDrugStrengthId } from '@/services/useUpdateApiDrugStrengthsDrugStrengthId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateDrugStrengthsDrugStrengthIdFormBody = {
  drug_concept_id: number
  ingredient_concept_id: number
  amount_value?: number | undefined
  amount_unit_concept_id?: number | undefined
  numerator_value?: number | undefined
  numerator_unit_concept_id?: number | undefined
  denominator_value?: number | undefined
  denominator_unit_concept_id?: number | undefined
  box_size?: number | undefined
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}

export type UpdateDrugStrengthsDrugStrengthIdFormProps = {
  drug_strength_id: number
  defaultValues: UpdateDrugStrengthsDrugStrengthIdFormBody
  onSuccess: () => void
}

export type UpdateDrugStrengthsDrugStrengthIdFormPathParams = {
  drug_strength_id: number
}

export const UpdateDrugStrengthsDrugStrengthIdForm = (
  props: UpdateDrugStrengthsDrugStrengthIdFormProps,
) => {
  const form = useForm<UpdateDrugStrengthsDrugStrengthIdFormBody>({
    resolver: zodResolver(vocabularyDrugStrengthCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiDrugStrengthsDrugStrengthId()

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
