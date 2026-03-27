import { Link } from "react-router-dom"
import { Button } from "../ui/button"


function Hero() {
  return (
    <div className="min-h-screen bg-slate-50 bg-[url('/city-map.png')] bg-repeat">
     <header className="max-w-7xl mx-auto px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
                Discover your next <span className="text-[#E07A5F]">adventure with AI</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Personalized itineraries at your fingertips. Your personal trip planner and travel curator, creating custom journeys tailored to your interests and budget.
            </p>
            <div className="mt-10 flex space-x-4">
                <button className="px-8 py-4 bg-[#2D3436] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition">Get Started, It's free</button>
                <button className="px-8 py-4 bg-white border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition">Learn More</button>
            </div>
        </div>

        <div className="flex justify-center">
            <img className="w-full h-auto object-cover rounded-lg shadow-lg" src="/hero-image.png" alt="Travel Illustration" />
        </div>
    </header>
    </div>
  )
}

export default Hero