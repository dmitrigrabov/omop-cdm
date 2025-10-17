import { derivedConditionEraCreate } from '@/types/derivedConditionEraCreate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { useUpdateApiConditionErasId } from '@/services/useUpdateApiConditionErasId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateConditionErasIdFormBody = {
  person_id: number
  condition_concept_id: number
  condition_era_start_date: string
  condition_era_end_date: string
  condition_occurrence_count?: number | undefined
}

export type UpdateConditionErasIdFormProps = {
  id: string
  defaultValues: Required<UpdateConditionErasIdFormBody>
  onSuccess: () => void
}

export type UpdateConditionErasIdFormPathParams = { id: string }

export const UpdateConditionErasIdForm = (
  props: UpdateConditionErasIdFormProps,
) => {
  const form = useForm<Required<UpdateConditionErasIdFormBody>>({
    resolver: zodResolver(derivedConditionEraCreate.required()),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiConditionErasId()

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
        <IntegerField
          lens={lens.focus('condition_concept_id')}
          label="condition_concept_id"
        />
        <StringField
          lens={lens.focus('condition_era_start_date')}
          label="condition_era_start_date"
        />
        <StringField
          lens={lens.focus('condition_era_end_date')}
          label="condition_era_end_date"
        />
        <IntegerField
          lens={lens.focus('condition_occurrence_count')}
          label="condition_occurrence_count"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
