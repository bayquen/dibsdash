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
}