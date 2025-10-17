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

export type PatchDoseErasIdFormProps = {
  id: string
  defaultValues: Required<PatchDoseErasIdFormBody>
  onSuccess: () => void
}

export type PatchDoseErasIdFormPathParams = { id: string }

export const PatchDoseErasIdForm = (props: PatchDoseErasIdFormProps) => {
  const form = useForm<Required<PatchDoseErasIdFormBody>>({
    resolver: zodResolver(derivedDoseEraUpdate.required()),
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
