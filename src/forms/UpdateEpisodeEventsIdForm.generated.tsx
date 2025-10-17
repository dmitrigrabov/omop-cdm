import { derivedEpisodeEventCreate } from '@/types/derivedEpisodeEventCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { useUpdateApiEpisodeEventsId } from '@/services/useUpdateApiEpisodeEventsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateEpisodeEventsIdFormBody = {
  episode_id: number
  event_id: number
  episode_event_field_concept_id: number
}

export const UpdateEpisodeEventsIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`episode_id`} />
      <IntegerField fieldName={`event_id`} />
      <IntegerField fieldName={`episode_event_field_concept_id`} />
    </>
  )
}

export type UpdateEpisodeEventsIdFormProps = {
  id: number
  defaultValues: UpdateEpisodeEventsIdFormBody
  onSuccess: () => void
}

export type UpdateEpisodeEventsIdFormPathParams = { id: number }

export const UpdateEpisodeEventsIdForm = (
  props: UpdateEpisodeEventsIdFormProps,
) => {
  const form = useForm<UpdateEpisodeEventsIdFormBody>({
    resolver: zodResolver(derivedEpisodeEventCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiEpisodeEventsId()

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
        <UpdateEpisodeEventsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
