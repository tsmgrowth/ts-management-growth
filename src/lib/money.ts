// Money helpers. All amounts are integer cents so totals never drift.

export type Item = {
  id: string;
  description: string;
  unit_cents: number;
  qty: number;
  optional: boolean; // customer chooses yes or no
  recurring: boolean; // billed every month
  position?: number;
};

export const usd = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

export const lineTotal = (i: Pick<Item, "unit_cents" | "qty">) => i.unit_cents * i.qty;

/** Totals for the items the customer has kept: required items plus optional items they said yes to. */
export function totals(items: Item[], yes: ReadonlySet<string>) {
  const on = items.filter((i) => !i.optional || yes.has(i.id));
  const sum = (list: Item[]) => list.reduce((n, i) => n + lineTotal(i), 0);
  const oneTime = sum(on.filter((i) => !i.recurring));
  const monthly = sum(on.filter((i) => i.recurring));
  return { on, oneTime, monthly, dueToday: oneTime + monthly };
}

/** "12.50" or "$12.50" to 1250. Returns null when it is not a valid non-negative amount. */
export function toCents(input: string): number | null {
  const s = input.replace(/[$,\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(s)) return null;
  return Math.round(parseFloat(s) * 100);
}
