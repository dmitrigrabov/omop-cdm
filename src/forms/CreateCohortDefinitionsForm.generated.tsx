import { resultsCohortDefinitionCreate } from '@/types/resultsCohortDefinitionCreate.generated.ts'
import { useCreateApiCohortDefinitions } from '@/services/useCreateApiCohortDefinitions.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type CreateCohortDefinitionsFormBody = {
  cohort_definition_id: number
  cohort_definition_name: string
  cohort_definition_description?: string | undefined
  definition_type_concept_id: number
  cohort_definition_syntax?: string | undefined
  subject_concept_id: number
  cohort_initiation_date?: string | undefined
}

export type CreateCohortDefinitionsFormProps = {
  defaultValues: CreateCohortDefinitionsFormBody
  onSuccess: () => void
}

export type CreateCohortDefinitionsFormPathParams = Record<string, never>

export const CreateCohortDefinitionsForm = (
  props: CreateCohortDefinitionsFormProps,
) => {
  const form = useForm<CreateCohortDefinitionsFormBody>({
    resolver: zodResolver(resultsCohortDefinitionCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useCreateApiCohortDefinitions()

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
