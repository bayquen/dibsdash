'use client';
import { useState } from 'react';
import EventItemRow from './EventItemRow';

interface EventItemTableProps {
    categorizedItems: {
        [category: string]: any[]
    }
}

export default function EventItemTable({ categorizedItems }: EventItemTableProps) {
    // State to track which categories are collapsed (default: all expanded)
    const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())
}