import { money, fmtDate } from './format'
import type { Client, Project } from './types'

/**
 * A plain-English starting point for a web project agreement, pre-filled from
 * the client and project. Felipe edits it before sending. This is a template,
 * not legal advice; have a lawyer review it once before relying on it.
 */
export function defaultContract(client: Client, project: Project, depositPercent = 50) {
  const price = project.price ? money(project.price) : '[PROJECT PRICE]'
  const deposit = project.price ? money(Math.round((project.price * depositPercent) / 100)) : `${depositPercent}% of the project price`
  const party = client.company ? `${client.name} on behalf of ${client.company}` : client.name
  const milestones = project.milestones.length
    ? project.milestones.map((m, i) => `   ${i + 1}. ${m.title}${m.dueDate ? ` (target ${fmtDate(m.dueDate)})` : ''}`).join('\n')
    : '   [List the main deliverables]'

  return {
    title: `${project.name} — Project Agreement`,
    body: `This agreement is between Felipe Cantu Jr ("Developer") and ${party} ("Client") for the project "${project.name}".

1. SCOPE OF WORK
The Developer will deliver the following:
${milestones}
${project.summary ? `\nProject summary: ${project.summary}\n` : ''}
Anything not listed above is out of scope. Out-of-scope requests will be quoted separately and only started after the Client approves the quote in writing (a message in the client portal counts).

2. TIMELINE
Work starts ${project.startDate ? `on ${fmtDate(project.startDate)}` : 'when the deposit is received'}${project.dueDate ? `, with a target launch of ${fmtDate(project.dueDate)}` : ''}. The timeline depends on the Client providing content, feedback and approvals promptly. Delays on the Client's side may move the launch date.

3. PRICE AND PAYMENT
The total project price is ${price}.
- Deposit: ${deposit}, due before work begins. The deposit is non-refundable once work has started.
- Balance: due at launch, before the final files or site ownership are transferred.
Invoices are sent and paid through the client portal. Invoices unpaid 14 days after their due date may pause work until they are settled.

4. REVISIONS
The price includes up to two rounds of revisions per deliverable. Approving a deliverable in the client portal confirms that stage is complete. Further changes after approval are billed at the Developer's hourly rate.

5. CLIENT RESPONSIBILITIES
The Client will provide logos, images, text, account access and other materials needed for the project, and confirms they have the right to use everything they provide.

6. OWNERSHIP
Once paid in full, the Client owns the final website design, content and code created for this project. The Developer may reuse general-purpose code, tools and techniques, and may show the finished work in their portfolio unless the Client asks otherwise in writing.

7. HOSTING, DOMAINS AND THIRD-PARTY SERVICES
Fees for hosting, domains, plugins, fonts or other third-party services are paid by the Client unless stated otherwise above. The Developer is not responsible for outages or changes made by third-party providers.

8. WARRANTY AND SUPPORT
The Developer will fix bugs reported within 30 days of launch at no charge. Ongoing maintenance, updates and new features are not included unless agreed separately.

9. CANCELLATION
Either party may end this agreement with written notice. The Client pays for work completed up to that date. The Developer will hand over all completed work that has been paid for.

10. LIMITATION OF LIABILITY
The Developer's total liability under this agreement is limited to the amount the Client has paid. Neither party is liable for indirect or consequential losses.

11. ENTIRE AGREEMENT
This is the full agreement between the parties. Changes must be agreed in writing. Typing your name and clicking "Sign" in the client portal is your electronic signature and has the same effect as a handwritten one.`,
  }
}
