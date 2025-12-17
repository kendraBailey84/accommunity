import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'
import { memberRole, coachRole, adminRole } from '../roles/roles.now'

// Support Ticket ACLs

// Members can create tickets
export const supportTicketCreateACL = Acl({
  $id: Now.ID['acl_ticket_create'],
  type: 'record',
  table: 'x_snc_amoila_conne_support_ticket',
  operation: 'create',
  roles: [memberRole, coachRole, adminRole],
  active: true,
  description: 'Allow members, coaches, and admins to create support tickets'
})

// Members can read their own tickets, coaches and admins can read all
export const supportTicketReadACL = Acl({
  $id: Now.ID['acl_ticket_read'],
  type: 'record',
  table: 'x_snc_amoila_conne_support_ticket',
  operation: 'read',
  roles: [memberRole, coachRole, adminRole],
  script: `
    // Members can only view tickets where they are the member or contact_email matches their email
    if (gs.hasRole('x_snc_amoila_conne.member') && !gs.hasRole('x_snc_amoila_conne.coach') && !gs.hasRole('x_snc_amoila_conne.admin')) {
      var userEmail = gs.getUser().getEmail();
      return current.getValue('contact_email') == userEmail || 
             (current.member && current.member.user && current.member.user.toString() == gs.getUserID());
    }
    // Coaches and admins can view all tickets
    return gs.hasRole('x_snc_amoila_conne.coach') || gs.hasRole('x_snc_amoila_conne.admin');
  `,
  active: true,
  description: 'Members can read their own tickets, coaches and admins can read all tickets'
})

// Only coaches and admins can update tickets
export const supportTicketWriteACL = Acl({
  $id: Now.ID['acl_ticket_write'],
  type: 'record',
  table: 'x_snc_amoila_conne_support_ticket',
  operation: 'write',
  roles: [coachRole, adminRole],
  active: true,
  description: 'Only coaches and admins can update support tickets'
})

// Only admins can delete tickets
export const supportTicketDeleteACL = Acl({
  $id: Now.ID['acl_ticket_delete'],
  type: 'record',
  table: 'x_snc_amoila_conne_support_ticket',
  operation: 'delete',
  roles: [adminRole],
  active: true,
  description: 'Only admins can delete support tickets'
})

// Ticket Comment ACLs

// Members can create comments on their own tickets, coaches and admins on all
export const ticketCommentCreateACL = Acl({
  $id: Now.ID['acl_comment_create'],
  type: 'record',
  table: 'x_snc_amoila_conne_ticket_comment',
  operation: 'create',
  roles: [memberRole, coachRole, adminRole],
  script: `
    // If user is coach or admin, allow
    if (gs.hasRole('x_snc_amoila_conne.coach') || gs.hasRole('x_snc_amoila_conne.admin')) {
      return true;
    }
    // Members can only comment on their own tickets
    if (gs.hasRole('x_snc_amoila_conne.member')) {
      var userEmail = gs.getUser().getEmail();
      var ticketGr = new GlideRecord('x_snc_amoila_conne_support_ticket');
      if (ticketGr.get(current.getValue('ticket'))) {
        return ticketGr.getValue('contact_email') == userEmail || 
               (ticketGr.member && ticketGr.member.user && ticketGr.member.user.toString() == gs.getUserID());
      }
    }
    return false;
  `,
  active: true,
  description: 'Members can create comments on their own tickets, coaches and admins on all tickets'
})

// Read access for comments follows same pattern as tickets
export const ticketCommentReadACL = Acl({
  $id: Now.ID['acl_comment_read'],
  type: 'record',
  table: 'x_snc_amoila_conne_ticket_comment',
  operation: 'read',
  roles: [memberRole, coachRole, adminRole],
  script: `
    // If user is coach or admin, allow (but check internal flag)
    if (gs.hasRole('x_snc_amoila_conne.coach') || gs.hasRole('x_snc_amoila_conne.admin')) {
      return true;
    }
    // Members cannot see internal comments
    if (current.getValue('internal') == 'true') {
      return false;
    }
    // Members can only view comments on their own tickets
    if (gs.hasRole('x_snc_amoila_conne.member')) {
      var userEmail = gs.getUser().getEmail();
      var ticketGr = new GlideRecord('x_snc_amoila_conne_support_ticket');
      if (ticketGr.get(current.getValue('ticket'))) {
        return ticketGr.getValue('contact_email') == userEmail || 
               (ticketGr.member && ticketGr.member.user && ticketGr.member.user.toString() == gs.getUserID());
      }
    }
    return false;
  `,
  active: true,
  description: 'Members can read non-internal comments on their own tickets, coaches and admins can read all'
})

// Only coaches and admins can update comments
export const ticketCommentWriteACL = Acl({
  $id: Now.ID['acl_comment_write'],
  type: 'record',
  table: 'x_snc_amoila_conne_ticket_comment',
  operation: 'write',
  roles: [coachRole, adminRole],
  active: true,
  description: 'Only coaches and admins can update ticket comments'
})

// Only admins can delete comments
export const ticketCommentDeleteACL = Acl({
  $id: Now.ID['acl_comment_delete'],
  type: 'record',
  table: 'x_snc_amoila_conne_ticket_comment',
  operation: 'delete',
  roles: [adminRole],
  active: true,
  description: 'Only admins can delete ticket comments'
})