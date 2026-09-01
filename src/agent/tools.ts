import { searchFaqs } from '@/data/faqs'
import { templeDirectionsUrl, templeLocation, templeMapsUrl } from '@/data/location'

export type AgentToolDefinition = {
  type: 'function'
  function: {
    name: string
    description: string
    parameters: {
      type: 'object'
      properties: Record<string, { type: string; description: string; enum?: string[] }>
      required: string[]
    }
  }
}

export const AGENT_TOOLS: AgentToolDefinition[] = [
  {
    type: 'function',
    function: {
      name: 'get_temple_timings',
      description: 'Get official temple darshan and aarti timings.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_temple_services',
      description: 'Get list of temple rituals, pujas, and community services.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_location',
      description: 'Get temple address, Google Maps link, and directions URL.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_80g_info',
      description: 'Get information about 80G tax exemption for temple donations.',
      parameters: { type: 'object', properties: {}, required: [] },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_faqs',
      description: 'Search curated temple FAQs by keywords or topic.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search terms, e.g. "puja booking", "timings", "80G"' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_contact_guidance',
      description: 'Get guidance on how to contact the temple for a specific purpose.',
      parameters: {
        type: 'object',
        properties: {
          intent: {
            type: 'string',
            description: 'What the visitor needs help with',
            enum: ['puja', 'donation', '80g', 'event', 'general', 'feedback'],
          },
        },
        required: ['intent'],
      },
    },
  },
]

const CONTACT_GUIDANCE: Record<string, { subject: string; path: string; note: string }> = {
  puja: {
    subject: 'Puja / Ceremony Booking',
    path: '/contact',
    note: 'Use the contact form with subject "Puja / Ceremony Booking" to schedule Rudrabhishek, vivah, mundan, or other ceremonies.',
  },
  donation: {
    subject: 'Donation / 80G Enquiry',
    path: '/contact',
    note: 'Use the contact form with subject "Donation / 80G Enquiry" for donation questions.',
  },
  '80g': {
    subject: 'Donation / 80G Enquiry',
    path: '/tax-benefit',
    note: 'Read the 80G guide at /tax-benefit and contact the temple office for an official receipt.',
  },
  event: {
    subject: 'Upcoming Events',
    path: '/contact',
    note: 'Use the contact form with subject "Upcoming Events" for festival or event enquiries.',
  },
  general: {
    subject: 'General Enquiry',
    path: '/contact',
    note: 'Use the contact form with subject "General Enquiry" for other questions.',
  },
  feedback: {
    subject: 'Feedback / Suggestions',
    path: '/contact',
    note: 'Use the contact form with subject "Feedback / Suggestions".',
  },
}

export const TOOL_LABELS: Record<string, string> = {
  get_temple_timings: 'Checking temple timings',
  get_temple_services: 'Looking up services & rituals',
  get_location: 'Finding location & directions',
  get_80g_info: 'Checking 80G tax benefit info',
  search_faqs: 'Searching temple FAQs',
  get_contact_guidance: 'Getting contact guidance',
}

export function executeAgentTool(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case 'get_temple_timings':
      return JSON.stringify({
        morning: '5:00 AM – 12:00 PM (Darshan & Aarti)',
        evening: '4:00 PM – 9:00 PM (Darshan & Aarti)',
        specialPuja: 'By appointment — contact temple via /contact',
      })

    case 'get_temple_services':
      return JSON.stringify({
        daily: ['Morning aarti', 'Evening aarti'],
        special: ['Rudrabhishek', 'Maha Shivratri (all-night jagran)', 'Satyanarayana Katha (monthly)'],
        onRequest: ['Griha pravesh', 'Vivah', 'Mundan', 'Other samskaras'],
        community: ['Weekly bhajans and kirtans'],
      })

    case 'get_location':
      return JSON.stringify({
        name: templeLocation.label,
        address: templeLocation.address,
        plusCode: templeLocation.plusCode,
        mapsUrl: templeMapsUrl,
        directionsUrl: templeDirectionsUrl,
      })

    case 'get_80g_info':
      return JSON.stringify({
        eligible: true,
        section: '80G of the Income Tax Act, 1961',
        summary:
          'The temple is a registered charitable trust. Donations may qualify for income tax deduction. Request an official 80G receipt from the temple office.',
        detailsPage: '/tax-benefit',
        contactPage: '/contact',
      })

    case 'search_faqs': {
      const query = typeof args.query === 'string' ? args.query : ''
      const results = searchFaqs(query)
      return JSON.stringify({
        query,
        results: results.map((f) => ({ question: f.question, answer: f.answer })),
      })
    }

    case 'get_contact_guidance': {
      const intent = typeof args.intent === 'string' ? args.intent : 'general'
      const guidance = CONTACT_GUIDANCE[intent] ?? CONTACT_GUIDANCE.general
      return JSON.stringify(guidance)
    }

    default:
      return JSON.stringify({ error: `Unknown tool: ${name}` })
  }
}
