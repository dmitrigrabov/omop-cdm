import { ContentBase, List } from '@skmtc/core'
import type { GenerateContext, ListLines, OasSchema, Stringable, OasRef } from '@skmtc/core'
import { schemaToField, getLabel } from '../schemaToField.ts'
import invariant from 'tiny-invariant'

type ObjectInputArgs = {
  schema: OasSchema
  context: GenerateContext
  name: string
  label: string | undefined
  destinationPath: string
  isRequired: boolean
  topLevelSchema: OasSchema | OasRef<'schema'>
}

export class ObjectInput extends ContentBase {
  name: string
  label: string | undefined
  placeholder?: string
  fields: ListLines<Stringable>

  constructor({
    context,
    name: parentName,
    label,
    destinationPath,
    schema: schema,
    topLevelSchema
  }: ObjectInputArgs) {
    super({ context })

    invariant(schema.type === 'object', 'Expected object schema')

    this.name = parentName

    invariant(label, 'Expected label')

    this.label = label

    this.fields = List.fromEntries(schema.properties ?? {}).toLines(([name, propertySchema]) => {
      return schemaToField({
        context,
        name: `${parentName}.${name}`,
        schema: propertySchema,
        destinationPath,
        skipLabel: false,
        label: getLabel({ schema: propertySchema, name }),
        isRequired: Boolean(schema.required?.includes(name)),
        topLevelSchema
      })
    })

    this.register({
      imports: {
        '@/components/ui/form': ['FormLabel']
      },
      destinationPath
    })
  }

  override toString() {
    return `<FormLabel>${this.label}</FormLabel>
  ${this.fields}
`
  }
}
