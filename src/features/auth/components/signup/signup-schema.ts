import z from "zod";

export const signupSchema = z.object({
    name: z.string().min(1, { message: "Name must be at least 1 character" }),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type SignupSchema = z.infer<typeof signupSchema>;
