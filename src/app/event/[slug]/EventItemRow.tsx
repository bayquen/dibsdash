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
                <td className="px-4 py-3 align-top max-w-xs">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="font-medium line-clamp-2 w-full max-w-[150px] break-words">{item.name}</span>
                        {/* Show icon button if item notes exist */}
                        {item.notes && (
                            <button
                                onClick={() => setNotesExpanded(!notesExpanded)}
                                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-2xl text-blue-600 hover:bg-blue-50 rounded-lg flex-shrink-0 active:scale-95 transition-all"
                                title="Click to view notes"
                            >
                                ⓘ
                            </button>
                        )}
                    </div>
                </td>
                
                {/* TEST - 11/17/25: Moving the Item Notes button for cleaner UI
                <td>
                    <div className="flex items-center gap-2 min-w-0 max-w-[12px]">
                        {item.notes && (
                            <button
                                onClick={() => setNotesExpanded(!notesExpanded)}
                                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-2xl text-blue-600 hover:bg-blue-50 rounded-lg flex-shrink-0 active:scale-95 transition-all"
                                title="Click to view notes"
                            >
                                ⓘ
                            </button>
                        )}
                    </div>
                </td> */}
                
                {/* Quantity Column */}
                <td className="px-4 py-3 text-center align-top">
                    {item.quantity > 1 ? `${item.quantity}` : '1'}
                </td>

                {/* "Claimed by" Column */}
                <td className="px-4 py-3 align-top">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                        <ClaimItemButton
                            itemId={item.id}
                            itemName={item.name}
                            currentClaimer={item.claimed_by}
                        />
                    </div>
                </td>

                {/* User Actions Column */}
                <td className="px-4 py-3 align-top">
                    {/* Desktop: horizontal layout */}
                    <div className="hidden sm:flex gap-2 justify-end">
                        <EditItemButton item={item} />
                        <DeleteItemButton
                            itemId={item.id}
                            itemName={item.name} 
                        />
                    </div>
                    {/* Mobile: stacked layout */}
                    <div className="flex sm:hidden flex-col gap-2">
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
