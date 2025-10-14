import { derivedEpisodeEventUpdate } from '@/types/derivedEpisodeEventUpdate.generated.ts'
import { usePatchApiEpisodeEventsEpisodeEventId } from '@/services/usePatchApiEpisodeEventsEpisodeEventId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchEpisodeEventsEpisodeEventIdFormBody = {
  episode_id?: number | undefined
  event_id?: number | undefined
  episode_event_field_concept_id?: number | undefined
}

export type PatchEpisodeEventsEpisodeEventIdFormProps = {
  episode_event_id: number
  defaultValues: PatchEpisodeEventsEpisodeEventIdFormBody
  onSuccess: () => void
}

export type PatchEpisodeEventsEpisodeEventIdFormPathParams = {
  episode_event_id: number
}

export const PatchEpisodeEventsEpisodeEventIdForm = (
  props: PatchEpisodeEventsEpisodeEventIdFormProps,
) => {
  const form = useForm<PatchEpisodeEventsEpisodeEventIdFormBody>({
    resolver: zodResolver(derivedEpisodeEventUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiEpisodeEventsEpisodeEventId()

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
