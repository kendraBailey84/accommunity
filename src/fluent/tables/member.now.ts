import '@servicenow/sdk/global'
import { Table, ReferenceColumn, StringColumn, DateColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_member = Table({
  name: 'x_snc_amoila_conne_member',
  label: 'Member Profile',
  schema: {
    user: ReferenceColumn({
      label: 'User',
      referenceTable: 'sys_user',
      mandatory: true
    }),
    display_name: StringColumn({
      label: 'Display Name',
      maxLength: 100,
      mandatory: true
    }),
    profile_image: StringColumn({
      label: 'Profile Image',
      maxLength: 255
    }),
    fitness_level: StringColumn({
      label: 'Fitness Level',
      choices: {
        beginner: { label: 'Beginner', sequence: 0 },
        intermediate: { label: 'Intermediate', sequence: 1 },
        advanced: { label: 'Advanced', sequence: 2 }
      }
    }),
    primary_goal: StringColumn({
      label: 'Primary Goal',
      maxLength: 50,
      choices: {
        build_strength: { label: 'Build Strength', sequence: 0 },
        lose_weight: { label: 'Lose Weight', sequence: 1 },
        improve_mobility: { label: 'Improve Mobility', sequence: 2 },
        general_fitness: { label: 'General Fitness', sequence: 3 },
        athletic_performance: { label: 'Athletic Performance', sequence: 4 }
      }
    }),
    enrolled_program: StringColumn({
      label: 'Enrolled Program',
      maxLength: 50,
      choices: {
        645: { label: '645', sequence: 0 },
        the_work: { label: 'THE WORK', sequence: 1 },
        chop_wood_carry_water: { label: 'CHOP WOOD CARRY WATER', sequence: 2 },
        free_workouts: { label: 'Free Workouts', sequence: 3 },
        none: { label: 'None', sequence: 4 }
      }
    }),
    join_date: DateColumn({
      label: 'Join Date',
      default: 'javascript:gs.nowNoTZ()'
    }),
    bio: StringColumn({
      label: 'Bio',
      maxLength: 500
    }),
    total_xp: IntegerColumn({
      label: 'Total XP',
      default: '0'
    }),
    current_streak: IntegerColumn({
      label: 'Current Streak',
      default: '0'
    }),
    longest_streak: IntegerColumn({
      label: 'Longest Streak',
      default: '0'
    }),
    level: IntegerColumn({
      label: 'Level',
      default: '1'
    }),
    active: BooleanColumn({
      label: 'Active',
      default: true
    })
  },
  auto_number: {
    prefix: 'MBR',
    number: 1000,
    number_of_digits: 7
  },
  display: 'display_name'
})