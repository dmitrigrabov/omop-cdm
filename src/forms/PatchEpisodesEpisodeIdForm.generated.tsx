import { derivedEpisodeUpdate } from '@/types/derivedEpisodeUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiEpisodesEpisodeId } from '@/services/usePatchApiEpisodesEpisodeId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchEpisodesEpisodeIdFormBody = {
  person_id?: number | undefined
  episode_concept_id?: number | undefined
  episode_start_date?: string | undefined
  episode_start_datetime?: string | undefined
  episode_end_date?: string | undefined
  episode_end_datetime?: string | undefined
  episode_parent_id?: number | undefined
  episode_number?: number | undefined
  episode_object_concept_id?: number | undefined
  episode_type_concept_id?: number | undefined
  episode_source_value?: string | undefined
  episode_source_concept_id?: number | undefined
}

export const PatchEpisodesEpisodeIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`episode_concept_id`} />
      <StringField
        fieldName={`episode_start_date`}
        label="episode_start_date"
      />
      <StringField
        fieldName={`episode_start_datetime`}
        label="episode_start_datetime"
      />
      <StringField fieldName={`episode_end_date`} label="episode_end_date" />
      <StringField
        fieldName={`episode_end_datetime`}
        label="episode_end_datetime"
      />
      <IntegerField fieldName={`episode_parent_id`} />
      <IntegerField fieldName={`episode_number`} />
      <IntegerField fieldName={`episode_object_concept_id`} />
      <IntegerField fieldName={`episode_type_concept_id`} />
      <StringField
        fieldName={`episode_source_value`}
        label="episode_source_value"
      />
      <IntegerField fieldName={`episode_source_concept_id`} />
    </>
  )
}

export type PatchEpisodesEpisodeIdFormProps = {
  episode_id: number
  defaultValues: PatchEpisodesEpisodeIdFormBody
  onSuccess: () => void
}

export type PatchEpisodesEpisodeIdFormPathParams = { episode_id: number }

export const PatchEpisodesEpisodeIdForm = (
  props: PatchEpisodesEpisodeIdFormProps,
) => {
  const form = useForm<PatchEpisodesEpisodeIdFormBody>({
    resolver: zodResolver(derivedEpisodeUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiEpisodesEpisodeId()

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
        <PatchEpisodesEpisodeIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
