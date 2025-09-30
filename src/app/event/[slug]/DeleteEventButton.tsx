'use client';
import { useState } from 'react';
import DeleteEventModal from './DeleteEventModal'

interface DeleteEventButtonProps {
    eventSlug: string
}

export default function DeleteEventButton({ eventSlug }: DeleteEventButtonProps) {
    const [showModal, setShowModal] = useState(false)
}