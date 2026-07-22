export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. CEO, Marketing Director, Founder',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'The testimonial text. Write in the client\'s voice, first person.',
      validation: (Rule) => Rule.required().max(400),
    },
    {
      name: 'avatar',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional headshot. Square or portrait crops work best.',
    },
    {
      name: 'rating',
      title: 'Star Rating (1–5)',
      type: 'number',
      options: {
        list: [
          {title: '★★★★★  5 stars', value: 5},
          {title: '★★★★☆  4 stars', value: 4},
          {title: '★★★☆☆  3 stars', value: 3},
        ],
        layout: 'radio',
      },
      initialValue: 5,
    },
    {
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Only featured testimonials appear on the homepage.',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'avatar',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle || 'No company',
        media,
      }
    },
  },
}
