'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// DRY principle: Used a constant here to avoid duplication of categories
// between Item modals (i.e. adding and editing)
import { ITEM_CATEGORIES } from '@/constants/itemCategories';

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
        quantity: item.quantity,
        notes: item.notes || '',
        claimed_by: item.claimed_by || ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Continue buildin function...
    }

}
