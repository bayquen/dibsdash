'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
}
