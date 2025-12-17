import '@servicenow/sdk/global'
import { Table, StringColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_achievement = Table({
  name: 'x_snc_amoila_conne_achievement',
  label: 'Achievement',
  schema: {
    name: StringColumn({
      label: 'Name',
      maxLength: 100,
      mandatory: true,
      attributes: {
        unique: true
      }
    }),
    description: StringColumn({
      label: 'Description',
      maxLength: 300
    }),
    icon: StringColumn({
      label: 'Icon',
      maxLength: 100
    }),
    icon_color: StringColumn({
      label: 'Icon Color',
      maxLength: 20,
      default: '#FF6B35'
    }),
    xp_reward: IntegerColumn({
      label: 'XP Reward',
      default: '0'
    }),
    criteria_type: StringColumn({
      label: 'Criteria Type',
      maxLength: 20,
      choices: {
        workout_count: { label: 'Workout Count', sequence: 0 },
        streak_days: { label: 'Streak Days', sequence: 1 },
        xp_total: { label: 'XP Total', sequence: 2 },
        program_complete: { label: 'Program Complete', sequence: 3 },
        community_posts: { label: 'Community Posts', sequence: 4 },
        manual: { label: 'Manual', sequence: 5 }
      }
    }),
    criteria_value: IntegerColumn({
      label: 'Criteria Value'
    }),
    tier: StringColumn({
      label: 'Tier',
      maxLength: 10,
      choices: {
        bronze: { label: 'Bronze', sequence: 0 },
        silver: { label: 'Silver', sequence: 1 },
        gold: { label: 'Gold', sequence: 2 },
        platinum: { label: 'Platinum', sequence: 3 }
      }
    }),
    active: BooleanColumn({
      label: 'Active',
      default: true
    })
  },
  auto_number: {
    prefix: 'ACH',
    number: 1000,
    number_of_digits: 7
  },
  display: 'name'
})