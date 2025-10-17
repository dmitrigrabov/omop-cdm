import { useGetApiCohortDefinitions } from '@/services/useGetApiCohortDefinitions.generated.ts'
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Lens } from '@hookform/lenses'

export type CohortDefinitionsSelectProps = {
  onChange: (value: string) => void
  value: string
  placeholder: string | undefined
}

export const CohortDefinitionsSelect = (
  props: CohortDefinitionsSelectProps,
) => {
  const { data } = useGetApiCohortDefinitions({})

  return (
    <Select onValueChange={props.onChange} defaultValue={props.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data?.data?.map((item) => (
          <SelectItem key={item.id} value={`${item.id}`}>
            {item.id}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export type CohortDefinitionsSelectFieldProps = {
  lens: Lens<string>
  label?: string
  placeholder?: string
}

export const CohortDefinitionsSelectField = ({
  label,
  lens,
  placeholder,
}: CohortDefinitionsSelectFieldProps) => {
  if (!lens) {
    return null
  }

  const { control, name } = lens.interop()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormItem className="flex flex-col gap-2 px-px">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <CohortDefinitionsSelect
              onChange={onChange}
              value={value}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
