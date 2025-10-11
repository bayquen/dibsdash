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

    const toggleCategory = (category: string) => {
        setCollapsedCategories(prev => {
            const newSet = new Set(prev)
            if (newSet.has(category)) {
                newSet.delete(category)
            } else {
                newSet.add(category)
            }
            return newSet
        })
    }

}