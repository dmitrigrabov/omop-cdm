import { vocabularyDomainCreate } from '@/types/vocabularyDomainCreate.generated.ts'
import { useUpdateApiDomainsDomainId } from '@/services/useUpdateApiDomainsDomainId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type UpdateDomainsDomainIdFormBody = {
  domain_name: string
  domain_concept_id: number
}

export type UpdateDomainsDomainIdFormProps = {
  domain_id: string
  defaultValues: UpdateDomainsDomainIdFormBody
  onSuccess: () => void
}

export type UpdateDomainsDomainIdFormPathParams = { domain_id: string }

export const UpdateDomainsDomainIdForm = (
  props: UpdateDomainsDomainIdFormProps,
) => {
  const form = useForm<UpdateDomainsDomainIdFormBody>({
    resolver: zodResolver(vocabularyDomainCreate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = useUpdateApiDomainsDomainId()

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
