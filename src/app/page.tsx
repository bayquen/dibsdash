'use client';
import { useRouter } from 'next/navigation';
import FeatureGrid from './event/[slug]/LandingPageFeatureGrid';
import NavigationBar from './components/NavigationBar';
import RotatingText from './components/RotatingText';

export default function Home() {
    const router = useRouter();

    return (
        <>
            <NavigationBar rightItems={[{ type: 'link', href: '/create', label: '+ New Event' }, ]}/>

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-4xl mx-auto px-4 py-16 mb-20 sm:py-24 text-center">
                    <h1 className="font-medium text-blue-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 mt-6">
                        Coordinate 
                        <RotatingText
                            texts={['food', 'drinks', 'supplies', 'decor']}
                            mainClassName="font-medium text-blue-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl justify-center"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                            />
                        for your next party.
                    </h1>
                    <h3 className="font-rubik font-bold text-base sm:text-xl md:text-2xl mb-4"> 
                        No more messy spreadsheets or chaotic group chats.
                    </h3>
                    <p className="font-rubik text-md sm:text-lg md:text-xl text-gray-600 mb-8">
                        It's free and simple. No accounts needed.
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
