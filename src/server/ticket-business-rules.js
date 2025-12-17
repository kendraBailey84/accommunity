import { gs, GlideDateTime, GlideRecord } from '@servicenow/glide'

// Business rule function to set resolved_at timestamp when state changes to Resolved
export function setResolvedTimestamp(current, previous) {
  // Check if state changed to 'resolved' and resolved_at is not already set
  if (current.getValue('state') == 'resolved' && !current.getValue('resolved_at')) {
    const now = new GlideDateTime()
    current.setValue('resolved_at', now.getDisplayValue())
  }
}

// Business rule function to auto-assign Technical Support category for password/login issues
export function autoAssignTechnicalSupport(current) {
  const subject = current.getValue('subject').toLowerCase()
  
  // Check if subject contains password or login keywords and no category is set
  if ((subject.includes('password') || subject.includes('login')) && !current.getValue('category')) {
    // Find the Technical Support category
    const categoryGr = new GlideRecord('x_snc_amoila_conne_category')
    categoryGr.addQuery('name', 'Technical Support')
    categoryGr.query()
    
    if (categoryGr.next()) {
      current.setValue('category', categoryGr.getUniqueValue())
    }
  }
}