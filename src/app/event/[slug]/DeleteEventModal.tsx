'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteEventModalProps {
    eventSlug: string
    isOpen: boolean
    onClose: () => void
}
