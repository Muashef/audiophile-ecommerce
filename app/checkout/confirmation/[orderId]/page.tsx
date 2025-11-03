"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams, useRouter } from "next/navigation"
import type { Id } from "@/convex/_generated/dataModel"
import Layout from "@/components/layout"
import Header from "@/components/header"
import { useEffect } from "react"
import { useAtom } from "jotai"
import { cartsAtom } from "@/app/store/globalAtom"

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const [, setCart] = useAtom(cartsAtom)
  const orderId = params.orderId as string

  const order = useQuery(api.orders.getOrder, {
    orderId: orderId as Id<"orders">,
  })

  interface OrderItem {
  id?: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customerName: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  phone: string;
  email: string;
  paymentMethod: "e-money" | "cash-on-delivery";
}

  // Clear cart on confirmation
  useEffect(() => {
    setCart([])
  }, [setCart])

  if (order === undefined) {
    return (
      <Layout>
        <div className="bg-black h-24.25">
          <Header border={false} />
        </div>
        <div className="container lg:max-w-277.5 mx-auto py-12 flex justify-center">
          <div className="text-center">Loading order details...</div>
        </div>
      </Layout>
    )
  }

  if (order === null) {
    return (
      <Layout>
        <div className="bg-black h-24.25">
          <Header border={false} />
        </div>
        <div className="container lg:max-w-277.5 mx-auto py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
            <button
              onClick={() => router.push("/")}
              className="bg-[#D87D4A] text-white font-bold px-6 py-3 rounded hover:bg-[#c76f39]"
            >
              Return Home
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-black h-24.25">
        <Header border={false} />
      </div>
      <div className="container lg:max-w-277.5 mx-auto py-12 md:py-20">
        <div className="bg-white rounded-lg p-8 md:p-12 max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#D87D4A] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center text-black mb-2">Thank You for Your Order</h1>

          <p className="text-center text-gray-600 mb-8">
            We appreciate your business and will process your order shortly.
          </p>

          {/* Order ID */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-sm text-gray-500 mb-2">Order ID</p>
            <p className="text-lg font-bold text-black break-all">{orderId}</p>
          </div>

          {/* Order Details */}
          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>
              <div className="space-y-3">
                {order.items.map((item: OrderItem, idx: number) => (
                  <div key={idx} className="flex justify-between pb-3 border-b border-gray-200">
                    <div>
                      <p className="font-bold text-black">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-black">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold text-black">${order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-bold text-black">${order.shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-bold text-black">${order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between">
                <span className="text-lg font-bold text-black">Total</span>
                <span className="text-2xl font-bold text-[#D87D4A]">${order.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Shipping Details */}
            <div>
              <h3 className="font-bold text-black mb-3">Shipping Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-1">
                <p>{order.customerName}</p>
                <p>{order.address}</p>
                <p>
                  {order.city}, {order.country} {order.zip}
                </p>
                <p>{order.phone}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="font-bold text-black mb-3">Payment Method</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-sm">
                <p className="text-gray-700 capitalize">
                  {order.paymentMethod === "e-money" ? "E-Money" : "Cash on Delivery"}
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
            <p className="text-sm text-blue-800">
              A confirmation email has been sent to <strong>{order.email}</strong>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/")}
              className="flex-1 bg-[#D87D4A] text-white font-bold py-3 rounded hover:bg-[#c76f39] transition"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-gray-200 text-black font-bold py-3 rounded hover:bg-gray-300 transition"
            >
              Print Order
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
