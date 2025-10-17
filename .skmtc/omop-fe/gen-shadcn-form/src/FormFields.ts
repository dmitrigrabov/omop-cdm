import type { OperationInsertableArgs, ListLines, Stringable, OasOperation } from '@skmtc/core'
import { ShadcnFormBase } from './base.ts'
import { Identifier, decapitalize, List } from '@skmtc/core'
import invariant from 'tiny-invariant'
import { join } from '@std/path'
import { schemaToField, getLabel } from './schemaToField.ts'
import type { EnrichmentSchema } from './enrichments.ts'

export class FormFields extends ShadcnFormBase {
  fields: ListLines<Stringable> | undefined
  constructor({ context, operation, settings }: OperationInsertableArgs<EnrichmentSchema>) {
    super({ context, operation, settings })

    this.fields = operation.toRequestBody(({ schema: parentSchema }) => {
      const resolved = parentSchema.resolve()

      invariant(resolved.type === 'object', 'Operation must have a body with type object')

      return List.fromEntries(resolved.properties ?? {}).toLines(([name, schema]) => {
        return schemaToField({
          context,
          name,
          schema,
          topLevelSchema: parentSchema,
          skipLabel: false,
          destinationPath: settings.exportPath,
          label: getLabel({ schema, name }),
          isRequired: Boolean(resolved.required?.includes(name))
        })
      })
    })
  }

  static override toIdentifier(operation: OasOperation): Identifier {
    const { name } = ShadcnFormBase.toIdentifier(operation)

    return Identifier.createVariable(`${name}Fields`)
  }

  static override toExportPath(operation: OasOperation): string {
    const schema = operation.toSuccessResponse()?.resolve()?.toSchema()

    invariant(schema?.isRef(), 'Expected ref schema')

    const responseName = schema.toRefName()

    const { name } = this.toIdentifier(operation)

    return (
      ShadcnFormBase.toExportPath(operation) ||
      join(decapitalize(responseName), `${name}.generated.tsx`)
    )
  }

  override toString() {
    return `() => {
      return <>${this.fields ?? ''}</>
    }`
  }
}
