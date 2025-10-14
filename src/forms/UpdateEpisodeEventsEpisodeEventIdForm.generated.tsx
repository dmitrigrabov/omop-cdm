import { derivedEpisodeEventCreate } from '@/types/derivedEpisodeEventCreate.generated.ts'
import { useUpdateApiEpisodeEventsEpisodeEventId } from '@/services/useUpdateApiEpisodeEventsEpisodeEventId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateEpisodeEventsEpisodeEventIdFormBody = {
  episode_id: number
  event_id: number
  episode_event_field_concept_id: number
}

export type UpdateEpisodeEventsEpisodeEventIdFormProps = {
  episode_event_id: number
  defaultValues: UpdateEpisodeEventsEpisodeEventIdFormBody
  onSuccess: () => void
}

export type UpdateEpisodeEventsEpisodeEventIdFormPathParams = {
  episode_event_id: number
}

export const UpdateEpisodeEventsEpisodeEventIdForm = (
  props: UpdateEpisodeEventsEpisodeEventIdFormProps,
) => {
  const form = useForm<UpdateEpisodeEventsEpisodeEventIdFormBody>({
    resolver: zodResolver(derivedEpisodeEventCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiEpisodeEventsEpisodeEventId()

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
