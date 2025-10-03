'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EditEventModalProps {
    event: any
    isOpen: boolean
    onClose: () => void
}

export default function EditEventModal({ event, isOpen, onClose }: EditEventModalProps) {
    
}