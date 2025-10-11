'use client';
import { useState } from 'react';
import EventItemRow from './EventItemRow';

interface EventItemsTableProps {
    categorizedItems: {
        [category: string]: any[]
    }
}

export default function EventItemsTable({ categorizedItems }: EventItemsTableProps) {
    // State to track which categories are collapsed (default: all expanded)
    const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())

    // Toggle category collapsed state
    const toggleCategory = (category: string) => {
        setCollapsedCategories(prev => {
            const newSet = new Set(prev)
            if (newSet.has(category)) {
                newSet.delete(category)    // Expand category
            } else {
                newSet.add(category)       // Collapse category
            }
            return newSet
        })
    }

    // Calculate the claimed count for a category  >:) hehe
    const getClaimedCount = (items: any[]) => {
        return items.filter(item => item.claimed_by).length
    }

    return (
        <div className="space-y-6">
            {Object.entries(categorizedItems).map(([category, categoryItems]) => {
                const isCollapsed = collapsedCategories.has(category)
                const claimedCount = getClaimedCount(categoryItems)
                const totalCount = categoryItems.length
            
                return (
                    <div key={category} className="border rounded-lg overflow-hidden">
                        {/* Category Header */}
                        <button
                            onClick={() => toggleCategory(category)}
                            className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 flex items-center justify-between transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold text-gray-800">
                                    {isCollapsed ? '▶' : '▼'} {category}
                                </span>
                                <span className="text-sm text-gray-600">
                                    ({totalCount} {totalCount === 1 ? 'item' : 'items'}, {claimedCount} claimed)
                                </span>
                            </div>
                        </button>

                        {/* Category Table (hidden when collapsed) */}
                        {!isCollapsed && (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                                Item
                                            </th>
                                            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                                                Quantity
                                            </th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                                                Claimed By
                                            </th>
                                            <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryItems.map((item) => (
                                            <EventItemRow key={item.id} item={item} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )
        })}
        </div>
    )

}