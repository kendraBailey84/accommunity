import '@servicenow/sdk/global'
import { Table, StringColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_category = Table({
  name: 'x_snc_amoila_conne_category',
  label: 'Content Category',
  schema: {
    name: StringColumn({
      label: 'Name',
      maxLength: 100,
      mandatory: true,
      attributes: {
        unique: true
      }
    }),
    description: StringColumn({
      label: 'Description',
      maxLength: 500
    }),
    icon: StringColumn({
      label: 'Icon',
      maxLength: 50
    }),
    display_order: IntegerColumn({
      label: 'Display Order'
    }),
    active: BooleanColumn({
      label: 'Active',
      default: true
    })
  },
  auto_number: {
    prefix: 'CAT',
    number: 1000,
    number_of_digits: 7
  },
  display: 'name'
})