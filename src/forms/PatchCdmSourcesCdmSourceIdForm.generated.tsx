import { metadataCdmSourceUpdate } from '@/types/metadataCdmSourceUpdate.generated.ts'
import { usePatchApiCdmSourcesCdmSourceId } from '@/services/usePatchApiCdmSourcesCdmSourceId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchCdmSourcesCdmSourceIdFormBody = {
  cdm_source_name?: string | undefined
  cdm_source_abbreviation?: string | undefined
  cdm_holder?: string | undefined
  source_description?: string | undefined
  source_documentation_reference?: string | undefined
  cdm_etl_reference?: string | undefined
  source_release_date?: string | undefined
  cdm_release_date?: string | undefined
  cdm_version?: string | undefined
  cdm_version_concept_id?: number | undefined
  vocabulary_version?: string | undefined
}

export type PatchCdmSourcesCdmSourceIdFormProps = {
  cdm_source_id: number
  defaultValues: PatchCdmSourcesCdmSourceIdFormBody
  onSuccess: () => void
}

export type PatchCdmSourcesCdmSourceIdFormPathParams = { cdm_source_id: number }

export const PatchCdmSourcesCdmSourceIdForm = (
  props: PatchCdmSourcesCdmSourceIdFormProps,
) => {
  const form = useForm<PatchCdmSourcesCdmSourceIdFormBody>({
    resolver: zodResolver(metadataCdmSourceUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiCdmSourcesCdmSourceId()

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
