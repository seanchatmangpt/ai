<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Period, Range, TournamentResult } from '~/types'

const props = defineProps<{
  period: Period
  range: Range
}>()

const UBadge = resolveComponent('UBadge')

const { data } = await useFetch<TournamentResult[]>('/api/tournaments', {
  lazy: true,
  default: () => []
})

const columns: TableColumn<TournamentResult>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  },
  {
    accessorKey: 'result',
    header: 'Result',
    cell: ({ row }) => {
      const result = row.getValue('result') as string
      const color = {
        '1st Place': 'success' as const,
        '2nd Place': 'success' as const,
        '3rd Place': 'success' as const,
        'Top 8': 'warning' as const,
        'Top 16': 'warning' as const,
        'Top 32': 'neutral' as const,
        'Eliminated': 'error' as const
      }[result] || 'neutral'

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => result)
    }
  },
  {
    accessorKey: 'opponent',
    header: 'Opponent'
  },
  {
    accessorKey: 'format',
    header: 'Format'
  },
  {
    accessorKey: 'winnings',
    header: () => h('div', { class: 'text-right' }, 'Winnings'),
    cell: ({ row }) => {
      const winnings = Number.parseFloat(row.getValue('winnings'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(winnings)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  }
]
</script>

<template>
  <UTable
    :data="data"
    :columns="columns"
    class="shrink-0"
    :ui="{
      base: 'table-fixed border-separate border-spacing-0',
      thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
      tbody: '[&>tr]:last:[&>td]:border-b-0',
      th: 'first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
      td: 'border-b border-default'
    }"
  />
</template>
