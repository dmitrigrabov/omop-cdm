import { useGetApiConceptSynonyms } from '@/services/useGetApiConceptSynonyms.generated.ts'
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

export type ConceptSynonymsSelectProps = {
  onChange: (value: string) => void
  value: string
  placeholder: string | undefined
}

export const ConceptSynonymsSelect = (props: ConceptSynonymsSelectProps) => {
  const { data } = useGetApiConceptSynonyms({})

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

export type ConceptSynonymsSelectFieldProps = {
  lens: Lens<string>
  label?: string
  placeholder?: string
}

export const ConceptSynonymsSelectField = ({
  label,
  lens,
  placeholder,
}: ConceptSynonymsSelectFieldProps) => {
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
            <ConceptSynonymsSelect
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
