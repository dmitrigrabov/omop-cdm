import { derivedEpisodeEventUpdate } from '@/types/derivedEpisodeEventUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiEpisodeEventsId } from '@/services/usePatchApiEpisodeEventsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchEpisodeEventsIdFormBody = {
  episode_id?: number | undefined
  event_id?: number | undefined
  episode_event_field_concept_id?: number | undefined
}

export type PatchEpisodeEventsIdFormProps = {
  id: string
  defaultValues: Required<PatchEpisodeEventsIdFormBody>
  onSuccess: () => void
}

export type PatchEpisodeEventsIdFormPathParams = { id: string }

export const PatchEpisodeEventsIdForm = (
  props: PatchEpisodeEventsIdFormProps,
) => {
  const form = useForm<Required<PatchEpisodeEventsIdFormBody>>({
    resolver: zodResolver(derivedEpisodeEventUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiEpisodeEventsId()

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
        <IntegerField lens={lens.focus('episode_id')} label="episode_id" />
        <IntegerField lens={lens.focus('event_id')} label="event_id" />
        <IntegerField
          lens={lens.focus('episode_event_field_concept_id')}
          label="episode_event_field_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
