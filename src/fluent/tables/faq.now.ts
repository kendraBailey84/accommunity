import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_faq = Table({
  name: 'x_snc_amoila_conne_faq',
  label: 'FAQ',
  schema: {
    question: StringColumn({
      label: 'Question',
      maxLength: 500,
      mandatory: true
    }),
    answer: StringColumn({
      label: 'Answer',
      maxLength: 65000,
      mandatory: true
    }),
    category: ReferenceColumn({
      label: 'Category',
      referenceTable: 'x_snc_amoila_conne_category',
      mandatory: true
    }),
    display_order: IntegerColumn({
      label: 'Display Order'
    }),
    view_count: IntegerColumn({
      label: 'View Count',
      default: '0'
    }),
    helpful_yes: IntegerColumn({
      label: 'Helpful - Yes',
      default: '0'
    }),
    helpful_no: IntegerColumn({
      label: 'Helpful - No',
      default: '0'
    }),
    active: BooleanColumn({
      label: 'Active',
      default: true
    }),
    featured: BooleanColumn({
      label: 'Featured',
      default: false
    })
  },
  auto_number: {
    prefix: 'FAQ',
    number: 1000,
    number_of_digits: 7
  },
  display: 'question'
})