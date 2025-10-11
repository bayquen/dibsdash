'use client';

import { useState } from 'react';
import ClaimItemButton from './ClaimItemButton';
import EditItemButton from './EditItemButton';
import DeleteItemButton from './DeleteItemButton';

interface EventItemRowProps {
    item: {
        id: string
        name: string
        category: string
        quantity: number
        notes: string | null
        claimed_by: string | null
    }
}
