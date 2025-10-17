import { derivedConditionEraUpdate } from '@/types/derivedConditionEraUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiConditionErasId } from '@/services/usePatchApiConditionErasId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchConditionErasIdFormBody = {
  person_id?: number | undefined
  condition_concept_id?: number | undefined
  condition_era_start_date?: string | undefined
  condition_era_end_date?: string | undefined
  condition_occurrence_count?: number | undefined
}

export const PatchConditionErasIdFormFields = () => {
  return (
    <>
      <IntegerField fieldName={`person_id`} />
      <IntegerField fieldName={`condition_concept_id`} />
      <StringField
        fieldName={`condition_era_start_date`}
        label="condition_era_start_date"
      />
      <StringField
        fieldName={`condition_era_end_date`}
        label="condition_era_end_date"
      />
      <IntegerField fieldName={`condition_occurrence_count`} />
    </>
  )
}

export type PatchConditionErasIdFormProps = {
  id: number
  defaultValues: PatchConditionErasIdFormBody
  onSuccess: () => void
}

export type PatchConditionErasIdFormPathParams = { id: number }

export const PatchConditionErasIdForm = (
  props: PatchConditionErasIdFormProps,
) => {
  const form = useForm<PatchConditionErasIdFormBody>({
    resolver: zodResolver(derivedConditionEraUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiConditionErasId()

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
        <PatchConditionErasIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
