import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

// Basic member role for community members
export const memberRole = Role({
  name: 'x_snc_amoila_conne.member',
  description: 'Community member role with basic access to Amoila Connect features'
})

// Coach role for support staff with elevated privileges
export const coachRole = Role({
  name: 'x_snc_amoila_conne.coach',
  description: 'Support staff role with enhanced access to help community members',
  containsRoles: [memberRole]
})

// Admin role with full access
export const adminRole = Role({
  name: 'x_snc_amoila_conne.admin',
  description: 'Full administrative access to all Amoila Connect features and data',
  containsRoles: [memberRole, coachRole]
})