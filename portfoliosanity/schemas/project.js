export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  fields: [
    // --- Core Info ---
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on project cards (1–2 sentences).',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Full project description with rich text, images, and links.',
    },

    // --- Media ---
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO.',
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Additional screenshots or images for this project.',
    },

    // --- Classification ---
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Web', value: 'web'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'Design', value: 'design'},
          {title: 'Desktop App', value: 'desktop'},
        ],
        layout: 'grid',
      },
      description: 'Select all types that apply.',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Technologies and tools used (e.g. React, Node.js, Figma).',
    },

    // --- Links ---
    {
      name: 'link',
      title: 'Live Demo URL',
      type: 'url',
    },
    {
      name: 'githubLink',
      title: 'GitHub Repository URL',
      type: 'url',
    },

    // --- Meta ---
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {dateFormat: 'YYYY-MM'},
      description: 'When was this project built?',
    },
    {
      name: 'place',
      title: 'Context / Organization',
      type: 'string',
      description: 'e.g. Personal, Freelance, University, Company name.',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'In Progress', value: 'inProgress'},
          {title: 'Completed', value: 'completed'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'completed',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin this project to the top of your portfolio.',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use to manually sort projects.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'projectType',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: Array.isArray(subtitle) ? subtitle.join(', ') : subtitle,
        media,
      }
    },
  },
}