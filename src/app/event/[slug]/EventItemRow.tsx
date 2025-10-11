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
                
                {/* Quantity Column */}
                <td className="px-4 py-3 text-center">
                    {item.quantity > 1 ? `${item.quantity}` : '1'}
                </td>

                {/* "Claimed by" Column */}
                <td className="px-4 py-3">
                    <ClaimItemButton
                        itemId={item.id}
                        itemName={item.name}
                        currentClaimer={item.claimed_by}
                    />
                </td>

                {/* User Actions Column */}
                <td>
                    <div>
                        <EditItemButton item={item} />
                        <DeleteItemButton
                            itemId={item.id}
                            itemName={item.name} 
                        />
                    </div>
                </td>
            </tr>
        
            {/* Expanded item notes row (appears only when notesExpanded=true) */}
            {notesExpanded && item.notes && (
                <tr className="bg-blue-50">
                    <td colSpan={4} className="px-4 py-3">
                        <div className="flex items-start gap-2">
                            <span className="text-gray-600 font-semibold">Notes: </span>
                            <span className="text-gray-700">{item.notes}</span>
                        </div>
                    </td>
                </tr>
            )}

        </>
    )
}
