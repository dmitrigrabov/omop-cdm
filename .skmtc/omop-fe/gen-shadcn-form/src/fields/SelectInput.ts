import { List, ContentBase } from '@skmtc/core'
import type { GenerateContext, ListLines, Stringable } from '@skmtc/core'

type SelectInputArgs = {
  context: GenerateContext
  name: string
  label: string | undefined
  placeholder?: string
  skipLabel?: boolean
  destinationPath: string
  enums: string[]
}

export class SelectInput extends ContentBase {
  name: string
  label: string | undefined
  placeholder?: string
  skipLabel?: boolean
  options: ListLines<Stringable>
  constructor({
    context,
    name,
    label,
    placeholder,
    destinationPath,
    skipLabel,
    enums
  }: SelectInputArgs) {
    super({ context })

    this.name = name
    this.label = label ?? name
    this.placeholder = placeholder
    this.skipLabel = skipLabel
    this.options = List.toLines(
      enums.map(enumValue => {
        return `<SelectItem value="${enumValue}">${enumValue}</SelectItem>`
      })
    )

    this.register({
      imports: {
        '@/components/fields/select-field': ['SelectField'],
        '@/components/ui/select': ['SelectItem']
      },
      destinationPath
    })
  }

  override toString() {
    return `<SelectField fieldName={\`${this.name}\`} ${this.label && !this.skipLabel ? `label="${this.label}"` : ''}>
    ${this.options}
    </SelectField>`
  }
}
