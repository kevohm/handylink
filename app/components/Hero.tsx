import Image from "next/image"
import { Button } from "@/components/ui/button"
import cleaning from "@/assets/cleaner.jpeg"

const Hero = () => {
  return (
    <section className="w-full px-4 py-8 md:px-8 lg:px-24 flex flex-col md:flex-row items-center gap-8 md:gap-12">
      <div className="w-full flex flex-col space-y-5">
        <h1 className="font-bold font-passionOne text-6xl sm:text-5xl lg:text-6xl leading-tight">Find Trusted Cleaning Help, Fast.</h1>
        <p className="text-lg text-muted-foreground max-w-xl">
          Whether it's a quick tidy-up or a deep clean, connect instantly with skilled taskers ready to make your space
          shine.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Button>
            Get Started
          </Button>
          <p className="text-green">How it works</p>
        </div>
      </div>
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden">
        <Image
          src={cleaning || "/placeholder.svg"}
          alt="Professional cleaning service"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}

export default Hero
