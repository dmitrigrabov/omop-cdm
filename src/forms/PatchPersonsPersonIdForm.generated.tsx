import { clinicalPersonUpdate } from '@/types/clinicalPersonUpdate.generated.ts'
import { usePatchApiPersonsPersonId } from '@/services/usePatchApiPersonsPersonId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchPersonsPersonIdFormBody = {
  gender_concept_id?: number | undefined
  year_of_birth?: number | undefined
  month_of_birth?: number | undefined
  day_of_birth?: number | undefined
  birth_datetime?: string | undefined
  race_concept_id?: number | undefined
  ethnicity_concept_id?: number | undefined
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

export type PatchPersonsPersonIdFormProps = {
  person_id: number
  defaultValues: PatchPersonsPersonIdFormBody
  onSuccess: () => void
}

export type PatchPersonsPersonIdFormPathParams = { person_id: number }

export const PatchPersonsPersonIdForm = (
  props: PatchPersonsPersonIdFormProps,
) => {
  const form = useForm<PatchPersonsPersonIdFormBody>({
    resolver: zodResolver(clinicalPersonUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiPersonsPersonId()

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
