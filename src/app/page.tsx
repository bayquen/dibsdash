'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import router from 'next/router';

export default function Home() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
                <h1 className="fontdiner-swanky-regular text-blue-800 text-6xl sm:text-4xl md:text-6xl lg:text-8xl mb-8 mt-6 [text-shadow:_1px_1px_1px_rgba(20,20,20,2)]">
                    DibsDash
                </h1>
                <h3 className="font-rubik sm:text-xl md:text-2xl mb-4"> 
                    Coordinate items for your parties & potlucks for free.
                </h3>
                <p className="font-rubik sm:text-md md:text-lg mb-6">
                    No login required. Just create an event, share link, and add items!
                </p>
                <button onClick={() => router.push('/create')} className="custom-button">
                    <span className="custom-button-top">Create Your Event</span>
                </button>
            </div>
        </div>
    );
}
