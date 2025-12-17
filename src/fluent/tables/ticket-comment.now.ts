import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, BooleanColumn, DateTimeColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_ticket_comment = Table({
  name: 'x_snc_amoila_conne_ticket_comment',
  label: 'Ticket Comment',
  schema: {
    ticket: ReferenceColumn({
      label: 'Ticket',
      referenceTable: 'x_snc_amoila_conne_support_ticket',
      mandatory: true
    }),
    author: ReferenceColumn({
      label: 'Author',
      referenceTable: 'sys_user'
    }),
    author_name: StringColumn({
      label: 'Author Name',
      maxLength: 100
    }),
    comment: StringColumn({
      label: 'Comment',
      maxLength: 65000,
      mandatory: true
    }),
    internal: BooleanColumn({
      label: 'Internal',
      default: false
    }),
    created_on: DateTimeColumn({
      label: 'Created On',
      default: 'javascript:gs.nowDateTime()'
    })
  },
  auto_number: {
    prefix: 'CMT',
    number: 1000,
    number_of_digits: 7
  },
  display: 'comment'
})