import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, BooleanColumn, DateTimeColumn, IntegerColumn } from '@servicenow/sdk/core'

export const x_snc_amoila_conne_kb_article = Table({
  name: 'x_snc_amoila_conne_kb_article',
  label: 'Knowledge Article',
  schema: {
    title: StringColumn({
      label: 'Title',
      maxLength: 200,
      mandatory: true
    }),
    slug: StringColumn({
      label: 'Slug',
      maxLength: 200,
      attributes: {
        unique: true
      }
    }),
    category: ReferenceColumn({
      label: 'Category',
      referenceTable: 'x_snc_amoila_conne_category',
      mandatory: true
    }),
    short_description: StringColumn({
      label: 'Short Description',
      maxLength: 300
    }),
    content: StringColumn({
      label: 'Content',
      maxLength: 65000,
      mandatory: true
    }),
    featured_image: StringColumn({
      label: 'Featured Image',
      maxLength: 255
    }),
    author: ReferenceColumn({
      label: 'Author',
      referenceTable: 'sys_user'
    }),
    published: BooleanColumn({
      label: 'Published',
      default: false
    }),
    publish_date: DateTimeColumn({
      label: 'Publish Date'
    }),
    view_count: IntegerColumn({
      label: 'View Count',
      default: '0'
    }),
    helpful_yes: IntegerColumn({
      label: 'Helpful - Yes',
      default: '0'
    }),
    helpful_no: IntegerColumn({
      label: 'Helpful - No',
      default: '0'
    }),
    tags: StringColumn({
      label: 'Tags',
      maxLength: 500
    })
  },
  auto_number: {
    prefix: 'KB',
    number: 1000,
    number_of_digits: 7
  },
  display: 'title'
})