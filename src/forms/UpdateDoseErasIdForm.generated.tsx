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

export type UpdateDoseErasIdFormProps = {
  id: string
  defaultValues: Required<UpdateDoseErasIdFormBody>
  onSuccess: () => void
}

export type UpdateDoseErasIdFormPathParams = { id: string }

export const UpdateDoseErasIdForm = (props: UpdateDoseErasIdFormProps) => {
  const form = useForm<Required<UpdateDoseErasIdFormBody>>({
    resolver: zodResolver(derivedDoseEraCreate.required()),
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
        <IntegerField lens={lens.focus('person_id')} label="person_id" />
        <IntegerField
          lens={lens.focus('drug_concept_id')}
          label="drug_concept_id"
        />
        <IntegerField
          lens={lens.focus('unit_concept_id')}
          label="unit_concept_id"
        />
        <NumberField lens={lens.focus('dose_value')} />
        <StringField
          lens={lens.focus('dose_era_start_date')}
          label="dose_era_start_date"
        />
        <StringField
          lens={lens.focus('dose_era_end_date')}
          label="dose_era_end_date"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
