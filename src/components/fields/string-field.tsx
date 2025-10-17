import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Lens } from '@hookform/lenses'

type StringFieldProps = {
  lens: Lens<string>
  label?: string
  placeholder?: string
}

export const StringField = ({ label, lens, placeholder }: StringFieldProps) => {
  const { control, name } = lens.interop()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="px-px">
          {typeof label === 'string' && (
            <FormLabel htmlFor={name} className="text-right">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <Input type="text" placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
