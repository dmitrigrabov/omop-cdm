import { ContentBase } from '@skmtc/core'
import type { GenerateContext, Stringable } from '@skmtc/core'
import invariant from 'tiny-invariant'

type OptionalInputArgs = {
  context: GenerateContext
  label: string | undefined
  name: string | undefined
  destinationPath: string
  content: Stringable
}

export class OptionalInput extends ContentBase {
  label: string | undefined
  content: Stringable

  constructor({ context, name, label, destinationPath, content }: OptionalInputArgs) {
    super({ context })

    invariant(label, 'Expected label')

    this.label = label ?? name
    this.content = content

    this.register({
      imports: {
        '@/components/ui/accordion': [
          'Accordion',
          'AccordionItem',
          'AccordionTrigger',
          'AccordionContent'
        ]
      },
      destinationPath
    })
  }

  override toString() {
    return `<Accordion type="single" collapsible >
  <AccordionItem value="item-1">
    <AccordionTrigger>
      <h2>${this.label}</h2>
    </AccordionTrigger>
    <AccordionContent className="space-y-4">
      ${this.content}
    </AccordionContent>
  </AccordionItem>
</Accordion>
`
  }
}
