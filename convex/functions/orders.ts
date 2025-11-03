import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const saveOrder = mutation({
  args: {
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
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    subtotal: v.number(),
    total: v.number(),
    createdAt: v.number(),
  },
  handler: async ({ db }, args) => {
    const orderId = await db.insert("orders", { ...args });
    return orderId
  },
});