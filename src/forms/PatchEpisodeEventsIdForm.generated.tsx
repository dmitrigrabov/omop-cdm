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

export const PatchEpisodeEventsIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`episode_id`} />
      <IntegerField fieldName={`event_id`} />
      <IntegerField fieldName={`episode_event_field_concept_id`} />
    </>
  )
}

export type PatchEpisodeEventsIdFormProps = {
  id: number
  defaultValues: PatchEpisodeEventsIdFormBody
  onSuccess: () => void
}

export type PatchEpisodeEventsIdFormPathParams = { id: number }

export const PatchEpisodeEventsIdForm = (
  props: PatchEpisodeEventsIdFormProps,
) => {
  const form = useForm<PatchEpisodeEventsIdFormBody>({
    resolver: zodResolver(derivedEpisodeEventUpdate),
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
        <PatchEpisodeEventsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
