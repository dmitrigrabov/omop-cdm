import { clinicalDeathUpdate } from '@/types/clinicalDeathUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiDeathsId } from '@/services/usePatchApiDeathsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchDeathsIdFormBody = {
  person_id?: number | undefined
  death_date?: string | undefined
  death_datetime?: string | undefined
  death_type_concept_id?: number | undefined
  cause_concept_id?: number | undefined
  cause_source_value?: string | undefined
  cause_source_concept_id?: number | undefined
}

export type PatchDeathsIdFormProps = {
  id: string
  defaultValues: Required<PatchDeathsIdFormBody>
  onSuccess: () => void
}

export type PatchDeathsIdFormPathParams = { id: string }

export const PatchDeathsIdForm = (props: PatchDeathsIdFormProps) => {
  const form = useForm<Required<PatchDeathsIdFormBody>>({
    resolver: zodResolver(clinicalDeathUpdate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiDeathsId()

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
        <IntegerField lens={lens.focus('person_id')} label="person_id" />
        <StringField lens={lens.focus('death_date')} label="death_date" />
        <StringField
          lens={lens.focus('death_datetime')}
          label="death_datetime"
        />
        <IntegerField
          lens={lens.focus('death_type_concept_id')}
          label="death_type_concept_id"
        />
        <IntegerField
          lens={lens.focus('cause_concept_id')}
          label="cause_concept_id"
        />
        <StringField
          lens={lens.focus('cause_source_value')}
          label="cause_source_value"
        />
        <IntegerField
          lens={lens.focus('cause_source_concept_id')}
          label="cause_source_concept_id"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
