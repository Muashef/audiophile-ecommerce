import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  orders: defineTable({
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    city: v.string(),
    country: v.string(),
    zip: v.string(),
    paymentMethod: v.union(v.literal("e-money"), v.literal("cash-on-delivery")),
    emoneyNumber: v.optional(v.string()),
    emoneyPin: v.optional(v.string()),
    items: v.array(
      v.object({
        id: v.optional(v.union(v.string(), v.number())),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      }),
    ),
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    total: v.number(),
    status: v.string(), // "pending", "completed", "shipped"
    createdAt: v.number(),
  }).index("by_email", ["email"]),
})
