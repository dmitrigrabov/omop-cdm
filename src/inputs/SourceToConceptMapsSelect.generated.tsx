import { useGetApiSourceToConceptMaps } from '@/services/useGetApiSourceToConceptMaps.generated.ts'
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

export type SourceToConceptMapsSelectProps = {
  onChange: (value: string) => void
  value: string
  placeholder: string
}

export const SourceToConceptMapsSelect = (
  props: SourceToConceptMapsSelectProps,
) => {
  const { data } = useGetApiSourceToConceptMaps({})

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

export type SourceToConceptMapsSelectFieldProps = {
  lens: Lens<string>
  label?: string
  placeholder?: string
}

export const SourceToConceptMapsSelectField = ({
  label,
  lens,
  placeholder,
}: SourceToConceptMapsSelectFieldProps) => {
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
            <SourceToConceptMapsSelect
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
