'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface EditEventModalProps {
    event: any
    isOpen: boolean
    onClose: () => void
}

export default function EditEventModal({ event, isOpen, onClose }: EditEventModalProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState( {
        name: event.name || '',
        description: event.description || '',
        date: event.date ? event.date.split('T')[0] : '',
        time: event.time || '',
        location: event.location || ''
    })

    // TEST: 10/16/2025 - refresh state if user cancels editing changes
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function: restores scrolling to main page to prevent it 
        // from staying locked if modal closes unexpectedly
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: event.name || '',
                description: event.description || '',
                date: event.date ? event.date.split('T')[0] : '',
                time: event.time || '',
                location: event.location || ''
            })
        }
    }, [isOpen, event])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch(`/api/events/${event.url_slug}`, {
                method: 'PATCH',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify(formData)
            })

            const result = await response.json()

            if (result.success) {
                router.refresh()
                onClose()
            } else {
                alert('Error updating event: ' + result.error)
            }
        } catch (error: any) {
            alert('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-2xl font-bold mb-4">Edit Event Details</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Event Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label>
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date
                        </label>
                        <input
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Time
                        </label>
                        <input
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Location
                        </label>
                        <input
                            name="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading || !(formData.name)}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
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