export const ITEM_CATEGORIES = [
    'Food',
    'Drinks',
    'Supplies',
    'Decorations',
    'Equipment',
    'Electronics',
    'Services'
] as const;     // This line makes it read-only to prevent accidental modifications

// TS type helper that creates a union type from the array
// i.e result:  'Food' | 'Drinks' | etc.
export type ItemCategory = typeof ITEM_CATEGORIES[number];

export function normalizeCategoryName(category: string): string {
    return category
}