'use client';

import { useState } from 'react';
import ClaimItemButton from './ClaimItemButton';
import EditItemButton from './EditItemButton';
import DeleteItemButton from './DeleteItemButton';

interface EventItemRowProps {
    item: {
        id: string
        name: string
        category: string
        quantity: number
        notes: string | null
        claimed_by: string | null
    }
}

export default function EventItemRow({ item }: EventItemRowProps) {
    // State to track if notes are expanded for this item
    const [notesExpanded, setNotesExpanded] = useState(false)

    return (
        <>
            {/* Main items row */}
            <tr className="border-b hover:bg-gray-50">
                {/* Item Name Column */}
                <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        {/* Show icon button if item notes exist */}
                        {item.notes && (
                            <button
                                onClick={() => setNotesExpanded(!notesExpanded)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                                title="Click to view notes"
                            >
                                ⓘ
                            </button>
                        )}
                    </div>
                </td>

            </tr>
        </>
    )
}
