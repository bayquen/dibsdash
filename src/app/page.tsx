'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import router from 'next/router';

export default function Home() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
                <h1 className="fontdiner-swanky-regular text-6xl sm:text-4xl lg:text-8xl mb-6 mt-12 ">DibsDash</h1>
                <p className="mb-6"> 
                    Who's bringing what? Solved. One link and everyone's in sync.
                </p>
                <button onClick={() => router.push('/create')} className="custom-button">
                    <span className="custom-button-top">Create Your Event</span>
                </button>
            </div>
        </div>
    );
}
