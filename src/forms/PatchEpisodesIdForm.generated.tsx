import { derivedEpisodeUpdate } from '@/types/derivedEpisodeUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiEpisodesId } from '@/services/usePatchApiEpisodesId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchEpisodesIdFormBody = {
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

export type PatchEpisodesIdFormProps = {
  id: string
  defaultValues: Required<PatchEpisodesIdFormBody>
  onSuccess: () => void
}

export type PatchEpisodesIdFormPathParams = { id: string }

export const PatchEpisodesIdForm = (props: PatchEpisodesIdFormProps) => {
  const form = useForm<Required<PatchEpisodesIdFormBody>>({
    resolver: zodResolver(derivedEpisodeUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiEpisodesId()

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
        <IntegerField lens={lens.focus('person_id')} label="person_id" />
        <IntegerField
          lens={lens.focus('episode_concept_id')}
          label="episode_concept_id"
        />
        <StringField
          lens={lens.focus('episode_start_date')}
          label="episode_start_date"
        />
        <StringField
          lens={lens.focus('episode_start_datetime')}
          label="episode_start_datetime"
        />
        <StringField
          lens={lens.focus('episode_end_date')}
          label="episode_end_date"
        />
        <StringField
          lens={lens.focus('episode_end_datetime')}
          label="episode_end_datetime"
        />
        <IntegerField
          lens={lens.focus('episode_parent_id')}
          label="episode_parent_id"
        />
        <IntegerField
          lens={lens.focus('episode_number')}
          label="episode_number"
        />
        <IntegerField
          lens={lens.focus('episode_object_concept_id')}
          label="episode_object_concept_id"
        />
        <IntegerField
          lens={lens.focus('episode_type_concept_id')}
          label="episode_type_concept_id"
        />
        <StringField
          lens={lens.focus('episode_source_value')}
          label="episode_source_value"
        />
        <IntegerField
          lens={lens.focus('episode_source_concept_id')}
          label="episode_source_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
