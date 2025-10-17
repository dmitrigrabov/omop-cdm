import { List, ContentBase } from '@skmtc/core'
import type {
  CustomValue,
  EntryList,
  GenerateContext,
  ListArray,
  ListLines,
  OasObject,
  OasRef,
  OasSchema,
  Stringable,
  TypeSystemValue
} from '@skmtc/core'
import invariant from 'tiny-invariant'
import { getLabel, schemaToField } from '../schemaToField.ts'
import { toTsValue } from '@skmtc/gen-typescript'

type TableArgs = {
  context: GenerateContext
  schema: OasSchema | OasRef<'schema'>
  name: string
  label: string | undefined
  destinationPath: string
  isRequired: boolean
  topLevelSchema: OasSchema | OasRef<'schema'>
}

export class Table extends ContentBase {
  name: string
  headers: ListArray<Stringable>
  label: string | undefined
  rowRender: TableRowRender

  constructor({
    context,
    label,
    schema,
    name,
    isRequired,
    destinationPath,
    topLevelSchema
  }: TableArgs) {
    super({ context })

    const parentSchema = schema.resolve()

    invariant(parentSchema.type === 'object', 'Expected object schema')

    const items = List.fromEntries(parentSchema.properties ?? {})

    this.label = label ?? getLabel({ schema: parentSchema, name: 'table' })

    this.headers = items.toArray(([name, schema]) => `'${getLabel({ schema, name })}'`)

    this.name = name

    this.rowRender = new TableRowRender({
      context,
      parentName: name,
      destinationPath,
      parentSchema,
      items,
      isRequired,
      topLevelSchema
    })

    this.register({
      imports: {
        '@/components/fields/list-input': ['ListInput']
      },
      destinationPath
    })
  }

  override toString() {
    return `<ListInput
      label="${this.label}"
      fieldName={\`${this.name}\`}
      headers={${this.headers}}
      itemName="${this.name}"
      renderRow={${this.rowRender}}
    />`
  }
}

type TableRowRenderArgs = {
  context: GenerateContext
  parentName: string
  parentSchema: OasObject
  items: EntryList<OasSchema | OasRef<'schema'> | CustomValue>
  destinationPath: string
  isRequired: boolean
  topLevelSchema: OasSchema | OasRef<'schema'>
}

class TableRowRender extends ContentBase {
  parentName: string
  cells: ListLines<Stringable>
  rowType: TypeSystemValue
  constructor({
    context,
    parentName,
    destinationPath,
    parentSchema,
    items,
    isRequired,
    topLevelSchema
  }: TableRowRenderArgs) {
    super({ context })

    this.parentName = parentName
    this.rowType = toTsValue({
      schema: topLevelSchema,
      destinationPath,
      required: isRequired,
      context
    })

    this.cells = items.toLines(([name, schema]) => {
      return `<TableCell className="px-1">${schemaToField({
        context,
        schema,
        name: `${parentName}[\${index}].${name}`,
        skipLabel: true,
        label: getLabel({ schema, name }),
        destinationPath,
        isRequired: Boolean(parentSchema.required?.includes(name)),
        topLevelSchema
      })}</TableCell>`
    })

    this.cells.values
      .push(`<TableCell className="px-1"><Button type="button" size="sm" variant="ghost" onClick={() => remove(index)}>
        <X className="h-3.5 w-3.5" />
      </Button></TableCell>`)

    this.register({
      imports: {
        'lucide-react': ['X'],
        '@/components/ui/button': ['Button'],
        '@/components/ui/table': ['TableCell', 'TableRow'],
        '@/components/fields/list-input': ['RenderRowProps']
      },
      destinationPath
    })
  }

  override toString() {
    return `({ row, index, remove }:RenderRowProps<${this.rowType}, '${this.parentName}'>) => <TableRow key={row.id}>${this.cells}</TableRow>`
  }
}
