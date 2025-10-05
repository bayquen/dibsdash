'use client';

import { useState } from 'react';
import EditItemModal from './EditItemModal';

interface EditItemButtonProps {
    item: {
        id: string
        name: string
        category: string
        quantity: number
        notes: string | null
        claimed_by: string | null
    }
}