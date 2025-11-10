import Image from "next/image"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in" 
import { StepCard } from "@/components/ui/step-card" 

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description: "Type your task or service request — we'll suggest the best options instantly.",
    delay: 0.1,
    arrow: {
      src: "/images/arrow-left.png",
      alt: "Arrow pointing right",
      position: "absolute left-[28%] top-[15%]",
    },
  },
  {
    number: "02",
    title: "Browse recommended Taskers",
    description: "Review Tasker profiles with details like skills, pricing, and customer ratings.",
    delay: 0.3,
    arrow: {
      src: "/images/arrow-right.png",
      alt: "Arrow pointing left",
      position: "absolute right-[28%] top-[15%]",
    },
  },
  {
    number: "03",
    title: "Connect directly",
    description: "Reach out to your selected Tasker and arrange the details.",
    delay: 0.5,
    arrow: null,
  },
]

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="px-6 md:px-16 lg:px-24 py-20 md:py-32 relative"
    >
      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-light opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-0 w-80 h-80 bg-green-light opacity-10 rounded-full blur-3xl"></div>

      <FadeIn direction="up" className="mb-16">
        <p className="section-title text-black ">HOW IT WORKS</p>
        <h2 className="section-heading">Let&apos;s see how it works</h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <StepCard
              number={step.number}
              title={step.title}
              description={step.description}
              delay={step.delay}
            />
            {step.arrow && (
              <div
                className={`hidden md:block absolute transform -translate-x-1/2 -right-2/3 top-0 w-[200px]`}
              >
                <Image
                  src={step.arrow.src}
                  alt={step.arrow.alt}
                  width={200}
                  height={50}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
