'use client';
import { useState } from 'react';
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
}