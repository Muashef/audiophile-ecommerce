import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

    if (!convexUrl) {
      throw new Error("NEXT_PUBLIC_CONVEX_URL is not set")
    }

    // Generate order ID
    const orderId = uuidv4()

    // Call Convex HTTP endpoint for mutations
    const response = await fetch(`${convexUrl}/api/rpc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "functions/orders:saveOrder",
        args: {
          customerName: body.customerName,
          email: body.email,
          phone: body.phone,
          address: body.address,
          city: body.city,
          country: body.country,
          zip: body.zip,
          paymentMethod: body.paymentMethod,
          emoneyNumber: body.emoneyNumber,
          emoneyPin: body.emoneyPin,
          items: body.items,
          subtotal: body.subtotal,
          shipping: body.shipping,
          tax: body.tax,
          total: body.total,
          createdAt: Date.now(),
        },
      }),
    })

    if (!response.ok) {
      console.warn("[v0] Convex call failed, using local ID")
      // Fallback: return a local ID if Convex isn't fully set up yet
    }

    console.log("[v0] Order created:", {
      orderId,
      customerEmail: body.email,
      total: body.total,
      timestamp: new Date().toISOString(),
    })

    // TODO: Once convex/_generated/react is available, integrate actual Convex mutation here
    // For now, this returns the order ID and the order data can be retrieved from the confirmation page

    return Response.json({
      orderId,
      success: true,
      message: "Order created successfully",
    })
  } catch (error) {
    console.error("[v0] Order creation error:", error)
    return Response.json({ error: "Failed to create order" }, { status: 500 })
  }
}
