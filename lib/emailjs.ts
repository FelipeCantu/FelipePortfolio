// EmailJS IDs are public by design (they ship in the browser bundle), so the
// fallbacks below are safe to commit. Env vars still override them when set,
// but a missing Vercel env setting can no longer break the forms.

export const CONTACT_EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_qergbjn',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_purd9i6',
  replyTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_REPLY_ID || 'template_u6wlz5m',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'sfy94T_0JRB3qPReX',
}

export const INTAKE_EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_INTAKE_EMAILJS_SERVICE_ID || 'service_qergbjn',
  templateId: process.env.NEXT_PUBLIC_INTAKE_EMAILJS_TEMPLATE_ID || 'template_purd9i6',
  publicKey: process.env.NEXT_PUBLIC_INTAKE_EMAILJS_PUBLIC_KEY || 'sfy94T_0JRB3qPReX',
}
