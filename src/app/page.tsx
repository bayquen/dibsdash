'use client';
import { useRouter } from 'next/navigation';
import FeatureGrid from './event/[slug]/LandingPageFeatureGrid';
import NavigationBar from './components/NavigationBar';
import RotatingText from './components/RotatingText';

export default function Home() {
    const router = useRouter();

    return (
        <>
            <NavigationBar rightItems={[{ type: 'link', href: '/create', label: '+ New Event', className: 'custom-button' }, ]}/>

            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
                <div className="max-w-4xl mx-auto px-4 py-16 mb-20 text-center">
                    <h1 className="font-bold px-0 text-blue-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl flex justify-center items-baseline">
                        Coordinate party
                        <span className="inline-block w-[80px] sm:w-[100px] md:w-[140px] text-left mx-1">
                            <RotatingText
                                texts={['food', 'drinks', 'supplies', 'favors']}
                                mainClassName="font-bold text-blue-600 px-1 flex overflow-hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                                staggerFrom={"first"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                // auto=
                                rotationInterval={2500}
                                />
                        </span>
                         
                    </h1>
                    <h1 className="font-bold text-blue-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl flex justify-center items-baseline mt-1 mb-8">
                    with friends.
                    </h1>
                    <h3 className="font-outfit font-bold text-base sm:text-xl md:text-2xl mb-4"> 
                        No more messy group chats or inconvenient spreadsheets.
                    </h3>
                    <p className="font-outfit text-md sm:text-lg md:text-xl text-gray-600 mb-8">
                        Simple and 100% free. No accounts needed.
                    </p>
                    <button onClick={() => router.push('/create')} className="custom-button">
                        <span className="custom-button-top">Create Event</span>
                    </button>
                </div>

                {/* Bento Grid Section for quick rundown of app flow to user */}
                <div className="bg-gradient-to-b from-blue-50 to-white">
                    <FeatureGrid />
                </div>
            </div>
        </>
    );
}
