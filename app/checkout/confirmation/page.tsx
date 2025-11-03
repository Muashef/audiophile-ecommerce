"use client"

import { useParams, useRouter } from "next/navigation"
import Layout from "@/components/layout"
import Header from "@/components/header"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { useState, useEffect } from "react"

interface Order {
  _id: string
  customerName: string
  email: string
  address: string
  city: string
  zip: string
  country: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  subtotal: number
  shipping: number
  tax: number
  total: number
  createdAt: number
}

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/get-order?orderId=${orderId}`)
        if (response.ok) {
          const data = await response.json()
          setOrder(data.order)
        }
      } catch (err) {
        console.error("[v0] Failed to fetch order:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <Layout>
        <div className="bg-black h-24.25">
          <Header border={false} />
        </div>
        <div className="min-h-screen bg-gray-100 py-12 md:py-20">
          <div className="container lg:max-w-277.5 mx-auto px-4">
            <Skeleton height={400} />
          </div>
        </div>
      </Layout>
    )
  }

  if (!order) {
    return (
      <Layout>
        <div className="bg-black h-24.25">
          <Header border={false} />
        </div>
        <div className="min-h-screen bg-gray-100 py-12 md:py-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black mb-4">Order Not Found</h1>
            <button
              onClick={() => router.push("/")}
              className="bg-[#D87D4A] text-white font-bold px-8 py-3 rounded hover:bg-[#c76f39] transition"
            >
              Back to Home
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
      <div className="min-h-screen bg-gray-100 py-12 md:py-20">
        <div className="container lg:max-w-277.5 mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="text-black text-[0.9375rem] font-medium opacity-50 hover:opacity-100 transition"
          >
            Go Back
          </button>

          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-8 md:p-12 border-4 border-blue-500">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#D87D4A] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-black">THANK YOU FOR YOUR ORDER</h1>
                <p className="text-sm text-black opacity-50 mt-4">
                  You will receive an order confirmation email shortly.
                </p>
              </div>

              {/* Order Details */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs font-bold text-black opacity-50 mb-2">ORDER ID</p>
                    <p className="text-sm font-bold text-black">{orderId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black opacity-50 mb-2">ORDER DATE</p>
                    <p className="text-sm font-bold text-black">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-black opacity-50 mb-3">ITEMS</p>
                  <div className="space-y-2">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-black">{item.name}</span>
                        <span className="font-bold text-black">
                          x{item.quantity} - ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-8 p-6 bg-black text-white rounded-lg">
                <div className="flex justify-between text-sm opacity-75">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm opacity-75">
                  <span>Shipping</span>
                  <span>${order.shipping}</span>
                </div>
                <div className="flex justify-between text-sm opacity-75">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-white/20 pt-3 mt-3">
                  <span>GRAND TOTAL</span>
                  <span className="text-[#D87D4A]">${order.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-200">
                <h3 className="font-bold text-black mb-3">Shipping Address</h3>
                <p className="text-sm text-black">{order.address}</p>
                <p className="text-sm text-black">
                  {order.city}, {order.zip}
                </p>
                <p className="text-sm text-black">{order.country}</p>
              </div>

              {/* CTA */}
              <button
                onClick={() => router.push("/")}
                className="w-full bg-[#D87D4A] text-white font-bold text-sm uppercase py-4 rounded hover:bg-[#c76f39] transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
