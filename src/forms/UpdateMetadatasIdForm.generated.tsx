import { metadataMetadataCreate } from '@/types/metadataMetadataCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { NumberField } from '@/components/fields/number-field'
import { useUpdateApiMetadatasId } from '@/services/useUpdateApiMetadatasId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateMetadatasIdFormBody = {
  metadata_concept_id: number
  metadata_type_concept_id: number
  name: string
  value_as_string?: string | undefined
  value_as_concept_id?: number | undefined
  value_as_number?: number | undefined
  metadata_date?: string | undefined
  metadata_datetime?: string | undefined
}

export type UpdateMetadatasIdFormProps = {
  id: string
  defaultValues: Required<UpdateMetadatasIdFormBody>
  onSuccess: () => void
}

export type UpdateMetadatasIdFormPathParams = { id: string }

export const UpdateMetadatasIdForm = (props: UpdateMetadatasIdFormProps) => {
  const form = useForm<Required<UpdateMetadatasIdFormBody>>({
    resolver: zodResolver(metadataMetadataCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiMetadatasId()

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
          lens={lens.focus('metadata_concept_id')}
          label="metadata_concept_id"
        />
        <IntegerField
          lens={lens.focus('metadata_type_concept_id')}
          label="metadata_type_concept_id"
        />
        <StringField lens={lens.focus('name')} label="name" />
        <StringField
          lens={lens.focus('value_as_string')}
          label="value_as_string"
        />
        <IntegerField
          lens={lens.focus('value_as_concept_id')}
          label="value_as_concept_id"
        />
        <NumberField lens={lens.focus('value_as_number')} />
        <StringField lens={lens.focus('metadata_date')} label="metadata_date" />
        <StringField
          lens={lens.focus('metadata_datetime')}
          label="metadata_datetime"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
