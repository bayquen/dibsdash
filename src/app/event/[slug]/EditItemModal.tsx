'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// DRY principle: Used a constant here to avoid duplication of categories
// between Item modals (i.e. adding and editing)
import { ITEM_CATEGORIES, normalizeCategoryName } from '@/constants/itemCategories';

interface EditItemModalProps {
    item: {
        id: string
        name: string
        category: string
        quantity: number
        notes: string | null
        claimed_by: string | null
    }
    isOpen: boolean
    onClose: () => void
}

export default function EditItemModal({ item, isOpen, onClose }: EditItemModalProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: item.name,
        category: item.category,
        quantity: item.quantity.toString(),
        notes: item.notes || '',
        claimed_by: item.claimed_by || ''
    })

    // State custom item category input, yuhhh!
    const [showCustomInput, setShowCustomInput] = useState(false)
    const [customCategoryName, setCustomCategoryName] = useState('')

    // Check if the item's category is custom (i.e. not in preset list!)
    useEffect(() => {
        if (!ITEM_CATEGORIES.includes(item.category as any)) {
            // This is a custom category
            setShowCustomInput(true)
            setCustomCategoryName(item.category)
            setFormData(prev => ({...prev, category: ''}))
        }
    }, [item.category])

    // Handle item category dropdown changes
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        
        if (value === '__custom__') {
            // User selected a preset category
            setShowCustomInput(true)
            setCustomCategoryName('')
            setFormData({...formData, category: value})
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Determine final category: use custom if provided, otherwise use dropdown!
        let finalCategory = formData.category 
        if (showCustomInput) {
            finalCategory = normalizeCategoryName(customCategoryName)
        }

        try {
            const response = await fetch(`/api/items/${item.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    ...formData,
                    category: finalCategory,                 // Use normalized category
                    quantity: parseInt(formData.quantity)    // Convert str input --> num since DB expects num
                })
            })

            const result = await response.json()

            if (result.success) {
                router.refresh()
                onClose()
            } else {
                alert('Error updating item: ' + result.error)
            }
        } catch (error: any) {
            alert('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    // Don't render anything if modal is closed
    if (!isOpen) return null
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-2xl font-bold mb-4">Edit Item</h2>

                <form onSubmit={handleSubmit}>
                    {/* Item Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Item Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Item Category */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Category *
                        </label>
                        <select
                            required
                            value={showCustomInput ? '__custom__' : formData.category}
                            onChange={handleCategoryChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select item category...</option>
                            {ITEM_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                                <option value="__custom__">+ Add a custom category</option>
                        </select>
                    </div>

                    {/* Custom Category Input (appears when custom is selected) */}
                    {showCustomInput && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Custom Category Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={customCategoryName}
                                onChange={(e) => setCustomCategoryName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g. Gifts"
                                maxLength={40}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {customCategoryName.length}/40 characters
                            </p>
                        </div>
                    )}

                    {/* Item Quantity */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Quantity
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={formData.quantity}
                            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Person's Name (if claiming item hehe) */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Your Name (if claiming item)
                        </label>
                        <input
                            type="text"
                            value={formData.claimed_by}
                            onChange={(e) => setFormData({...formData, claimed_by: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="(Optional)"
                        />
                    </div>
                    
                    {/* Item Notes */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Notes
                        </label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                            placeholder="Any specific details or notes for this item..."
                            maxLength={300}
                        />
                        <p>
                            {formData.notes.length}/300 characters
                        </p>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex gap-3">
                        {/* Save Changes button */}
                        <button
                            type="submit"
                            disabled={loading || 
                                !formData.name || 
                                !formData.category && !customCategoryName.trim()}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            { loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        {/* Cancel button */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}
