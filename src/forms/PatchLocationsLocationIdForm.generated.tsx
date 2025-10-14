import { healthsystemLocationUpdate } from '@/types/healthsystemLocationUpdate.generated.ts'
import { usePatchApiLocationsLocationId } from '@/services/usePatchApiLocationsLocationId.generated.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useLens } from '@hookform/lenses'
import { useEffect } from 'react'

export type PatchLocationsLocationIdFormBody = {
  city?: string | undefined
  state?: string | undefined
  zip?: string | undefined
  county?: string | undefined
  location_source_value?: string | undefined
  country_concept_id?: number | undefined
  country_source_value?: string | undefined
  latitude?: number | undefined
  longitude?: number | undefined
}

export type PatchLocationsLocationIdFormProps = {
  location_id: number
  defaultValues: PatchLocationsLocationIdFormBody
  onSuccess: () => void
}

export type PatchLocationsLocationIdFormPathParams = { location_id: number }

export const PatchLocationsLocationIdForm = (
  props: PatchLocationsLocationIdFormProps,
) => {
  const form = useForm<PatchLocationsLocationIdFormBody>({
    resolver: zodResolver(healthsystemLocationUpdate),
    defaultValues: props.defaultValues,
  })

  const lens = useLens(form)

  const mutator = usePatchApiLocationsLocationId()

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
