import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, DateTimeColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_chat_message = Table({
  name: 'x_snc_amoila_conne_chat_message',
  label: 'Chat Message',
  schema: {
    session: ReferenceColumn({
      label: 'Session',
      referenceTable: 'x_snc_amoila_conne_chat_session',
      mandatory: true
    }),
    sender_type: StringColumn({
      label: 'Sender Type',
      maxLength: 10,
      mandatory: true,
      choices: {
        user: { label: 'User', sequence: 0 },
        bot: { label: 'Bot', sequence: 1 },
        agent: { label: 'Agent', sequence: 2 }
      }
    }),
    sender_name: StringColumn({
      label: 'Sender Name',
      maxLength: 100
    }),
    message: StringColumn({
      label: 'Message',
      maxLength: 65000,
      mandatory: true
    }),
    intent_detected: StringColumn({
      label: 'Intent Detected',
      maxLength: 100
    }),
    sent_at: DateTimeColumn({
      label: 'Sent At',
      default: 'javascript:gs.nowDateTime()'
    })
  },
  auto_number: {
    prefix: 'MSG',
    number: 1000,
    number_of_digits: 7
  },
  display: 'message'
})