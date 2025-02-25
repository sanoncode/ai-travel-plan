import { Link } from "react-router-dom"
import { Button } from "../ui/button"


function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
        <h1 className="font-extrabold text-[48px] text-center mt-16">
            <span className="text-[#f56551]">Discover your next adventure with AI : </span>
            Personalized itinearies at your Fingertips
        </h1>
        <p className="text-xl text-gray-500 text-center">Your Personal trip planner and travel curator, creating custom itinearies tailored to your interest and budget </p>
        <Link to={'/create-trip'}>
        <Button>Get Started, It&apos;s free</Button>
        </Link>
    </div>
  )
}

export default Hero