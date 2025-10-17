import type { CustomValue, GenerateContext, OasRef, OasSchema, Stringable } from '@skmtc/core'
import { StringInput } from './fields/StringInput.ts'
import ShadcnSelectInput from '@skmtc/gen-shadcn-select'
import { ReferencedInput } from './fields/ReferencedInput.ts'
import invariant from 'tiny-invariant'
import { Table } from './fields/Table.ts'
import { ObjectInput } from './fields/ObjectInput.ts'
import { OptionalInput } from './fields/OptionalInput.ts'
import { SelectInput } from './fields/SelectInput.ts'
import { NumberInput } from './fields/NumberInput.ts'
import { IntegerInput } from './fields/IntegerInput.ts'

type SchemaToFieldArgs = {
  name: string
  label: string | undefined
  skipLabel?: boolean
  isRequired: boolean
  schema: OasRef<'schema'> | OasSchema | CustomValue
  context: GenerateContext
  destinationPath: string
  topLevelSchema: OasSchema | OasRef<'schema'>
}

export const schemaToField = ({
  isRequired,
  schema,
  context,
  destinationPath,
  name,
  label,
  skipLabel,
  topLevelSchema
}: SchemaToFieldArgs): Stringable => {
  // OpenAPI refs cannot have extensions and as a workaround
  // it represents them as a single member intersection.
  // To handle this edge case we call adjust the arguments
  // by taking the schema from the intersection member and label
  // from the intersection itself. Then we call schemaToField
  // recursively with the adjusted arguments.
  if ('members' in schema && schema.members.length === 1) {
    return schemaToField({
      schema: schema.members[0],
      isRequired,
      context,
      destinationPath,
      name,
      skipLabel,
      label: getLabel({ schema, name }),
      topLevelSchema
    })
  }

  // If schema is a reference
  if (schema.isRef()) {
    // we look up its value and call schemaToField recursively
    // to handle the resolved schema

    return schemaToField({
      schema: schema.resolve(),
      isRequired,
      context,
      destinationPath,
      name,
      skipLabel,
      label: label ?? getLabel({ schema, name }),
      topLevelSchema
    })
  }

  if (schema.type === 'object') {
    const input = new ObjectInput({
      context,
      schema: schema,
      name,
      label: label ?? getLabel({ schema, name }),
      destinationPath,
      isRequired,
      topLevelSchema
    })

    return isRequired
      ? input
      : new OptionalInput({ context, name, label, destinationPath, content: input.fields })
  }

  if (schema.type === 'array') {
    return new Table({
      context,
      schema: schema.items,
      name,
      label: label ?? getLabel({ schema, name }),
      destinationPath,
      isRequired,
      topLevelSchema
    })
  }

  if (schema.type === 'number') {
    return new NumberInput({
      context,
      name,
      label: label ?? getLabel({ schema, name }),
      destinationPath,
      skipLabel
    })
  }

  if (schema.type === 'integer') {
    return new IntegerInput({
      context,
      name,
      label: label ?? getLabel({ schema, name }),
      destinationPath,
      skipLabel
    })
  }

  if (schema.type === 'string') {
    if (schema.enums?.length) {
      const enums = schema.enums.filter(
        (item): item is string => typeof item === 'string'
      ) as string[]

      return new SelectInput({
        context,
        name,
        label: label ?? getLabel({ schema, name }),
        destinationPath,
        skipLabel,
        enums
      })
    }

    const references = schema.extensionFields?.['x-references']

    if (typeof references === 'string') {
      return new ReferencedInput({
        context,
        operation: getReferencedOperation({ context, references }),
        name,
        label: label ?? getLabel({ schema, name }),
        destinationPath,
        isRequired,
        skipLabel
      })
    }
  }

  return new StringInput({ context, name, label, destinationPath, skipLabel })
}

type GetLabelArgs = {
  schema: OasRef<'schema'> | OasSchema | CustomValue
  name: string
}

export const getLabel = ({ schema, name }: GetLabelArgs): string | undefined => {
  if (schema.type === 'custom') {
    return name
  }

  const label = schema.isRef()
    ? schema.resolve().extensionFields?.['x-label']
    : schema.extensionFields?.['x-label']
  return typeof label === 'string' ? label : undefined
}

type GetReferencedOperationArgs = {
  references: string
  context: GenerateContext
}

const getReferencedOperation = ({ context, references }: GetReferencedOperationArgs) => {
  const operation = context.oasDocument.operations.find(operation => {
    return (
      operation.tags?.includes(references) && ShadcnSelectInput.isSupported({ context, operation })
    )
  })

  invariant(operation, `Operation '${operation?.method} ${operation?.path}' not found`)

  return operation
}
