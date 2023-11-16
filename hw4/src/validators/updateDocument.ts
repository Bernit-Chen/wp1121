import { z } from "zod";

export const updateDocSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  mesData: z.object({
    message: z.string().array(),
    userID: z.string().array(),
    block: z.boolean().array(),
    creatTime: z.number().array(),
    announceOfTime: z.number()
  })
});
