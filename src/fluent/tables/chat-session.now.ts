import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, DateTimeColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_chat_session = Table({
  name: 'x_snc_amoila_conne_chat_session',
  label: 'Chat Session',
  schema: {
    session_id: StringColumn({
      label: 'Session ID',
      maxLength: 64,
      mandatory: true,
      attributes: {
        unique: true
      }
    }),
    member: ReferenceColumn({
      label: 'Member',
      referenceTable: 'x_snc_amoila_conne_member'
    }),
    guest_name: StringColumn({
      label: 'Guest Name',
      maxLength: 100
    }),
    guest_email: StringColumn({
      label: 'Guest Email',
      maxLength: 100
    }),
    session_type: StringColumn({
      label: 'Session Type',
      maxLength: 10,
      default: 'general',
      choices: {
        support: { label: 'Support', sequence: 0 },
        coaching: { label: 'Coaching', sequence: 1 },
        general: { label: 'General', sequence: 2 }
      }
    }),
    started_at: DateTimeColumn({
      label: 'Started At',
      default: 'javascript:gs.nowDateTime()'
    }),
    ended_at: DateTimeColumn({
      label: 'Ended At'
    }),
    message_count: IntegerColumn({
      label: 'Message Count',
      default: '0'
    }),
    resolved: BooleanColumn({
      label: 'Resolved',
      default: false
    }),
    escalated_to_ticket: ReferenceColumn({
      label: 'Escalated to Ticket',
      referenceTable: 'x_snc_amoila_conne_support_ticket'
    }),
    active: BooleanColumn({
      label: 'Active',
      default: true
    })
  },
  auto_number: {
    prefix: 'CHAT',
    number: 1000,
    number_of_digits: 7
  },
  display: 'session_id'
})