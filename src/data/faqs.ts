export type FaqItem = {
  id: string
  question: string
  answer: string
  tags: string[]
}

export const TEMPLE_FAQS: FaqItem[] = [
  {
    id: 'timings',
    question: 'What are the temple timings?',
    answer:
      'Morning Darshan and Aarti: 5:00 AM – 12:00 PM. Evening Darshan and Aarti: 4:00 PM – 9:00 PM. Special puja is by appointment — contact the temple.',
    tags: ['timings', 'hours', 'darshan', 'aarti', 'open'],
  },
  {
    id: '80g',
    question: 'How do I get 80G tax benefit on donations?',
    answer:
      'Donations to Beteswar Jhaareswar Shiva Mandir may qualify for income tax deduction under Section 80G. Request an official 80G receipt from the temple office when you donate. Visit /tax-benefit for details or /contact for donation enquiries.',
    tags: ['80g', 'tax', 'donation', 'receipt', 'exemption'],
  },
  {
    id: 'puja-booking',
    question: 'How do I book a special puja?',
    answer:
      'Special pujas (Rudrabhishek, Griha pravesh, vivah, mundan, and other samskaras) are performed on request. Contact the temple via the Contact page with subject "Puja / Ceremony Booking" to schedule.',
    tags: ['puja', 'booking', 'ceremony', 'rudrabhishek', 'wedding'],
  },
  {
    id: 'location',
    question: 'Where is the temple located?',
    answer:
      'Beteswar Jhaareswar Shiva Mandir is at Beteswar Temple, Balakbar - Beteswar Rd, Sadi, West Bengal — PIN 721446. Google Maps Plus Code: PG26 G4R.',
    tags: ['location', 'address', 'directions', 'map', 'where'],
  },
  {
    id: 'shivratri',
    question: 'How is Maha Shivratri celebrated?',
    answer:
      'Maha Shivratri is celebrated with all-night jagran, special puja, and prasad distribution. Check with the temple office closer to the festival for the exact schedule.',
    tags: ['shivratri', 'festival', 'jagran', 'celebration'],
  },
  {
    id: 'services',
    question: 'What services does the temple offer?',
    answer:
      'Daily morning and evening aarti, Rudrabhishek, Maha Shivratri celebrations, monthly Satyanarayana Katha, special pujas on request, and weekly community bhajans and kirtans.',
    tags: ['services', 'rituals', 'aarti', 'bhajan', 'kirtan'],
  },
]

export function searchFaqs(query: string, limit = 3): FaqItem[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return TEMPLE_FAQS.slice(0, limit)

  const scored = TEMPLE_FAQS.map((faq) => {
    const haystack = `${faq.question} ${faq.answer} ${faq.tags.join(' ')}`.toLowerCase()
    const score = terms.reduce((sum, term) => (haystack.includes(term) ? sum + 1 : sum), 0)
    return { faq, score }
  })

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.faq)
}
