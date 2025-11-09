"use client";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/global/Loader";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/ui/page-container";
import { ServiceTag } from "@/components/ui/service-tag";
import { Textarea } from "@/components/ui/textarea";
import { useStepper } from "@/contexts/SignUpData";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { toast } from "sonner";
import { PhoneInput } from "@/components/ui/phone-input";
import api from "@/lib/axios";

const createProfileSchema = z
  .object({
    role: z.enum(["client", "tasker"], { required_error: "Role is required" }),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\+?\d{10,15}$/, "Invalid phone number format"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    skills: z.array(z.string()).optional(),
  })
  .refine(
    (data) => data.role !== "tasker" || (data.skills && data.skills.length > 0),
    {
      message: "At least one skill is required for taskers",
      path: ["skills"],
    }
  );

export default function CreateProfile() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [body, setBody] = useState({
    description: "",
    role: "",
    phoneNumber: "",
  });

  const { stepData } = useStepper();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!role || !["client", "tasker"].includes(role)) {
      router.push("/select-role");
    } else {
      setBody((prev) => ({ ...prev, role }));
    }
  }, [role, router]);

  const handleBody = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const payload = {
      role: body.role,
      phoneNumber: body.phoneNumber,
      description: body.description,
      skills: selectedServices,
    };

    // ✅ Validate with Zod before API call
    const result = createProfileSchema.safeParse(payload);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message;
      setError(firstError || "Please check your input fields");
      toast.error(firstError || "Please check your input fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const { data } = await api.post("/api/auth/onboard", payload);

      if (data.message) {
        await user?.reload();
        router.push("/");
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = ["Cleaning", "Shopping", "Mount TV", "Plumbing"];

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  if (!role) return <Loader />;

  return (
    <main className="min-h-screen w-full flex flex-col justify-center">
      <PageContainer maxWidth="md">
        <form onSubmit={handleSubmit}>
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

            <PhoneInput
              label="Phone Number"
              name="phoneNumber"
              value={body.phoneNumber}
              onValueChange={(value) => {
                setBody((prev) => ({ ...prev, phoneNumber: value }));
              }}
            />
            <Textarea
              label="About Me"
              name="description"
              value={body.description}
              onChange={handleBody}
              placeholder="Tell us a bit about yourself..."
            />
          </motion.div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              variant="primary"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Finish Setup"}
            </Button>
          </motion.div>
        </form>
      </PageContainer>
    </main>
  );
}
