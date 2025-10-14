import { derivedEpisodeCreate } from '@/types/derivedEpisodeCreate.generated.ts'
import { useCreateApiEpisodes } from '@/services/useCreateApiEpisodes.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateEpisodesFormBody = {
  person_id: number
  episode_concept_id: number
  episode_start_date: string
  episode_start_datetime?: string | undefined
  episode_end_date?: string | undefined
  episode_end_datetime?: string | undefined
  episode_parent_id?: number | undefined
  episode_number?: number | undefined
  episode_object_concept_id: number
  episode_type_concept_id: number
  episode_source_value?: string | undefined
  episode_source_concept_id?: number | undefined
}

export type CreateEpisodesFormProps = {
  defaultValues: CreateEpisodesFormBody
  onSuccess: () => void
}

export type CreateEpisodesFormPathParams = Record<string, never>

export const CreateEpisodesForm = (props: CreateEpisodesFormProps) => {
  const form = useForm<CreateEpisodesFormBody>({
    resolver: zodResolver(derivedEpisodeCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiEpisodes()

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
