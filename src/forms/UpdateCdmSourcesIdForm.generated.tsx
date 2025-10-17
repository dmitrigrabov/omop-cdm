import { metadataCdmSourceCreate } from '@/types/metadataCdmSourceCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { useUpdateApiCdmSourcesId } from '@/services/useUpdateApiCdmSourcesId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateCdmSourcesIdFormBody = {
  cdm_source_name: string
  cdm_source_abbreviation: string
  cdm_holder: string
  source_description?: string | undefined
  source_documentation_reference?: string | undefined
  cdm_etl_reference?: string | undefined
  source_release_date: string
  cdm_release_date: string
  cdm_version?: string | undefined
  cdm_version_concept_id: number
  vocabulary_version: string
}

export const UpdateCdmSourcesIdFormFields = () => {
  return (
    <>
      <StringField fieldName={`cdm_source_name`} label="cdm_source_name" />
      <StringField
        fieldName={`cdm_source_abbreviation`}
        label="cdm_source_abbreviation"
      />
      <StringField fieldName={`cdm_holder`} label="cdm_holder" />
      <StringField
        fieldName={`source_description`}
        label="source_description"
      />
      <StringField
        fieldName={`source_documentation_reference`}
        label="source_documentation_reference"
      />
      <StringField fieldName={`cdm_etl_reference`} label="cdm_etl_reference" />
      <StringField
        fieldName={`source_release_date`}
        label="source_release_date"
      />
      <StringField fieldName={`cdm_release_date`} label="cdm_release_date" />
      <StringField fieldName={`cdm_version`} label="cdm_version" />
      <IntegerField fieldName={`cdm_version_concept_id`} />
      <StringField
        fieldName={`vocabulary_version`}
        label="vocabulary_version"
      />
    </>
  )
}

export type UpdateCdmSourcesIdFormProps = {
  id: number
  defaultValues: UpdateCdmSourcesIdFormBody
  onSuccess: () => void
}

export type UpdateCdmSourcesIdFormPathParams = { id: number }

export const UpdateCdmSourcesIdForm = (props: UpdateCdmSourcesIdFormProps) => {
  const form = useForm<UpdateCdmSourcesIdFormBody>({
    resolver: zodResolver(metadataCdmSourceCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiCdmSourcesId()

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
        <UpdateCdmSourcesIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
