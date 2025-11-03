import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, email, name, items, subtotal, shipping, tax, total } = body

    const SMTP_HOST = process.env.SMTP_HOST
    const SMTP_PORT = process.env.SMTP_PORT
    const SMTP_USER = process.env.SMTP_USER
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD
    const FROM_EMAIL = process.env.FROM_EMAIL || "orders@audiophile.com"

    // Check if SMTP configuration is available
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
      console.warn("SMTP configuration not complete - email not sent")
      return NextResponse.json(
        { success: true, message: "Order saved (email service not configured)" },
        { status: 200 },
      )
    }

    // HTML email template
    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #D87D4A; color: white; padding: 20px; text-align: center; border-radius: 8px; }
            .content { padding: 20px; background-color: #f9f9f9; border-radius: 8px; margin: 20px 0; }
            .order-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
            .summary { background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
            .summary-total { font-size: 20px; font-weight: bold; color: #D87D4A; border-top: 2px solid #ddd; padding-top: 10px; }
            .button { display: inline-block; background-color: #D87D4A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
            .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmation</h1>
            </div>
            
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for your order! We're excited to get your items to you.</p>
              
              <h2>Order ID: ${orderId}</h2>
            </div>

            <div class="content">
              <h3>Order Summary</h3>
              ${items
                .map(
                  (item: any) => `
                <div class="order-item">
                  <span>${item.name} (Qty: ${item.quantity})</span>
                  <span>$${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              `,
                )
                .join("")}
            </div>

            <div class="summary">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toLocaleString()}</span>
              </div>
              <div class="summary-row">
                <span>Shipping:</span>
                <span>$${shipping}</span>
              </div>
              <div class="summary-row">
                <span>Tax:</span>
                <span>$${tax.toFixed(2)}</span>
              </div>
              <div class="summary-row summary-total">
                <span>Total:</span>
                <span>$${total.toLocaleString()}</span>
              </div>
            </div>

            <div class="content">
              <h3>What's Next?</h3>
              <p>Your order will be processed shortly. You'll receive another email with tracking information once it ships.</p>
              <p>If you have any questions, feel free to contact us at support@audiophile.com</p>
            </div>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000"}/checkout/confirmation/${orderId}" class="button">View Order Details</a>
            </div>

            <div class="footer">
              <p>Thank you for shopping at Audiophile!</p>
              <p>&copy; 2025 Audiophile. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number.parseInt(SMTP_PORT as string),
      secure: Number.parseInt(SMTP_PORT as string) === 465, // true for port 465, false for other ports like 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    })

    // Send email via Nodemailer
    const mailOptions = {
      from: FROM_EMAIL,
      to: email,
      subject: `Order Confirmation - #${orderId}`,
      html: emailHTML,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Email sent successfully", orderId }, { status: 200 })
  } catch (error) {
    console.error("[v0] Email API error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send email", error: (error as Error).message },
      { status: 500 },
    )
  }
}
