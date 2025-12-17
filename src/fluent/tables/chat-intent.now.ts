import '@servicenow/sdk/global'
import { Table, StringColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_chat_intent = Table({
  name: 'x_snc_amoila_conne_chat_intent',
  label: 'Chat Intent',
  schema: {
    name: StringColumn({
      label: 'Name',
      maxLength: 100,
      mandatory: true,
      attributes: {
        unique: true
      }
    }),
    keywords: StringColumn({
      label: 'Keywords',
      maxLength: 1000
    }),
    response_template: StringColumn({
      label: 'Response Template',
      maxLength: 65000
    }),
    action_type: StringColumn({
      label: 'Action Type',
      maxLength: 20,
      choices: {
        answer: { label: 'Answer', sequence: 0 },
        search_kb: { label: 'Search KB', sequence: 1 },
        create_ticket: { label: 'Create Ticket', sequence: 2 },
        transfer_agent: { label: 'Transfer Agent', sequence: 3 },
        show_faq: { label: 'Show FAQ', sequence: 4 }
      }
    }),
    active: BooleanColumn({
      label: 'Active',
      default: true
    })
  },
  auto_number: {
    prefix: 'INT',
    number: 1000,
    number_of_digits: 7
  },
  display: 'name'
})