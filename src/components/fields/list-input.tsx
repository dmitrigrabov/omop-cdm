import { FormItem, FormLabel } from '@/components/ui/form'
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { FieldArrayWithId, UseFieldArrayRemove } from 'react-hook-form'
import { useFieldArray } from '@hookform/lenses/rhf'
import { Lens } from '@hookform/lenses'

export type RenderRowProps = {
  row: FieldArrayWithId<Model, Key>
  index: number
  remove: UseFieldArrayRemove
}

type ListInputProps = {
  label: string
  lens: Lens<any>
  headers: React.ReactNode[]
  itemName: string
  renderRow: ({ row, index, remove }: RenderRowProps<Model, Key>) => React.ReactNode
}

export const ListInput = ({
  label,
  lens,
  headers,
  itemName,
  renderRow
}: ListInputProps<Model, Key>) => {
  const { fields, append, remove } = useFieldArray(lens.interop())

  return (
    <FormItem className="px-px">
      <FormLabel>{label}</FormLabel>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{fields.map((row, index) => renderRow({ row, index, remove }))}</TableBody>
      </Table>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="gap-2 w-full"
        onClick={() => append({})}
      >
        <PlusCircle className="h-3.5 w-3.5" />
        Add {itemName}
      </Button>
    </FormItem>
  )
}
