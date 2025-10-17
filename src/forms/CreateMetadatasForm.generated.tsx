import { metadataMetadataCreate } from '@/types/metadataMetadataCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { NumberField } from '@/components/fields/number-field'
import { useCreateApiMetadatas } from '@/services/useCreateApiMetadatas.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateMetadatasFormBody = {
  metadata_concept_id: number
  metadata_type_concept_id: number
  name: string
  value_as_string?: string | undefined
  value_as_concept_id?: number | undefined
  value_as_number?: number | undefined
  metadata_date?: string | undefined
  metadata_datetime?: string | undefined
}

export const CreateMetadatasFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`metadata_concept_id`} />
      <IntegerField fieldName={`metadata_type_concept_id`} />
      <StringField fieldName={`name`} label="name" />
      <StringField fieldName={`value_as_string`} label="value_as_string" />
      <IntegerField fieldName={`value_as_concept_id`} />
      <NumberField fieldName={`value_as_number`} />
      <StringField fieldName={`metadata_date`} label="metadata_date" />
      <StringField fieldName={`metadata_datetime`} label="metadata_datetime" />
    </>
  )
}

export type CreateMetadatasFormProps = {
  defaultValues: CreateMetadatasFormBody
  onSuccess: () => void
}

export type CreateMetadatasFormPathParams = Record<string, never>

export const CreateMetadatasForm = (props: CreateMetadatasFormProps) => {
  const form = useForm<CreateMetadatasFormBody>({
    resolver: zodResolver(metadataMetadataCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiMetadatas()

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
        <CreateMetadatasFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
