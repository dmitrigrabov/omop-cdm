import { clinicalPersonCreate } from '@/types/clinicalPersonCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiPersonsPersonId } from '@/services/useUpdateApiPersonsPersonId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdatePersonsPersonIdFormBody = {
  gender_concept_id: number
  year_of_birth: number
  month_of_birth?: number | undefined
  day_of_birth?: number | undefined
  birth_datetime?: string | undefined
  race_concept_id: number
  ethnicity_concept_id: number
  location_id?: number | undefined
  provider_id?: number | undefined
  care_site_id?: number | undefined
  person_source_value?: string | undefined
  gender_source_value?: string | undefined
  gender_source_concept_id?: number | undefined
  race_source_value?: string | undefined
  race_source_concept_id?: number | undefined
  ethnicity_source_value?: string | undefined
  ethnicity_source_concept_id?: number | undefined
}

export const UpdatePersonsPersonIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`gender_concept_id`} />
      <IntegerField fieldName={`year_of_birth`} />
      <IntegerField fieldName={`month_of_birth`} />
      <IntegerField fieldName={`day_of_birth`} />
      <StringField fieldName={`birth_datetime`} label="birth_datetime" />
      <IntegerField fieldName={`race_concept_id`} />
      <IntegerField fieldName={`ethnicity_concept_id`} />
      <IntegerField fieldName={`location_id`} />
      <IntegerField fieldName={`provider_id`} />
      <IntegerField fieldName={`care_site_id`} />
      <StringField
        fieldName={`person_source_value`}
        label="person_source_value"
      />
      <StringField
        fieldName={`gender_source_value`}
        label="gender_source_value"
      />
      <IntegerField fieldName={`gender_source_concept_id`} />
      <StringField fieldName={`race_source_value`} label="race_source_value" />
      <IntegerField fieldName={`race_source_concept_id`} />
      <StringField
        fieldName={`ethnicity_source_value`}
        label="ethnicity_source_value"
      />
      <IntegerField fieldName={`ethnicity_source_concept_id`} />
    </>
  )
}

export type UpdatePersonsPersonIdFormProps = {
  person_id: number
  defaultValues: UpdatePersonsPersonIdFormBody
  onSuccess: () => void
}

export type UpdatePersonsPersonIdFormPathParams = { person_id: number }

export const UpdatePersonsPersonIdForm = (
  props: UpdatePersonsPersonIdFormProps,
) => {
  const form = useForm<UpdatePersonsPersonIdFormBody>({
    resolver: zodResolver(clinicalPersonCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiPersonsPersonId()

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
        <UpdatePersonsPersonIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
