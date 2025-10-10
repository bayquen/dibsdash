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

// Helper function: to normalize category names to Title Case
// e.g: user types "goodie bags" -> "Goodie Bags"
export function normalizeCategoryName(category: string): string {
    return category
        .trim()             // Remove leading or trailing spaces
        .toLowerCase()      // Convert to lowercase first,
        .split(' ')         // then split into words
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)  // Capitalize first letter for each word
        )
        .join(' ')          // Join back with spaces
}