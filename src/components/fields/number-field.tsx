import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Lens } from '@hookform/lenses'
import { NumberInput } from '@/components/ui/number-input'

type NumberFieldProps = {
  lens: Lens<number>
  label?: string
  placeholder?: string
}

export const NumberField = ({ label, lens, placeholder }: NumberFieldProps) => {
  const { control, name } = lens.interop()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field } }) => (
        <FormItem className="px-px">
          {typeof label === 'string' && (
            <FormLabel htmlFor={name} className="text-right">
              {label}
            </FormLabel>
          )}
          <FormControl>
            <NumberInput
              placeholder={placeholder}
              value={value}
              onValueChange={output => onChange(output)}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
