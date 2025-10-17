import { ContentBase } from '@skmtc/core'
import type { GenerateContext, OasOperation } from '@skmtc/core'
import { ShadcnSelectInput } from '@skmtc/gen-shadcn-select'

type ReferencedInputArgs = {
  context: GenerateContext
  name: string
  label: string | undefined
  placeholder?: string
  destinationPath: string
  operation: OasOperation
  isRequired: boolean
  skipLabel?: boolean
}

export class ReferencedInput extends ContentBase {
  name: string
  label: string | undefined
  placeholder?: string
  inputName: string
  skipLabel?: boolean
  constructor({
    context,
    name,
    label,
    placeholder,
    destinationPath,
    operation,
    skipLabel
  }: ReferencedInputArgs) {
    super({ context })

    this.name = name
    this.label = label ?? name
    this.placeholder = placeholder
    this.skipLabel = skipLabel

    const inputDefinition = this.context.insertOperation(ShadcnSelectInput, operation, {
      destinationPath
    })

    this.inputName = inputDefinition.toName()

    this.register({
      imports: { '@/components/fields/string-field': ['StringField'] },
      destinationPath
    })
  }

  override toString() {
    return `<${this.inputName} fieldName={\`${this.name}\`} ${this.label && !this.skipLabel ? `label="${this.label}"` : ''} />`
  }
}
