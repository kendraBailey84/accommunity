import '@servicenow/sdk/global'
import { Table, ReferenceColumn, IntegerColumn, StringColumn, DateTimeColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_xp_log = Table({
  name: 'x_snc_amoila_conne_xp_log',
  label: 'XP Log',
  schema: {
    member: ReferenceColumn({
      label: 'Member',
      referenceTable: 'x_snc_amoila_conne_member',
      mandatory: true
    }),
    xp_amount: IntegerColumn({
      label: 'XP Amount',
      mandatory: true
    }),
    action_type: StringColumn({
      label: 'Action Type',
      maxLength: 20,
      choices: {
        workout_complete: { label: 'Workout Complete', sequence: 0 },
        article_read: { label: 'Article Read', sequence: 1 },
        faq_helpful: { label: 'FAQ Helpful', sequence: 2 },
        achievement_earned: { label: 'Achievement Earned', sequence: 3 },
        streak_bonus: { label: 'Streak Bonus', sequence: 4 },
        admin_award: { label: 'Admin Award', sequence: 5 }
      }
    }),
    description: StringColumn({
      label: 'Description',
      maxLength: 300
    }),
    created_on: DateTimeColumn({
      label: 'Created On',
      default: 'javascript:gs.nowDateTime()'
    })
  },
  auto_number: {
    prefix: 'XP',
    number: 1000,
    number_of_digits: 7
  },
  display: 'description'
})