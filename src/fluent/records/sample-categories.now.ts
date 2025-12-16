import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

// Sample Category Records
export const gettingStartedCategory = Record({
  $id: Now.ID['cat_getting_started'],
  table: 'x_snc_amoila_conne_category',
  data: {
    name: 'Getting Started',
    description: 'Welcome and onboarding guides',
    icon: 'star-fill',
    display_order: 10,
    active: true
  }
})

export const programsWorkoutsCategory = Record({
  $id: Now.ID['cat_programs_workouts'],
  table: 'x_snc_amoila_conne_category',
  data: {
    name: 'Programs & Workouts',
    description: 'Training program information',
    icon: 'activity',
    display_order: 20,
    active: true
  }
})

export const nutritionRecoveryCategory = Record({
  $id: Now.ID['cat_nutrition_recovery'],
  table: 'x_snc_amoila_conne_category',
  data: {
    name: 'Nutrition & Recovery',
    description: 'Diet and rest guidance',
    icon: 'heart-fill',
    display_order: 30,
    active: true
  }
})

export const technicalSupportCategory = Record({
  $id: Now.ID['cat_technical_support'],
  table: 'x_snc_amoila_conne_category',
  data: {
    name: 'Technical Support',
    description: 'App and account help',
    icon: 'wrench',
    display_order: 40,
    active: true
  }
})

export const communityCategory = Record({
  $id: Now.ID['cat_community'],
  table: 'x_snc_amoila_conne_category',
  data: {
    name: 'Community',
    description: 'Guidelines and engagement tips',
    icon: 'people-fill',
    display_order: 50,
    active: true
  }
})