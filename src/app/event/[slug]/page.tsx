import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';    // to show 404 page as needed
import ShareButton from './ShareButton';
import EventDate from './EventDate';
import AddItemModal from './AddItemModal';
import AddItemButton from './AddItemButton';
import ClaimItemButton from './ClaimItemButton';
import DeleteEventButton from './DeleteEventButton';
import DeleteItemButton from './DeleteItemButton';
import EditEventButton from './EditEventButton';
import EditItemButton from './EditItemButton';
import EventItemsTable from './EventItemsTable';

interface PageProps {                   // Defines that this page receives URL params w/ a slug
    params: Promise<{ slug: string }>   // Change for Next.js 15: Now a Promise for asynchronous operations
}

async function getEvent(slug: string) {
    // 1st Query: Find event w/ matching url_slug
    const { data: event, error } = await supabase
        .from('events')          // look in 'events' table
        .select('*')             // Get all columns
        .eq('url_slug', slug)    // e.g. WHERE url_slug = 'happy-party-1234'
        .single()                // Expect exactly 1 result

    if (error || !event) return null

    // 2nd Query: Get all items for this event
    const { data: items } = await supabase
        .from('items')               // Look in 'items' table
        .select('*')
        .eq('event_id', event.id)    // WHERE event_id matches this event
        .order('category')           // Sort by category, alphabetically (e.g. Decor, Drinks, Food, etc.)
        .order('created_at')         // Then by creation time

    return { ...event, items: items || [] }    // Combine event + items into one object 
}

export default async function EventPage({ params }: PageProps) {
    const { slug } = await params         // Add: Await the params (Next.js 15)
    const event = await getEvent(slug)    // Use slug directly

    if (!event) {
        notFound()  // Trigger 404 page if event doesn't exist
    }

    // Group items by category (moved from JSX to here for clarity)
    const categorizedItems = event.items.reduce((acc: any, item: any) => {
        if (!acc[item.category]) acc[item.category] = []
        acc[item.category].push(item)
        return acc
    }, {})

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 overflow-x-hidden">
            <div className="max-w-4xl mx-auto w-full">
                {/* SECTION: Event Header (YAYY) */}
                <div className= "bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold mb-4">{event.name}</h1>

                    {event.description && (
                        <p className="text-gray-700 mb-4">{event.description}</p>
                    )}

                    <div className="space-y-2 text-gray-600">
                        <EventDate date={event.date} time={event.time} />

                    {event.location && (
                        <div className="flex-items-center">
                            <span className="font-semibold mr-2">📍 </span>
                            <span>{event.location}</span>
                        </div>
                    )}
                    </div>
                    
                    {/* <div className="flex-items-center mt-4">
                        <p>
                            Don't
                        </p>
                    </div> */}

                    {/* SECTION: Share Link (YAYYY) */}
                    <div className="mt-6 p-4">
                        <p className="text-md max-w-lg mb-2">
                            <span className="text-red-500">IMPORTANT Note:</span> For event hosts, don't forget to save your event link somewhere, or you'll lose access!
                        </p>
                        <p className="text-md font-semibold mb-2">Share this event:</p>
                        <div className="flex items-center gap-2 max-w-xs">
                            <input
                            type="text"
                            readOnly
                            value={`${typeof window !== 'undefined' ? window.location.origin : ''}dibsdash.com/event/${event.url_slug}`}
                            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm"
                            />    
                            <ShareButton url={`${process.env.NEXT_PUBLIC_APP_URL || 'https://dibsdash.com'}/event/${event.url_slug}`} />
                        </div>
                    </div>

                    <div>
                        {/* Button to open modal for editing event details hehe */}
                        <EditEventButton event={event} />
                    </div>
                </div>
                
                {/* SECTION: Items (YAYYY) - NOW WITH TABLE LAYOUT */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Items Needed</h2>
                        <AddItemButton eventId={event.id} />
                    </div>
                    
                    {event.items.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-lg">No items added yet</p>
                            <p className="text-sm mt-2">Be the first to add what&apos;s needed for this event!</p>
                        </div>
                    ) : (
                        <EventItemsTable categorizedItems={categorizedItems} />
                    )}
                </div>

                <div className="mt-8 text-center">
                    <DeleteEventButton eventSlug={event.url_slug} />
                </div>
            </div>
        </div>
    )
}