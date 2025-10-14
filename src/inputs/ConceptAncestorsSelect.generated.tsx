import { useGetApiConceptAncestors } from '@/services/useGetApiConceptAncestors.generated.ts'
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

export type ConceptAncestorsSelectProps = {
  onChange: (value: string) => void
  value: string
  placeholder: string
}

export const ConceptAncestorsSelect = (props: ConceptAncestorsSelectProps) => {
  const { data } = useGetApiConceptAncestors({})

  return (
    <Select onValueChange={props.onChange} defaultValue={props.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data?.data?.map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.id}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export type ConceptAncestorsSelectFieldProps = {
  lens: Lens<string>
  label?: string
  placeholder?: string
}

export const ConceptAncestorsSelectField = ({
  label,
  lens,
  placeholder,
}: ConceptAncestorsSelectFieldProps) => {
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
            <ConceptAncestorsSelect
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
