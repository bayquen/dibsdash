'use client';
import { useRouter } from 'next/navigation';
import FeatureGrid from './event/[slug]/LandingPageFeatureGrid';
import NavigationBar from './components/NavigationBar';

export default function Home() {
    const router = useRouter();

    return (
        <>
            <NavigationBar rightItems={[{ type: 'link', href: '/create', label: '+ New Event' }, ]}/>
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-4xl mx-auto px-4 py-16 mb-20 sm:py-24 text-center">
                    <h1 className="fontdiner-swanky-regular text-blue-800 text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-8 mt-6 [text-shadow:_1px_1px_1px_rgba(20,20,20,2)]">
                        DibsDash
                    </h1>
                    <h3 className="font-rubik font-bold text-base sm:text-xl md:text-2xl mb-4"> 
                        Coordinate food and drinks with friends!
                    </h3>
                    <p className="font-rubik text-md sm:text-lg md:text-xl text-gray-600 mb-8">
                        No logins or downloads needed. Free and simple.
                    </p>
                    <button onClick={() => router.push('/create')} className="custom-button">
                        <span className="custom-button-top">Create Event</span>
                    </button>
                </div>

                {/* Bento Grid Section for quick rundown of app flow to user */}
                <div className="bg-gradient-to-b from-blue to-white">
                    <FeatureGrid />
                </div>
            </div>
        </>
    );
}
