"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/global/Loader";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/ui/page-container";
import { ServiceTag } from "@/components/ui/service-tag";
import { Textarea } from "@/components/ui/textarea";
import { useStepper } from "@/contexts/SignUpData";
import { completeOnboarding } from "@/lib/actions/auth";
import { UserRole } from "@/types/user";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function CreateProfile() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [body, setbody] = useState<{
    description: string;
    role:string,
    phoneNumber:string
  }>({
    phoneNumber: "",
    role: "",
    description:"" 
   });

  const { setStepData, setCurrentStep, stepData } = useStepper();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [error, setError] = useState("");
  const navigate = useRouter();
  const { user } = useUser();

  if (role === undefined) {
    return <Loader />; 
  }

  const handleBody = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setbody({ ...body, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    const formData = new FormData();
    const res = await completeOnboarding(formData);
    if (res?.message) {
      await user?.reload();
      navigate.push("/");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };

useEffect(() => {
  if (!role) return;
  if (!role || !["client", "tasker"].includes(role)) {
    navigate.push("/select-role");
  }
},
[stepData.role, role, navigate]);

  const [bio, setBio] = useState("");

  const services = ["Cleaning", "Shopping", "Mount TV", "Plumbing"];

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <PageContainer maxWidth="md">
        <form onSubmit={(e)=>handleSubmit(e)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-start mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome to <span className="text-green-light">Handy</span> Link
          </h1>
          <p className="text-grey">Finish setting up your profile</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          {role === "tasker" && (
            <div className="flex flex-wrap gap-3 mb-6">
              {services.map((service) => (
                <ServiceTag
                  key={service}
                  label={service}
                  selected={selectedServices.includes(service)}
                  onClick={() => toggleService(service)}
                />
              ))}
            </div>
          )}
          <Input
            label="phone number"
            name="phoneNumber"
            value={body.phoneNumber}
            onChange={(e)=>handleBody(e)}
            placeholder="e.g. +12333546789"
          />
          <Textarea
            label="About Me"
            value={body.description}
            onChange={(e) => handleBody(e)}
            placeholder="Tell us a bit about yourself..."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            variant="primary"
            fullWidth
          >
            Finish Setup
          </Button>
        </motion.div>
        </form>
      </PageContainer>
    </main>
  );
}
