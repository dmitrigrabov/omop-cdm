import { derivedEpisodeEventCreate } from '@/types/derivedEpisodeEventCreate.generated.ts'
import { useCreateApiEpisodeEvents } from '@/services/useCreateApiEpisodeEvents.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateEpisodeEventsFormBody = {
  episode_id: number
  event_id: number
  episode_event_field_concept_id: number
}

export type CreateEpisodeEventsFormProps = {
  defaultValues: CreateEpisodeEventsFormBody
  onSuccess: () => void
}

export type CreateEpisodeEventsFormPathParams = Record<string, never>

export const CreateEpisodeEventsForm = (
  props: CreateEpisodeEventsFormProps,
) => {
  const form = useForm<CreateEpisodeEventsFormBody>({
    resolver: zodResolver(derivedEpisodeEventCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiEpisodeEvents()

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
