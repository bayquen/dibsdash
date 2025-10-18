'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteItemModalProps {
    itemId: string
    itemName: string
    isOpen: boolean
    onClose: () => void
}
