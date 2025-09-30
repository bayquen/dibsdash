import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

interface RouteParams {
    params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const body = await request.json()

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