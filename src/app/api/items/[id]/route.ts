import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

interface RouteParams {
    params: Promise<{ id: string }>
}

// For claiming an existing item (partial updating of Supabase DB, hence a PATCH request instead of UPDATE)
export async function PATCH(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const body = await request.json()

        // For building the Update object dynamically. Only includes the item fields that were provided
        const updateData: any = {}
        
        if (body.claimed_by !== undefined) updateData.claimed_by = body.claimed_by
        if (body.name !== undefined) updateData.name = body.name
        if (body.category !== undefined) updateData.category = body.category
        if (body.quantity !== undefined) updateData.quantity = body.quantity
        if (body.notes !== undefined) updateData.notes = body.notes

        const { data, error } = await supabase
            .from('items')
            .update({ claimed_by: body.claimed_by })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ success: true, data })
        
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        )
    }
}

// For deleting an existing item by accessing Supabase DB (hence DELETE request)
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params

        const { error } = await supabase
            .from('items')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ success: true })

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        )
    }
}