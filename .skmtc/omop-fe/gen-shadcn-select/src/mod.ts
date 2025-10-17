import { toOperationEntry } from '@skmtc/core'
import { toEnrichmentSchema, type EnrichmentSchema } from './enrichments.ts'
import { toListKeyAndItem } from '@skmtc/gen-tanstack-query-supabase-zod'
import { ShadcnSelectField } from './ShadcnSelectField.ts'
import { ShadcnSelectApiBase } from './base.ts'
import denoJson from '../deno.json' with { type: 'json' }

export const ShadcnSelectApiEntry = toOperationEntry<EnrichmentSchema>({
  id: denoJson.name,

  toEnrichmentSchema,

  isSupported: ({ operation }) => {
    try {
      if (operation.method !== 'get') {
        return false
      }

      const result = toListKeyAndItem(operation)

      if (!result.schema) {
        return false
      }

      const resolved = result.schema.resolve()

      if (resolved.type !== 'object') {
        return false
      }

      if (!resolved.properties?.id) {
        return false
      }

      return true
    } catch (_error) {
      return false
    }
  },

  transform: ({ context, operation }) => {
    context.insertOperation(ShadcnSelectField, operation)
  },

  toPreviewModule: ({ operation }) => ({
    name: ShadcnSelectApiBase.toIdentifier(operation).name,
    exportPath: ShadcnSelectApiBase.toExportPath(operation),
    group: 'inputs'
  }),

  toMappingModule: ({ operation }) => ({
    name: ShadcnSelectField.toIdentifier(operation).name,
    exportPath: ShadcnSelectField.toExportPath(operation),
    group: 'inputs',
    itemType: 'input',
    schema: 'string'
  })
})
