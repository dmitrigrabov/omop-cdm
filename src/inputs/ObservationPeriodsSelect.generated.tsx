import { useGetApiObservationPeriods } from '@/services/useGetApiObservationPeriods.generated.ts'
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

export type ObservationPeriodsSelectProps = {
  onChange: (value: string) => void
  value: string
  placeholder: string | undefined
}

export const ObservationPeriodsSelect = (
  props: ObservationPeriodsSelectProps,
) => {
  const { data } = useGetApiObservationPeriods({})

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

export type ObservationPeriodsSelectFieldProps = {
  lens: Lens<string>
  label?: string
  placeholder?: string
}

export const ObservationPeriodsSelectField = ({
  label,
  lens,
  placeholder,
}: ObservationPeriodsSelectFieldProps) => {
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
            <ObservationPeriodsSelect
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
