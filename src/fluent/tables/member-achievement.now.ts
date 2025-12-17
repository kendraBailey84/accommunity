import '@servicenow/sdk/global'
import { Table, ReferenceColumn, DateTimeColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_member_achievement = Table({
  name: 'x_snc_amoila_conne_member_achievement',
  label: 'Member Achievement',
  schema: {
    member: ReferenceColumn({
      label: 'Member',
      referenceTable: 'x_snc_amoila_conne_member',
      mandatory: true
    }),
    achievement: ReferenceColumn({
      label: 'Achievement',
      referenceTable: 'x_snc_amoila_conne_achievement',
      mandatory: true
    }),
    earned_date: DateTimeColumn({
      label: 'Earned Date',
      default: 'javascript:gs.nowDateTime()'
    })
  },
  auto_number: {
    prefix: 'MA',
    number: 1000,
    number_of_digits: 7
  },
  display: 'achievement'
})