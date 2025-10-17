import { metadataCdmSourceCreate } from '@/types/metadataCdmSourceCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { useCreateApiCdmSources } from '@/services/useCreateApiCdmSources.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateCdmSourcesFormBody = {
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

export type CreateCdmSourcesFormProps = {
  defaultValues: Required<CreateCdmSourcesFormBody>
  onSuccess: () => void
}

export type CreateCdmSourcesFormPathParams = Record<string, never>

export const CreateCdmSourcesForm = (props: CreateCdmSourcesFormProps) => {
  const form = useForm<Required<CreateCdmSourcesFormBody>>({
    resolver: zodResolver(metadataCdmSourceCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiCdmSources()

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
        <StringField
          lens={lens.focus('cdm_source_name')}
          label="cdm_source_name"
        />
        <StringField
          lens={lens.focus('cdm_source_abbreviation')}
          label="cdm_source_abbreviation"
        />
        <StringField lens={lens.focus('cdm_holder')} label="cdm_holder" />
        <StringField
          lens={lens.focus('source_description')}
          label="source_description"
        />
        <StringField
          lens={lens.focus('source_documentation_reference')}
          label="source_documentation_reference"
        />
        <StringField
          lens={lens.focus('cdm_etl_reference')}
          label="cdm_etl_reference"
        />
        <StringField
          lens={lens.focus('source_release_date')}
          label="source_release_date"
        />
        <StringField
          lens={lens.focus('cdm_release_date')}
          label="cdm_release_date"
        />
        <StringField lens={lens.focus('cdm_version')} label="cdm_version" />
        <IntegerField
          lens={lens.focus('cdm_version_concept_id')}
          label="cdm_version_concept_id"
        />
        <StringField
          lens={lens.focus('vocabulary_version')}
          label="vocabulary_version"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
