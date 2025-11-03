"use client"

import { useRouter } from "next/navigation"
import { useSetAtom } from "jotai"
import { cartsAtom } from "../store/globalAtom"

interface OrderSuccessModalProps {
  isOpen: boolean
  orderData: {
    orderId: string
    items: any[]
    subtotal: number
    shipping: number
    tax: number
    total: number
  }
  onClose: () => void
}

export default function OrderSuccessModal({ isOpen, orderData, onClose }: OrderSuccessModalProps) {
  const router = useRouter()
  const setCart = useSetAtom(cartsAtom)

  if (!isOpen) return null

  const handleBackToHome = () => {
    setCart([])
    onClose()
    router.push("/")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full overflow-hidden border-4 border-blue-500">
        {/* Header with checkmark */}
        <div className="bg-linear-to-b from-orange-100 to-white px-8 py-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-[#D87D4A] rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-black text-center leading-tight">
            THANK YOU
            <br />
            FOR YOUR ORDER
          </h2>
          <p className="text-[0.875rem] text-black opacity-50 text-center mt-4">
            You will receive an order confirmation email shortly at your provided email address.
          </p>
        </div>

        {/* Order Summary Section */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
          <div className="bg-white p-4 rounded mb-4">
            {/* Show first item prominently */}
            {orderData.items.length > 0 && (
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[0.8125rem] font-bold text-black">{orderData.items[0].name}</p>
                  <p className="text-[0.75rem] text-black opacity-50">
                    x{orderData.items[0].quantity}
                    {orderData.items.length > 1 && ` and ${orderData.items.length - 1} other item(s)`}
                  </p>
                </div>
                <p className="text-[0.875rem] font-bold text-black">
                  $ {(orderData.items[0].price * orderData.items[0].quantity).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Grand Total Card */}
          <div className="bg-black p-6 rounded flex justify-between items-center mb-6">
            <div>
              <p className="text-[0.75rem] text-white opacity-50 uppercase">GRAND TOTAL</p>
              <p className="text-[1.75rem] font-bold text-[#D87D4A]">$ {orderData.total.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-8 py-6">
          <button
            onClick={handleBackToHome}
            className="w-full bg-[#D87D4A] text-white font-bold text-[0.8125rem] uppercase py-4 rounded hover:bg-[#c76f39] transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
