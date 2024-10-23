import {z} from "zod";

export const registerSchema = z.object({
  firstname: z.string({
    required_error: "El nombre es necesario",
  }),
  lastname: z.string({
    required_error: "El apellido es necesario",
  }),
  email: z
    .string({
      required_error: "El email es necesario",
    })
    .email({
      required_error: "Email inválido",
    }),
  password: z
    .string({
      required_error: "La contraseña es necesaria",
    })
    .min(8, {
      message: "La contraseña debe tener un minimo de 8 caracteres",
    })
    .max(50, {
      message: "La contraseña no puede exceder los 50 caracteres",
    }),
});
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es necesario",
    })
    .email({
      required_error: "Email inválido",
    }),
  password: z.string({
    required_error: "La contraseña es necesaria",
  }),
});
