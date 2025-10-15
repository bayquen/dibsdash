'use client';
import { useState } from 'react';
import { useRouter } from  'next/navigation';
// DRY principle: Used a constant here to avoid duplication of categories
// between Item modals (i.e. adding and editing)
import { ITEM_CATEGORIES, normalizeCategoryName } from '@/constants/itemCategories';

interface AddItemModalProps {
    eventId: string
    isOpen: boolean
    onClose: () => void
}

export default function AddItemModal({ eventId, isOpen, onClose }: AddItemModalProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: '1',
        notes: '',
        claimed_by: ''
    })

    // State for custom item-category user input yayyy!
    const [showCustomInput, setShowCustomInput] = useState(false)
    const [customCategoryName, setCustomCategoryName] = useState('')

    // Handle item category dropdown changes
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        
        // When user chooses a custom category
        if (value === '__custom__') {
            setShowCustomInput(true)
            setFormData({...formData, category: ''})
        // When user chooses a preset category
        } else {
            setShowCustomInput(false)
            setCustomCategoryName('')
            setFormData({...formData, category: value})
        }
    }

    // Determine final category: use custom if provided, otherwise use dropdown!!
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        let finalCategory = formData.category 
        if (showCustomInput) {
            finalCategory = normalizeCategoryName(customCategoryName)
        }

        try {
            const response = await fetch('/api/items/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_id: eventId,
                    ...formData,
                    category: finalCategory,                 // Use the finalized category
                    quantity: parseInt(formData.quantity)    // Convert str input --> num since DB expects num
                })
            })

            const result = await response.json()

            if (result.success) {
                router.refresh()    // Refresh page to show new item
                onClose()           // Close the modal (i.e. pop-up window)
                setFormData({
                    name: '',
                    category: '',
                    quantity: '1',
                    notes: '',
                    claimed_by: ''
                })
                setShowCustomInput(false)
                setCustomCategoryName('')
            } else {
                alert('Error adding item: ' + result.error)
            }
        } catch (error : any) {
            alert('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    // Don't render anything if modal is closed
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-sm sm:max-w-md lg:max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 m-4">
                <h2 className="text-2xl font-bold mb-4">Add Item </h2>

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
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className= "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                            maxLength={40}
                        />
                        <p>
                            {formData.name.length}/40 characters
                        </p>
                    </div>

                    {/* Item Category */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Category *
                        </label>
                        <select
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
                    
                    {/* Person's Name (if claiming item) */}
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
                        maxLength={35}
                    />
                    <p>
                        {formData.claimed_by.length}/35
                    </p>
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
                            rows={2}
                            placeholder="Any notes or details for this item..."
                            maxLength={300}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {formData.notes.length}/300 characters
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Add Item button */}
                        <button
                            type="submit"
                            disabled={
                                loading || 
                                !formData.name || 
                                (!formData.category && !customCategoryName.trim())
                            }
                            className="w-full sm:flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Adding...' : 'Add Item'}
                        </button>
                        {/* Cancel button */}
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    name: '',
                                    category: '',
                                    quantity: '1',
                                    notes: '',
                                    claimed_by: ''
                                })
                                setShowCustomInput(false)
                                setCustomCategoryName('')
                                onClose()
                            }}
                            className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                           Cancel 
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}