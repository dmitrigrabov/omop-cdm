import { clinicalSpecimenCreate } from '@/types/clinicalSpecimenCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { NumberField } from '@/components/fields/number-field'
import { useUpdateApiSpecimensId } from '@/services/useUpdateApiSpecimensId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateSpecimensIdFormBody = {
  person_id: number
  specimen_concept_id: number
  specimen_type_concept_id: number
  specimen_date: string
  specimen_datetime?: string | undefined
  quantity?: number | undefined
  unit_concept_id?: number | undefined
  anatomic_site_concept_id?: number | undefined
  disease_status_concept_id?: number | undefined
  specimen_source_id?: string | undefined
  specimen_source_value?: string | undefined
  unit_source_value?: string | undefined
  anatomic_site_source_value?: string | undefined
  disease_status_source_value?: string | undefined
}

export type UpdateSpecimensIdFormProps = {
  id: string
  defaultValues: Required<UpdateSpecimensIdFormBody>
  onSuccess: () => void
}

export type UpdateSpecimensIdFormPathParams = { id: string }

export const UpdateSpecimensIdForm = (props: UpdateSpecimensIdFormProps) => {
  const form = useForm<Required<UpdateSpecimensIdFormBody>>({
    resolver: zodResolver(clinicalSpecimenCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiSpecimensId()

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
          lens={lens.focus('specimen_concept_id')}
          label="specimen_concept_id"
        />
        <IntegerField
          lens={lens.focus('specimen_type_concept_id')}
          label="specimen_type_concept_id"
        />
        <StringField lens={lens.focus('specimen_date')} label="specimen_date" />
        <StringField
          lens={lens.focus('specimen_datetime')}
          label="specimen_datetime"
        />
        <NumberField lens={lens.focus('quantity')} />
        <IntegerField
          lens={lens.focus('unit_concept_id')}
          label="unit_concept_id"
        />
        <IntegerField
          lens={lens.focus('anatomic_site_concept_id')}
          label="anatomic_site_concept_id"
        />
        <IntegerField
          lens={lens.focus('disease_status_concept_id')}
          label="disease_status_concept_id"
        />
        <StringField
          lens={lens.focus('specimen_source_id')}
          label="specimen_source_id"
        />
        <StringField
          lens={lens.focus('specimen_source_value')}
          label="specimen_source_value"
        />
        <StringField
          lens={lens.focus('unit_source_value')}
          label="unit_source_value"
        />
        <StringField
          lens={lens.focus('anatomic_site_source_value')}
          label="anatomic_site_source_value"
        />
        <StringField
          lens={lens.focus('disease_status_source_value')}
          label="disease_status_source_value"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
