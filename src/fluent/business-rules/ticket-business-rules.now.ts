import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { setResolvedTimestamp, autoAssignTechnicalSupport } from '../../server/ticket-business-rules.js'

// Business rule to set resolved_at timestamp when state changes to Resolved
export const setResolvedTimestampRule = BusinessRule({
  $id: Now.ID['br_set_resolved_timestamp'],
  name: 'Set Resolved Timestamp',
  table: 'x_snc_amoila_conne_support_ticket',
  when: 'before',
  action: ['update'],
  script: setResolvedTimestamp,
  condition: "current.state.changes() && current.getValue('state') == 'resolved'",
  active: true,
  order: 100,
  description: 'Sets the resolved_at timestamp when a ticket state changes to Resolved'
})

// Business rule to auto-assign Technical Support category for password/login issues
export const autoAssignTechnicalSupportRule = BusinessRule({
  $id: Now.ID['br_auto_assign_tech_support'],
  name: 'Auto-assign Technical Support Category',
  table: 'x_snc_amoila_conne_support_ticket',
  when: 'before',
  action: ['insert'],
  script: autoAssignTechnicalSupport,
  active: true,
  order: 200,
  description: 'Auto-assigns Technical Support category for tickets with password or login keywords in subject'
})