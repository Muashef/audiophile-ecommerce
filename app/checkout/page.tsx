"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAtom } from "jotai"
import { cartsAtom } from "../store/globalAtom"
import Layout from "@/components/layout"
import Header from "@/components/header"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import OrderSuccessModal from "./success-modal"
import Footer from "@/components/footer"

const checkoutSchema = z.object({
  customerName: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(6, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  zip: z.string().min(3, "ZIP code is required"),
  paymentMethod: z.enum(["e-money", "cash-on-delivery"]),
  emoneyNumber: z.string().optional(),
  emoneyPin: z.string().optional(),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

interface OrderData {
  orderId: string
  items: any[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cart] = useAtom(cartsAtom)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "e-money" },
  })

  const paymentMethod = watch("paymentMethod")

  const subtotal = cart.reduce((acc, i) => acc + ((i.price ?? 0) * (i.quantity ?? 0) || 0), 0)
  const shipping = 50
  const tax = Math.round(subtotal * 0.1 * 100) / 100
  const total = subtotal + shipping + tax

  const onSubmit = async (data: CheckoutForm) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!")
      return
    }

    setLoading(true)
    try {
      const items = cart.map((item) => ({
        id: item.id?.toString(),
        name: item.name || "",
        price: item.price ?? 0,
        quantity: item.quantity ?? 0,
      }))

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          country: data.country,
          zip: data.zip,
          paymentMethod: data.paymentMethod,
          emoneyNumber: data.emoneyNumber,
          emoneyPin: data.emoneyPin,
          items,
          subtotal,
          shipping,
          tax,
          total,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create order")
      }

      const { orderId } = await orderResponse.json()

      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          email: data.email,
          name: data.customerName,
          items: cart,
          subtotal,
          shipping,
          tax,
          total,
        }),
      })

      if (!emailResponse.ok) {
        console.warn("Email sending failed, but order was saved")
      }

      setOrderData({
        orderId,
        items: cart,
        subtotal,
        shipping,
        tax,
        total,
      })
      setShowSuccess(true)
    } catch (err) {
      console.error("[v0] Checkout error:", err)
      toast.error("Something went wrong. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div>
      <div className="bg-black h-24.25">
        <Header border={false} />
      </div>
      <div className=" min-h-screen py-12 md:py-20">
        <div className="container lg:max-w-277.5 mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="text-black text-[0.9375rem] font-medium opacity-50 hover:opacity-100 transition"
          >
            Go Back
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-black mt-8 md:mt-12 mb-12">CHECKOUT</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
            <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-8">
        
              <div className="bg-white p-6 md:p-8 rounded-lg">
                <h2 className="text-[0.9375rem] font-bold uppercase tracking-wider text-[#D87D4A] mb-6">
                  Billing Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.8125rem] font-bold text-black">Name</label>
                    <input
                      {...register("customerName")}
                      placeholder="Alexei Ward"
                      className={`w-full p-3 border rounded text-[0.875rem] focus:outline-none transition ${
                        errors.customerName
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-[#D87D4A]"
                      }`}
                    />
                    {errors.customerName && <p className="text-red-500 text-xs">{errors.customerName.message}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[0.8125rem] font-bold text-black">Email Address</label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="alexei@mail.com"
                      className={`w-full p-3 border rounded text-[0.875rem] focus:outline-none transition ${
                        errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#D87D4A]"
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[0.8125rem] font-bold text-black">Phone Number</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+1 202-555-0136"
                      className={`w-full p-3 border rounded text-[0.875rem] focus:outline-none transition ${
                        errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#D87D4A]"
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-lg">
                <h2 className="text-[0.9375rem] font-bold uppercase tracking-wider text-[#D87D4A] mb-6">
                  Shipping Info
                </h2>

                <div className="space-y-6">

                  <div className="flex flex-col gap-2">
                    <label className="text-[0.8125rem] font-bold text-black">Your Address</label>
                    <input
                      {...register("address")}
                      placeholder="1137 Williams Avenue"
                      className={`w-full p-3 border rounded text-[0.875rem] focus:outline-none transition ${
                        errors.address
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-[#D87D4A]"
                      }`}
                    />
                    {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.8125rem] font-bold text-black">ZIP Code</label>
                      <input
                        {...register("zip")}
                        placeholder="10001"
                        className={`w-full p-3 border rounded text-[0.875rem] focus:outline-none transition ${
                          errors.zip ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#D87D4A]"
                        }`}
                      />
                      {errors.zip && <p className="text-red-500 text-xs">{errors.zip.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[0.8125rem] font-bold text-black">City</label>
                      <input
                        {...register("city")}
                        placeholder="New York"
                        className={`w-full p-3 border rounded text-[0.875rem] focus:outline-none transition ${
                          errors.city ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#D87D4A]"
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[0.8125rem] font-bold text-black">Country</label>
                    <input
                      {...register("country")}
                      placeholder="United States"
                      className={`w-full p-3 border rounded text-[0.875rem] focus:outline-none transition ${
                        errors.country
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-[#D87D4A]"
                      }`}
                    />
                    {errors.country && <p className="text-red-500 text-xs">{errors.country.message}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-lg">
                <h2 className="text-[0.9375rem] font-bold uppercase tracking-wider text-[#D87D4A] mb-6">
                  Payment Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-[0.8125rem] font-bold text-black block mb-4">Payment Method</label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="e-money"
                          {...register("paymentMethod")}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-[0.875rem] font-bold text-black">e-Money</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          value="cash-on-delivery"
                          {...register("paymentMethod")}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="text-[0.875rem] font-bold text-black">Cash on Delivery</span>
                      </label>
                    </div>
                  </div>

                  {paymentMethod === "e-money" && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                      <div className="flex flex-col gap-2">
                        <label className="text-[0.8125rem] font-bold text-black">e-Money Number</label>
                        <input
                          {...register("emoneyNumber")}
                          placeholder="238521993"
                          className={`w-full p-3 border rounded text-[0.875rem] focus:outline-none transition ${
                            errors.emoneyNumber
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-[#D87D4A]"
                          }`}
                        />
                        {errors.emoneyNumber && <p className="text-red-500 text-xs">{errors.emoneyNumber.message}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[0.8125rem] font-bold text-black">e-Money PIN</label>
                        <input
                          {...register("emoneyPin")}
                          placeholder="6891"
                          className={`w-full p-3 border rounded text-[0.875rem] focus:outline-none transition ${
                            errors.emoneyPin
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300 focus:border-[#D87D4A]"
                          }`}
                        />
                        {errors.emoneyPin && <p className="text-red-500 text-xs">{errors.emoneyPin.message}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 md:p-8 rounded-lg sticky top-8">
                <h2 className="text-[1.125rem] font-bold uppercase tracking-wider text-black mb-8">SUMMARY</h2>

                <div className="space-y-6 mb-8 max-h-80 overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm">No items in cart</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="text-[0.8125rem] font-bold text-black">{item.name}</p>
                          <p className="text-[0.875rem] font-bold text-black opacity-50">
                            $ {(item.price ?? 0).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-[0.875rem] font-bold text-black opacity-50">x{item.quantity}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-4 py-6 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-base text-black opacity-50">Subtotal</span>
                    <span className="text-base font-bold text-black">$ {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base uppercase text-black opacity-50">Shipping</span>
                    <span className="text-base font-bold text-black">$ {shipping}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base text-black opacity-50">VAT (INCLUDED)</span>
                    <span className="text-base font-bold text-black">$ {tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between pt-4  px-6 py-4 -mx-6 -mb-8 -mt-2 rounded-b-lg">
                    <span className="text-base font-normal text-black opacity-50">GRAND TOTAL</span>
                    <span className="text-[1.125rem] font-bold text-[#D87D4A]">$ {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading || cart.length === 0}
                  className="w-full bg-[#D87D4A] text-white font-bold text-[0.8125rem] cursor-pointer uppercase py-4 rounded hover:bg-[#c76f39] transition disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                >
                  {loading ? "Processing..." : "Continue & Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && orderData && (
        <OrderSuccessModal isOpen={showSuccess} orderData={orderData} onClose={() => setShowSuccess(false)} />
      )}

    <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  )
}
