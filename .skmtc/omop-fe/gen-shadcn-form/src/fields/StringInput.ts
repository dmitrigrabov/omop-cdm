import { ContentBase } from '@skmtc/core'
import type { GenerateContext } from '@skmtc/core'

type StringInputArgs = {
  context: GenerateContext
  name: string
  label: string | undefined
  placeholder?: string
  skipLabel?: boolean
  destinationPath: string
}

export class StringInput extends ContentBase {
  name: string
  label: string | undefined
  placeholder?: string
  skipLabel?: boolean

  constructor({ context, name, label, placeholder, destinationPath, skipLabel }: StringInputArgs) {
    super({ context })

    this.name = name
    this.label = label ?? name
    this.placeholder = placeholder
    this.skipLabel = skipLabel
    this.register({
      imports: { '@/components/fields/string-field': ['StringField'] },
      destinationPath
    })
  }

  override toString() {
    return `<StringField fieldName={\`${this.name}\`} ${this.label && !this.skipLabel ? `label="${this.label}"` : ''} />`
  }
}
