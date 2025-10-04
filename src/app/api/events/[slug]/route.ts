import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

interface RouteParams {
    params: Promise<{ slug: string }>
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { slug } = await params

        const { error } = await supabase
            .from('events')
            .delete()
            .eq('url_slug', slug)

        if (error) throw error

        return NextResponse.json({ success: true })
        
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        )
    }
}

export async function PATCH(request: Request, { params }: RouteParams) {
    try {
        const { slug } = await params
        const body = await request.json()

        const { data, error } = await supabase
            .from('events')
            .update({
            name: body.name,
            description: body.description || null,
            date: body.date || null,
            time: body.time || null,
            location: body.location || null
            })
            .eq('url_slug', slug)
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