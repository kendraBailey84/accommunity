import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, IntegerColumn, DateTimeColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_support_ticket = Table({
  name: 'x_snc_amoila_conne_support_ticket',
  label: 'Support Ticket',
  schema: {
    number: StringColumn({
      label: 'Number',
      maxLength: 40,
      read_only: true,
      default: 'javascript:global.getNextObjNumberPadded();'
    }),
    member: ReferenceColumn({
      label: 'Member',
      referenceTable: 'x_snc_amoila_conne_member'
    }),
    contact_email: StringColumn({
      label: 'Contact Email',
      maxLength: 100,
      mandatory: true
    }),
    contact_name: StringColumn({
      label: 'Contact Name',
      maxLength: 100,
      mandatory: true
    }),
    subject: StringColumn({
      label: 'Subject',
      maxLength: 200,
      mandatory: true
    }),
    description: StringColumn({
      label: 'Description',
      maxLength: 65000,
      mandatory: true
    }),
    category: ReferenceColumn({
      label: 'Category',
      referenceTable: 'x_snc_amoila_conne_category'
    }),
    priority: StringColumn({
      label: 'Priority',
      maxLength: 10,
      default: 'medium',
      choices: {
        low: { label: 'Low', sequence: 0 },
        medium: { label: 'Medium', sequence: 1 },
        high: { label: 'High', sequence: 2 },
        urgent: { label: 'Urgent', sequence: 3 }
      }
    }),
    state: StringColumn({
      label: 'State',
      maxLength: 20,
      default: 'new',
      choices: {
        new: { label: 'New', sequence: 0 },
        in_progress: { label: 'In Progress', sequence: 1 },
        awaiting_info: { label: 'Awaiting Info', sequence: 2 },
        resolved: { label: 'Resolved', sequence: 3 },
        closed: { label: 'Closed', sequence: 4 }
      }
    }),
    assigned_to: ReferenceColumn({
      label: 'Assigned To',
      referenceTable: 'sys_user'
    }),
    resolution_notes: StringColumn({
      label: 'Resolution Notes',
      maxLength: 65000
    }),
    resolved_at: DateTimeColumn({
      label: 'Resolved At'
    }),
    satisfaction_rating: IntegerColumn({
      label: 'Satisfaction Rating',
      min: 1,
      max: 5
    })
  },
  auto_number: {
    prefix: 'TKT',
    number: 1000,
    number_of_digits: 7
  },
  display: 'number'
})