// Dated rules and fee data shown on /rules and /international.
// Every entry names its source. Re-verify before launch and whenever an agency updates its page.

export const rulesVerified = "September 21, 2026";

export type Source = { label: string; href: string };

export const src = {
  fees: { label: "Florida Division of Corporations: LLC fees", href: "https://dos.fl.gov/sunbiz/forms/fees/llc-fees/" },
  annual: { label: "Florida Division of Corporations: annual report", href: "https://dos.fl.gov/sunbiz/manage-business/efile/annual-report/" },
  boi: { label: "FinCEN: Beneficial Ownership Information", href: "https://www.fincen.gov/boi" },
  ss4: { label: "IRS: Instructions for Form SS-4", href: "https://www.irs.gov/instructions/iss4" },
  ein: { label: "IRS: Get an employer identification number", href: "https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number" },
  f5472: { label: "IRS: Instructions for Form 5472", href: "https://www.irs.gov/instructions/i5472" },
  sb264: { label: "Akerman LLP: Updates on Florida SB 264", href: "https://www.akerman.com/en/perspectives/updates-on-sb-264-florida-law.html" },
  shen: { label: "National Agricultural Law Center: Eleventh Circuit decision (Nov. 4, 2025)", href: "https://nationalaglawcenter.org/eleventh-circuit-upholds-floridas-foreign-ownership-law/" },
  ftsa: { label: "Florida Statutes 501.059 (Telephone Solicitation Act)", href: "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0500-0599/0501/Sections/0501.059.html" },
  privacy: { label: "MultiState: state privacy laws taking effect in 2026", href: "https://www.multistate.us/insider/2026/2/4/all-of-the-comprehensive-privacy-laws-that-take-effect-in-2026" },
  ada: { label: "Healthcare Law Insights: ADA Title II deadlines extended", href: "https://www.healthcarelawinsights.com/2026/05/ada-title-ii-web-accessibility-compliance-deadlines-extended-by-one-year/" },
  bar: { label: "The Florida Bar: nonlawyer business arrangements", href: "https://www.floridabar.org/ethics/etarticles/ethics-alert-business-arrangements-with-nonlawyers/" },
};

export type Topic = "Federal" | "Florida" | "Privacy and web";

export const timeline: { date: string; topic: Topic; title: string; body: string; source: Source }[] = [
  { date: "Jan. 1, 2021", topic: "Federal", title: "Corporate Transparency Act enacted", body: "Congress created a beneficial ownership reporting system for certain companies through the National Defense Authorization Act.", source: src.boi },
  { date: "Sept. 30, 2022", topic: "Federal", title: "FinCEN publishes the BOI reporting rule", body: "Implementing regulations were published, setting the rules for who must report and what.", source: src.boi },
  { date: "2023", topic: "Florida", title: "Florida SB 264 enacted", body: "Restricts certain real property purchases by people domiciled in designated \"foreign countries of concern\" (China, Russia, Iran, North Korea, Cuba, the Maduro regime of Venezuela and Syria).", source: src.sb264 },
  { date: "Jan. 1, 2024", topic: "Federal", title: "BOI reporting takes effect", body: "Reporting obligations began, followed by court injunctions in late 2024 and early 2025 that paused enforcement.", source: src.boi },
  { date: "Jan. 17 and 31, 2024", topic: "Florida", title: "SB 264 affidavits and registration", body: "Buyer affidavit forms took effect January 17, 2024, and the registration deadline for existing covered owners was January 31, 2024.", source: src.sb264 },
  { date: "July 1, 2024", topic: "Privacy and web", title: "Florida Digital Bill of Rights effective", body: "Applies only to very large technology-type companies (over $1 billion in global revenue plus other tests), so it does not apply to a small service business. Other Florida privacy duties, including breach notice under Fla. Stat. 501.171, still do.", source: src.privacy },
  { date: "Mar. 2 and 26, 2025", topic: "Federal", title: "BOI enforcement narrowed", body: "On March 2, 2025 Treasury suspended enforcement against U.S. citizens and domestic companies. An interim final rule followed on March 26, 2025 limiting reporting to foreign reporting companies.", source: src.boi },
  { date: "Nov. 4, 2025", topic: "Florida", title: "Eleventh Circuit rules in Shen v. Simpson", body: "In a 2 to 1 decision at the preliminary injunction stage, the court held the plaintiffs lacked standing on the purchase restriction and were unlikely to succeed on their constitutional and preemption claims. The case may continue.", source: src.shen },
  { date: "Jan. 1, 2026", topic: "Privacy and web", title: "New state privacy laws in Indiana, Kentucky and Rhode Island", body: "More state comprehensive privacy laws took effect. Applicability depends on the volume of consumer data a business handles.", source: src.privacy },
  { date: "Aug. 14, 2026", topic: "Federal", title: "BOI final rule: U.S. companies and U.S. persons exempt", body: "FinCEN's final rule, effective on Federal Register publication, permanently exempts U.S. companies and U.S. persons from BOI reporting. Foreign reporting companies must still report for non-U.S. beneficial owners and company applicants.", source: src.boi },
  { date: "Sept. 25, 2026", topic: "Florida", title: "Florida annual-report dissolution cutoff (2026)", body: "A Florida LLC that has not filed its annual report by the third Friday of September is administratively dissolved at the close of business on the fourth Friday. For 2026, credit card payments are accepted through 5:00 p.m. Eastern on September 25.", source: src.annual },
  { date: "Jan. 1 to May 1, 2027", topic: "Florida", title: "2027 annual report window", body: "Florida LLCs file between January 1 and May 1. A report received after May 1 adds a $400 late fee.", source: src.annual },
  { date: "Apr. 26, 2027", topic: "Privacy and web", title: "ADA Title II web rule (large public entities)", body: "The DOJ deadline for state and local governments serving 50,000 or more people to meet WCAG 2.1 AA (April 26, 2028 for smaller ones). This rule covers public entities, not private businesses, but shows the direction of accessibility expectations.", source: src.ada },
];

export const fees: { item: string; amount: string; note?: string }[] = [
  { item: "Florida LLC articles of organization", amount: "$125", note: "$100 filing plus $25 registered agent designation" },
  { item: "LLC annual report (filed Jan. 1 to May 1)", amount: "$138.75" },
  { item: "LLC annual report received after May 1", amount: "$538.75", note: "includes a $400 late fee" },
  { item: "Amended annual report", amount: "$50" },
  { item: "Change of registered agent", amount: "$25" },
  { item: "Reinstatement after administrative dissolution", amount: "$100", note: "plus annual report fees for each year missed" },
  { item: "Articles of dissolution", amount: "$25" },
  { item: "Certificate of status", amount: "$5" },
  { item: "Certified copy", amount: "$30" },
  { item: "Name reservation", amount: "$25" },
];
