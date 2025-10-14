import { clinicalDeathCreate } from '@/types/clinicalDeathCreate.generated.ts'
import { useCreateApiDeaths } from '@/services/useCreateApiDeaths.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateDeathsFormBody = {
  person_id: number
  death_date: string
  death_datetime?: string | undefined
  death_type_concept_id?: number | undefined
  cause_concept_id?: number | undefined
  cause_source_value?: string | undefined
  cause_source_concept_id?: number | undefined
}

export type CreateDeathsFormProps = {
  defaultValues: CreateDeathsFormBody
  onSuccess: () => void
}

export type CreateDeathsFormPathParams = Record<string, never>

export const CreateDeathsForm = (props: CreateDeathsFormProps) => {
  const form = useForm<CreateDeathsFormBody>({
    resolver: zodResolver(clinicalDeathCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiDeaths()

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
