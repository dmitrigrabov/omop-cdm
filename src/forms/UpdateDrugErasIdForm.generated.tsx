import { derivedDrugEraCreate } from '@/types/derivedDrugEraCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiDrugErasId } from '@/services/useUpdateApiDrugErasId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateDrugErasIdFormBody = {
  person_id: number
  drug_concept_id: number
  drug_era_start_date: string
  drug_era_end_date: string
  drug_exposure_count?: number | undefined
  gap_days?: number | undefined
}

export type UpdateDrugErasIdFormProps = {
  id: string
  defaultValues: Required<UpdateDrugErasIdFormBody>
  onSuccess: () => void
}

export type UpdateDrugErasIdFormPathParams = { id: string }

export const UpdateDrugErasIdForm = (props: UpdateDrugErasIdFormProps) => {
  const form = useForm<Required<UpdateDrugErasIdFormBody>>({
    resolver: zodResolver(derivedDrugEraCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiDrugErasId()

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
        <StringField
          lens={lens.focus('drug_era_start_date')}
          label="drug_era_start_date"
        />
        <StringField
          lens={lens.focus('drug_era_end_date')}
          label="drug_era_end_date"
        />
        <IntegerField
          lens={lens.focus('drug_exposure_count')}
          label="drug_exposure_count"
        />
        <IntegerField lens={lens.focus('gap_days')} label="gap_days" />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
