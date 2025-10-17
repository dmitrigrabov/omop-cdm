import { clinicalPersonCreate } from '@/types/clinicalPersonCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiPersonsId } from '@/services/useUpdateApiPersonsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdatePersonsIdFormBody = {
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

export type UpdatePersonsIdFormProps = {
  id: string
  defaultValues: Required<UpdatePersonsIdFormBody>
  onSuccess: () => void
}

export type UpdatePersonsIdFormPathParams = { id: string }

export const UpdatePersonsIdForm = (props: UpdatePersonsIdFormProps) => {
  const form = useForm<Required<UpdatePersonsIdFormBody>>({
    resolver: zodResolver(clinicalPersonCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiPersonsId()

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
          lens={lens.focus('gender_concept_id')}
          label="gender_concept_id"
        />
        <IntegerField
          lens={lens.focus('year_of_birth')}
          label="year_of_birth"
        />
        <IntegerField
          lens={lens.focus('month_of_birth')}
          label="month_of_birth"
        />
        <IntegerField lens={lens.focus('day_of_birth')} label="day_of_birth" />
        <StringField
          lens={lens.focus('birth_datetime')}
          label="birth_datetime"
        />
        <IntegerField
          lens={lens.focus('race_concept_id')}
          label="race_concept_id"
        />
        <IntegerField
          lens={lens.focus('ethnicity_concept_id')}
          label="ethnicity_concept_id"
        />
        <IntegerField lens={lens.focus('location_id')} label="location_id" />
        <IntegerField lens={lens.focus('provider_id')} label="provider_id" />
        <IntegerField lens={lens.focus('care_site_id')} label="care_site_id" />
        <StringField
          lens={lens.focus('person_source_value')}
          label="person_source_value"
        />
        <StringField
          lens={lens.focus('gender_source_value')}
          label="gender_source_value"
        />
        <IntegerField
          lens={lens.focus('gender_source_concept_id')}
          label="gender_source_concept_id"
        />
        <StringField
          lens={lens.focus('race_source_value')}
          label="race_source_value"
        />
        <IntegerField
          lens={lens.focus('race_source_concept_id')}
          label="race_source_concept_id"
        />
        <StringField
          lens={lens.focus('ethnicity_source_value')}
          label="ethnicity_source_value"
        />
        <IntegerField
          lens={lens.focus('ethnicity_source_concept_id')}
          label="ethnicity_source_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
