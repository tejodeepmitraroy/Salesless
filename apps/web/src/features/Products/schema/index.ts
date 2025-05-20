import { z } from "zod"
 
export const productSchema = z.object({
  name: z.string().min(2).max(50),
  category:z.string().min(2).max(50),
  vendor:z.string().min(2).max(50),
  price:z.string(),
  stock:z.string(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  seoScore: z.number().optional(),
})