import { derivedEpisodeUpdate } from '@/types/derivedEpisodeUpdate.generated.ts'
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
