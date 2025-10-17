import { vocabularyDomainUpdate } from '@/types/vocabularyDomainUpdate.generated.ts'
import { StringField } from '@/components/fields/string-field'
import { IntegerField } from '@/components/fields/integer-field'
import { usePatchApiDomainsDomainId } from '@/services/usePatchApiDomainsDomainId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchDomainsDomainIdFormBody = {
  domain_name?: string | undefined
  domain_concept_id?: number | undefined
}

export const PatchDomainsDomainIdFormFields = () => {
  return (
    <>
      <StringField fieldName={`domain_name`} label="domain_name" />
      <IntegerField fieldName={`domain_concept_id`} />
    </>
  )
}

export type PatchDomainsDomainIdFormProps = {
  domain_id: string
  defaultValues: PatchDomainsDomainIdFormBody
  onSuccess: () => void
}

export type PatchDomainsDomainIdFormPathParams = { domain_id: string }

export const PatchDomainsDomainIdForm = (
  props: PatchDomainsDomainIdFormProps,
) => {
  const form = useForm<PatchDomainsDomainIdFormBody>({
    resolver: zodResolver(vocabularyDomainUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiDomainsDomainId()

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
        <PatchDomainsDomainIdFormFields />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
