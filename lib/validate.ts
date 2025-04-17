// lib/validate.ts
import { ZodSchema } from "zod";

export const validateRequest = async <T>(
  req: Request,
  schema: ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; errors: any[] }> => {
  try {
    const body = await req.json();
    const data = schema.parse(body);
    return { success: true, data };
  } catch (error: any) {
    if (error.name === "ZodError") {
      const errors = error.errors.map((e: any) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return { success: false, errors };
    }

    return {
      success: false,
      errors: [{ field: "unknown", message: "Invalid request format" }],
    };
  }
};
