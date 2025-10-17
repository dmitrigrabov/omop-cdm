import { vocabularyDomainCreate } from '@/types/vocabularyDomainCreate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { useUpdateApiDomainsId } from '@/services/useUpdateApiDomainsId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateDomainsIdFormBody = {
  domain_name: string
  domain_concept_id: number
}

export const UpdateDomainsIdFormFields = () => {
  return (
    <>
      <StringField fieldName={`domain_name`} label="domain_name" />
      <IntegerField fieldName={`domain_concept_id`} />
    </>
  )
}

export type UpdateDomainsIdFormProps = {
  id: string
  defaultValues: UpdateDomainsIdFormBody
  onSuccess: () => void
}

export type UpdateDomainsIdFormPathParams = { id: string }

export const UpdateDomainsIdForm = (props: UpdateDomainsIdFormProps) => {
  const form = useForm<UpdateDomainsIdFormBody>({
    resolver: zodResolver(vocabularyDomainCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiDomainsId()

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
        <UpdateDomainsIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
