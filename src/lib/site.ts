// Central source of truth for company facts and service content.
// NOTE: prices are DRAFT proposals awaiting owner approval; legal wording awaits attorney review.

export const company = {
  name: "TS Management Growth LLC",
  short: "TS Management Growth",
  tagline: "Business Administration That Moves With Your Growth",
  serviceArea: "Serving clients in Florida. Services are provided digitally by phone, video and email.",
  scope:
    "TS Management Growth LLC provides business administration and administrative support services. We do not provide legal advice, tax advice, accounting advice, or legal representation.",
  siteUrl: "https://tsmanagementgrowth.com",
  phone: null as string | null, // add when the new business number is ready
};

export type GroupId = "formation" | "organization" | "ongoing" | "agent";

export const groups: { id: GroupId; title: string; blurb: string }[] = [
  { id: "formation", title: "Formation and Filings", blurb: "Start a business and keep your filings on track." },
  { id: "organization", title: "Business Organization", blurb: "Records, files and research kept in order." },
  { id: "ongoing", title: "Ongoing Administration", blurb: "Steady support as your business grows." },
  { id: "agent", title: "Registered Agent Services", blurb: "Florida registered agent, opening soon." },
];

export type Service = {
  slug: string;
  title: string;
  group: GroupId;
  summary: string;
  audience: string;
  includes: string[];
  notIncluded?: string[];
  govFee?: string;
  from: number | null;
  unit?: string;
  cta: string;
  comingSoon?: boolean;
};

export const services: Service[] = [
  {
    slug: "business-formation",
    title: "Business Formation Assistance",
    group: "formation",
    summary: "Administrative help getting a new business established, from paperwork to organized records.",
    audience: "Individuals and entrepreneurs establishing a new business.",
    includes: [
      "Business formation assistance",
      "LLC filing assistance",
      "State filing assistance",
      "Business registration assistance",
      "Filing documentation",
      "Administrative filing coordination",
      "Formation document organization",
    ],
    govFee: "State filing fees are paid to the state and are separate from our service fee.",
    from: 149,
    cta: "Discuss your formation",
  },
  {
    slug: "llc-filing",
    title: "LLC Filing Assistance",
    group: "formation",
    summary: "Administrative support with the LLC filing process.",
    audience: "Owners ready to file an LLC who want help with the administrative steps.",
    includes: [
      "Navigating applicable state filing systems",
      "Locating appropriate forms",
      "Entering client-provided information",
      "Administrative filing assistance",
      "Filing-status tracking",
      "Confirmation organization",
      "Business formation document organization",
    ],
    govFee: "The Florida LLC filing fee is $125 (filing plus registered agent designation), paid to the state.",
    from: 99,
    cta: "Request LLC filing help",
  },
  {
    slug: "ein-assistance",
    title: "EIN Assistance",
    group: "formation",
    summary: "Administrative assistance with the EIN application process.",
    audience: "Owners who need an EIN and want help with the application steps.",
    includes: [
      "Navigating the IRS EIN application",
      "Assisting with the application process",
      "Entering client-provided information",
      "Organizing EIN documentation",
      "Maintaining the EIN record within the client's business file",
    ],
    notIncluded: ["Third-party help with an EIN application requires your proper authorization."],
    govFee: "The IRS issues EINs, and the IRS online application is free. Our fee is for administrative assistance only.",
    from: 59,
    cta: "Request EIN assistance",
  },
  {
    slug: "dba-fictitious-name",
    title: "DBA and Fictitious Name Assistance",
    group: "formation",
    summary: "Administrative support for clients filing a DBA or fictitious name.",
    audience: "Owners who operate under a name different from their legal business name.",
    includes: [
      "Locating the appropriate filing",
      "Navigating the applicable filing system",
      "Entering client-provided information",
      "Administrative filing assistance",
      "Filing-status tracking",
      "Document organization",
    ],
    govFee: "The Florida fictitious name registration fee is $50, paid to the state. Other third-party costs may apply.",
    from: 69,
    cta: "Request filing help",
  },
  {
    slug: "annual-reports",
    title: "Annual Reports and Recurring Filings",
    group: "formation",
    summary: "Administrative assistance with annual reports and other recurring business filings.",
    audience: "Existing owners who want deadlines tracked and filings handled on time.",
    includes: [
      "Annual report filing assistance",
      "Filing deadline tracking",
      "Administrative filing support",
      "Entering client-provided information",
      "Confirmation organization",
      "Filing record organization",
    ],
    govFee: "The Florida LLC annual report fee is $138.75, paid to the state. Late filings cost more.",
    from: 79,
    cta: "Discuss a filing",
  },
  {
    slug: "business-registration",
    title: "Business Registration Assistance",
    group: "formation",
    summary: "Administrative assistance with applicable state, county and local business registrations.",
    audience: "Owners who need help coordinating registrations and receipts.",
    includes: [
      "State registration assistance",
      "County registration assistance",
      "Local registration assistance",
      "Fictitious-name registration assistance",
      "Business tax receipt administrative assistance",
      "Application organization",
      "Filing coordination",
    ],
    govFee: "Government and local fees vary and are paid separately.",
    from: 79,
    cta: "Request registration help",
  },
  {
    slug: "document-organization",
    title: "Business Document Organization",
    group: "organization",
    summary: "Professional organization of business records and administrative documentation.",
    audience: "Owners whose business paperwork is scattered or hard to find.",
    includes: [
      "Formation documents",
      "EIN documentation",
      "State filings",
      "Certificates",
      "Registration documents",
      "Government correspondence",
      "Filing confirmations",
      "Renewal documentation",
      "Business records",
    ],
    from: 149,
    cta: "Organize business records",
  },
  {
    slug: "administrative-organization",
    title: "Business Administrative Organization",
    group: "organization",
    summary: "A structured service for owners who need their business information, records and responsibilities organized.",
    audience: "Owners who want one clear system for records, calendar and files.",
    includes: [
      "Business record organization",
      "Administrative file organization",
      "Filing calendar creation",
      "Deadline tracking",
      "Document management",
      "Administrative task organization",
      "Business information organization",
      "Record maintenance",
    ],
    from: 199,
    cta: "Plan an organization setup",
  },
  {
    slug: "administrative-research",
    title: "Administrative Research",
    group: "organization",
    summary: "Help locating publicly available business information and resources from appropriate government sources.",
    audience: "Owners who need the right form, portal or public requirement found quickly.",
    includes: [
      "Locating government forms",
      "Locating filing portals",
      "Finding publicly available requirements",
      "Finding government contact information",
      "Locating filing information",
      "Organizing administrative resources",
    ],
    notIncluded: ["We provide administrative research and support, not legal or professional advice."],
    from: 49,
    cta: "Request research support",
  },
  {
    slug: "administrative-support",
    title: "Business Administrative Support",
    group: "ongoing",
    summary: "Administrative support for established businesses and entrepreneurs.",
    audience: "Established owners who want an extra pair of hands on administration.",
    includes: [
      "Administrative task coordination",
      "Filing assistance",
      "Document management",
      "Administrative research",
      "Government website navigation",
      "Appointment scheduling",
      "Administrative correspondence",
      "Deadline tracking",
      "Business record organization",
      "General administrative support",
    ],
    from: 55,
    unit: "per hour",
    cta: "Discuss support needs",
  },
  {
    slug: "ongoing-support",
    title: "Ongoing Administrative Services",
    group: "ongoing",
    summary: "Continued administrative support based on your individual business needs.",
    audience: "Owners who want steady support instead of one-off help.",
    includes: [
      "Administrative filing assistance",
      "Document organization",
      "Filing and deadline tracking",
      "Administrative research",
      "Business record organization",
      "Government website navigation",
      "Administrative correspondence",
      "Registered agent services",
      "General business administration",
    ],
    from: 149,
    unit: "per month",
    cta: "Discuss ongoing support",
  },
  {
    slug: "registered-agent",
    title: "Registered Agent Services",
    group: "agent",
    summary: "Registered agent services for Florida businesses that need a registered agent. Opening soon.",
    audience: "Florida businesses that need a registered agent.",
    includes: [
      "Registered agent representation",
      "Receipt of service of process",
      "Receipt of official business correspondence",
      "Document notification",
      "Document forwarding in accordance with the service agreement",
      "Registered-agent record maintenance",
    ],
    notIncluded: ["Availability, eligibility and terms are confirmed before any appointment."],
    from: null,
    cta: "Check availability",
    comingSoon: true,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const priceLabel = (s: Service) =>
  s.from === null ? "Pricing coming soon" : `From $${s.from}${s.unit ? ` ${s.unit}` : ""}`;

export const paths: { id: string; label: string; hint: string; icon: "spark" | "building" | "shield" | "repeat"; slugs: string[] }[] = [
  { id: "starting", label: "I'm starting a business", hint: "Formation, LLC, EIN and more", icon: "spark", slugs: ["business-formation", "llc-filing", "ein-assistance"] },
  { id: "running", label: "I already run a business", hint: "Filings, registrations and records", icon: "building", slugs: ["annual-reports", "business-registration", "document-organization"] },
  { id: "agent", label: "I need a registered agent", hint: "Florida registered agent", icon: "shield", slugs: ["registered-agent"] },
  { id: "support", label: "I want ongoing help", hint: "Steady administrative support", icon: "repeat", slugs: ["ongoing-support", "administrative-support", "administrative-organization"] },
];

export const processSteps = [
  { title: "Understand your need", text: "Tell us what you are trying to get done." },
  { title: "Confirm the scope", text: "We agree exactly what we will and will not do." },
  { title: "You authorize", text: "Nothing starts until you approve the administrative help." },
  { title: "We complete and organize", text: "We handle the tasks and keep your records tidy." },
  { title: "Maintain as agreed", text: "Ongoing support only if you choose it." },
];

export const faqs = [
  {
    q: "Are you a law firm or accounting firm?",
    a: "No. We provide business administration and administrative support. We do not give legal, tax or accounting advice, and we do not provide legal representation. When you need that, you should consult a qualified professional.",
  },
  {
    q: "What do your prices include?",
    a: "Our prices are for our administrative service only. Government, publication, shipping, rush and other third-party fees are separate and are always shown separately.",
  },
  {
    q: "Do you guarantee approval or processing times?",
    a: "No. Government agencies decide approvals and control their own processing times. We can assist with the administrative steps, but we cannot promise an outcome.",
  },
  {
    q: "Can I send you my Social Security number or ID through the website?",
    a: "No. Please do not submit Social Security numbers, taxpayer IDs, passwords, payment-card details, identity documents or confidential legal or tax information through this website or by email.",
  },
  {
    q: "Who makes the business decisions?",
    a: "You do. We assist with the administrative process, and you remain responsible for your decisions and for the accuracy of the information you provide.",
  },
];
