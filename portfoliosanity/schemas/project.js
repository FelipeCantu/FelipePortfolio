// A portfolio holds a few curated case studies, not an archive. Only documents
// with `showcase` on appear on the site (max 5, sorted by `order`); everything
// else stays in the CMS, hidden, so it can be brought back with one toggle.
const MAX_SHOWCASE = 5

const requiredWhenShowcased = (message) => (Rule) =>
  Rule.custom((value, {document}) => (document?.showcase && !value ? message : true))

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'card', title: 'Card', default: true},
    {name: 'caseStudy', title: 'Case study'},
    {name: 'links', title: 'Links'},
  ],
  orderings: [
    {
      title: 'Portfolio order',
      name: 'portfolioOrder',
      by: [
        {field: 'showcase', direction: 'desc'},
        {field: 'order', direction: 'asc'},
      ],
    },
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  fields: [
    // --- Visibility ---
    {
      name: 'showcase',
      title: 'Show on portfolio',
      type: 'boolean',
      group: 'card',
      description: `Only showcased projects appear on the site and get a case-study page. Keep it to your best ${MAX_SHOWCASE}.`,
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Position',
      type: 'number',
      group: 'card',
      description: `1 is the large lead card at the top, then 2 to ${MAX_SHOWCASE}.`,
      hidden: ({document}) => !document?.showcase,
      validation: (Rule) => [
        requiredWhenShowcased('Pick a position for this project')(Rule),
        Rule.integer().min(1).max(MAX_SHOWCASE),
      ],
    },

    // --- Card ---
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'card',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'card',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'card',
      description: 'One or two sentences on the card: what it is and who it is for.',
      validation: (Rule) => [
        requiredWhenShowcased('Showcased projects need a summary')(Rule),
        Rule.max(200),
      ],
    },
    {
      name: 'role',
      title: 'My role',
      type: 'string',
      group: 'card',
      description: 'e.g. "Design and full-stack build", "Freelance front-end".',
      validation: (Rule) => Rule.max(60),
    },
    {
      name: 'image',
      title: 'Cover image',
      type: 'image',
      group: 'card',
      description:
        'A wide screenshot of the live site (about 2:1). The center stays visible on phones.',
      options: {hotspot: true},
      validation: requiredWhenShowcased('Showcased projects need a cover image'),
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe what the screenshot shows.',
          validation: requiredWhenShowcased('Describe the cover for screen readers'),
        },
      ],
    },
    {
      name: 'tags',
      title: 'Stack',
      type: 'array',
      of: [{type: 'string'}],
      group: 'card',
      options: {layout: 'tags'},
      description: 'Main technologies, most important first. The card shows the first four.',
      validation: (Rule) => Rule.max(10),
    },
    {
      name: 'place',
      title: 'Client or context',
      type: 'string',
      group: 'card',
      description: 'e.g. Freelance, Personal project, or the client name.',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      group: 'card',
      options: {dateFormat: 'YYYY-MM'},
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'card',
      options: {
        list: [
          {title: 'In progress', value: 'inProgress'},
          {title: 'Shipped', value: 'completed'},
        ],
        layout: 'radio',
      },
      initialValue: 'completed',
    },

    // --- Case study ---
    {
      name: 'body',
      title: 'Case study',
      type: 'blockContent',
      group: 'caseStudy',
      description: 'The goal, what you built, and what you would do next.',
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'caseStudy',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alt text', type: 'string'},
            {name: 'caption', title: 'Caption', type: 'string'},
          ],
        },
      ],
    },

    // --- Links ---
    {
      name: 'link',
      title: 'Live site URL',
      type: 'url',
      group: 'links',
    },
    {
      name: 'githubLink',
      title: 'GitHub repository URL',
      type: 'url',
      group: 'links',
    },
  ],
  preview: {
    select: {title: 'title', showcase: 'showcase', order: 'order', media: 'image'},
    prepare({title, showcase, order, media}) {
      return {
        title,
        subtitle: showcase ? `On portfolio · position ${order ?? '?'}` : 'Hidden',
        media,
      }
    },
  },
}
