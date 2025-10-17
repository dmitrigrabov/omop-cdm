import { derivedConditionEraUpdate } from '@/types/derivedConditionEraUpdate.generated.ts'
import { IntegerField } from '@/components/fields/integer-field'
import { StringField } from '@/components/fields/string-field'
import { usePatchApiConditionErasConditionEraId } from '@/services/usePatchApiConditionErasConditionEraId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchConditionErasConditionEraIdFormBody = {
  person_id?: number | undefined
  condition_concept_id?: number | undefined
  condition_era_start_date?: string | undefined
  condition_era_end_date?: string | undefined
  condition_occurrence_count?: number | undefined
}

export const PatchConditionErasConditionEraIdFormFields = () => {
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

export type PatchConditionErasConditionEraIdFormProps = {
  condition_era_id: number
  defaultValues: PatchConditionErasConditionEraIdFormBody
  onSuccess: () => void
}

export type PatchConditionErasConditionEraIdFormPathParams = {
  condition_era_id: number
}

export const PatchConditionErasConditionEraIdForm = (
  props: PatchConditionErasConditionEraIdFormProps,
) => {
  const form = useForm<PatchConditionErasConditionEraIdFormBody>({
    resolver: zodResolver(derivedConditionEraUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiConditionErasConditionEraId()

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
        <PatchConditionErasConditionEraIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
