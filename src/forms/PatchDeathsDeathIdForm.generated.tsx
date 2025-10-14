import { clinicalDeathUpdate } from '@/types/clinicalDeathUpdate.generated.ts'
import { usePatchApiDeathsDeathId } from '@/services/usePatchApiDeathsDeathId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchDeathsDeathIdFormBody = {
  person_id?: number | undefined
  death_date?: string | undefined
  death_datetime?: string | undefined
  death_type_concept_id?: number | undefined
  cause_concept_id?: number | undefined
  cause_source_value?: string | undefined
  cause_source_concept_id?: number | undefined
}

export type PatchDeathsDeathIdFormProps = {
  death_id: number
  defaultValues: PatchDeathsDeathIdFormBody
  onSuccess: () => void
}

export type PatchDeathsDeathIdFormPathParams = { death_id: number }

export const PatchDeathsDeathIdForm = (props: PatchDeathsDeathIdFormProps) => {
  const form = useForm<PatchDeathsDeathIdFormBody>({
    resolver: zodResolver(clinicalDeathUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiDeathsDeathId()

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
