'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteItemModalProps {
    itemId: string
    itemName: string
    isOpen: boolean
    onClose: () => void
}

export default function DeleteItemModal({ itemId, itemName, isOpen, onClose }: DeleteItemModalProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    // Disable scrolling when this modal is open
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

    
}