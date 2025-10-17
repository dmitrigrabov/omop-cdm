import { clinicalSpecimenCreate } from '@/types/clinicalSpecimenCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { NumberField } from '@/components/fields/number-field'
import { useUpdateApiSpecimensSpecimenId } from '@/services/useUpdateApiSpecimensSpecimenId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateSpecimensSpecimenIdFormBody = {
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

export const UpdateSpecimensSpecimenIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`specimen_concept_id`} />
      <IntegerField fieldName={`specimen_type_concept_id`} />
      <StringField fieldName={`specimen_date`} label="specimen_date" />
      <StringField fieldName={`specimen_datetime`} label="specimen_datetime" />
      <NumberField fieldName={`quantity`} />
      <IntegerField fieldName={`unit_concept_id`} />
      <IntegerField fieldName={`anatomic_site_concept_id`} />
      <IntegerField fieldName={`disease_status_concept_id`} />
      <StringField
        fieldName={`specimen_source_id`}
        label="specimen_source_id"
      />
      <StringField
        fieldName={`specimen_source_value`}
        label="specimen_source_value"
      />
      <StringField fieldName={`unit_source_value`} label="unit_source_value" />
      <StringField
        fieldName={`anatomic_site_source_value`}
        label="anatomic_site_source_value"
      />
      <StringField
        fieldName={`disease_status_source_value`}
        label="disease_status_source_value"
      />
    </>
  )
}

export type UpdateSpecimensSpecimenIdFormProps = {
  specimen_id: number
  defaultValues: UpdateSpecimensSpecimenIdFormBody
  onSuccess: () => void
}

export type UpdateSpecimensSpecimenIdFormPathParams = { specimen_id: number }

export const UpdateSpecimensSpecimenIdForm = (
  props: UpdateSpecimensSpecimenIdFormProps,
) => {
  const form = useForm<UpdateSpecimensSpecimenIdFormBody>({
    resolver: zodResolver(clinicalSpecimenCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiSpecimensSpecimenId()

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
        <UpdateSpecimensSpecimenIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
