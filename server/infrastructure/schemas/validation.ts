import { z } from "zod";

export const userSchema = z.object({
  clerkId: z.string(),
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: z.string().regex(/^\+?\d{10,14}$/, "Invalid phone number"),
  description: z.string().max(500).optional(),
  role: z.enum(["user", "tasker", "admin"]),
});

export const taskSchema = z.object({
    name: z.string().min(1, "Task name is required"),
    taskerId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid tasker ID"),
    categoryId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid category ID"),
    price: z.number().positive("Price must be a positive number"),
    description: z.string().min(1, "Description is required"),
  });

  export const reviewSchema = z.object({
    description: z.string().min(1, "Description is required"),
    rating: z.number().min(1).max(5),
    taskerId: z.string().regex(/^[a-fA-F0-9]{24}$/),
    taskId: z.string().regex(/^[a-fA-F0-9]{24}$/),
    userId: z.string(),
  });
  
  export const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
  });

  export const bookingSchema = z.object({
    taskId: z.string().regex(/^[a-fA-F0-9]{24}$/),
    taskerId: z.string().regex(/^[a-fA-F0-9]{24}$/),
    userId: z.string(),
    status: z.enum(["pending", "completed", "cancelled"]).optional(),
    price: z.number().positive("Price must be a positive number"),
  });

  