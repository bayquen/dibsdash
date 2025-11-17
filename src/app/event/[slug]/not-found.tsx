// import Link from 'next/link';
'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Not found.</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4"></h2>
        <p className="text-lg text-gray-600 mb-4">
          Sorry, we couldn&apos;t find the event you&apos;re looking for. Perhaps a typo?
        </p>
        <p className="text-lg text-gray-600 mb-4">
          OR make a new one:
        </p>
          <button onClick={() => router.push('/create')} className="custom-button">
            <span className="custom-button-top">Create Your Event</span>
          </button>
      </div>
    </div>
  )
}