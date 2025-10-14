import { useGetApiEpisodeEvents } from '@/services/useGetApiEpisodeEvents.generated.ts'
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

export type EpisodeEventsSelectProps = {
  onChange: (value: string) => void
  value: string
  placeholder: string
}

export const EpisodeEventsSelect = (props: EpisodeEventsSelectProps) => {
  const { data } = useGetApiEpisodeEvents({})

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

export type EpisodeEventsSelectFieldProps = {
  lens: Lens<string>
  label?: string
  placeholder?: string
}

export const EpisodeEventsSelectField = ({
  label,
  lens,
  placeholder,
}: EpisodeEventsSelectFieldProps) => {
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
            <EpisodeEventsSelect
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
