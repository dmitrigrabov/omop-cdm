import { clinicalDeathCreate } from '@/types/clinicalDeathCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiDeathsId } from '@/services/useUpdateApiDeathsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateDeathsIdFormBody = {
  person_id: number
  death_date: string
  death_datetime?: string | undefined
  death_type_concept_id?: number | undefined
  cause_concept_id?: number | undefined
  cause_source_value?: string | undefined
  cause_source_concept_id?: number | undefined
}

export const UpdateDeathsIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <StringField fieldName={`death_date`} label="death_date" />
      <StringField fieldName={`death_datetime`} label="death_datetime" />
      <IntegerField fieldName={`death_type_concept_id`} />
      <IntegerField fieldName={`cause_concept_id`} />
      <StringField
        fieldName={`cause_source_value`}
        label="cause_source_value"
      />
      <IntegerField fieldName={`cause_source_concept_id`} />
    </>
  )
}

export type UpdateDeathsIdFormProps = {
  id: number
  defaultValues: UpdateDeathsIdFormBody
  onSuccess: () => void
}

export type UpdateDeathsIdFormPathParams = { id: number }

export const UpdateDeathsIdForm = (props: UpdateDeathsIdFormProps) => {
  const form = useForm<UpdateDeathsIdFormBody>({
    resolver: zodResolver(clinicalDeathCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiDeathsId()

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
        <UpdateDeathsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
