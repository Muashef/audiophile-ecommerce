// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useState } from "react";
// import { useMutation } from "../../convex/_generated/react";
// import { saveOrder } from "../../convex/functions/orders";
// import { useRouter } from "next/navigation";
// import { useAtom } from "jotai";
// import { cartsAtom } from "../store/globalAtom";

// const checkoutSchema = z.object({
//   customerName: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email"),
//   phone: z.string().min(6, "Invalid phone"),
//   address: z.string().min(3, "Address required"),
//   city: z.string().min(2),
//   country: z.string().min(2),
//   zip: z.string().min(3),
//   paymentMethod: z.enum(["e-money", "cash-on-delivery"]),
//   emoneyNumber: z.string().optional(),
//   emoneyPin: z.string().optional(),
// });

// type CheckoutForm = z.infer<typeof checkoutSchema>;

// export default function CheckoutPage() {
//   const router = useRouter();
//   const saveOrderMutation = useMutation(saveOrder);
//   const [cart] = useAtom(cartsAtom); // ✅ use the actual cart
//   const [loading, setLoading] = useState(false);

//   const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutForm>({
//     // resolver: zodResolver(checkoutSchema),
//     defaultValues: { paymentMethod: "e-money" },
//   });

//   const paymentMethod = watch("paymentMethod");

//   // calculate totals from actual cart
//   const subtotal = cart.reduce((acc, i) => acc + (i.price ?? 0) * (i.quantity ?? 0), 0);
//   const total = subtotal + 50; // shipping fee

//   const onSubmit = async (data: CheckoutForm) => {
//     if (cart.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const orderId = await saveOrderMutation({
//         customerName: data.customerName,
//         email: data.email,
//         phone: data.phone,
//         address: data.address,
//         city: data.city,
//         country: data.country,
//         zip: data.zip,
//         paymentMethod: data.paymentMethod,
//         emoneyNumber: data.emoneyNumber,
//         emoneyPin: data.emoneyPin,
//         items: cart,
//         subtotal,
//         total,
//         createdAt: Date.now(),
//       });

//       // Send confirmation email
//       await fetch("/api/send-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ orderId, email: data.email, name: data.customerName, items: cart, total }),
//       });

//       router.push(`/checkout/confirmation/${orderId}`);
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong!");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Checkout</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <input {...register("customerName")} placeholder="Full Name" className="input" />
//         {errors.customerName && <p className="text-red-500">{errors.customerName.message}</p>}

//         <input {...register("email")} placeholder="Email" className="input" />
//         {errors.email && <p className="text-red-500">{errors.email.message}</p>}

//         <input {...register("phone")} placeholder="Phone" className="input" />
//         {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

//         <input {...register("address")} placeholder="Address" className="input" />
//         {errors.address && <p className="text-red-500">{errors.address.message}</p>}

//         <input {...register("city")} placeholder="City" className="input" />
//         {errors.city && <p className="text-red-500">{errors.city.message}</p>}

//         <input {...register("country")} placeholder="Country" className="input" />
//         {errors.country && <p className="text-red-500">{errors.country.message}</p>}

//         <input {...register("zip")} placeholder="ZIP Code" className="input" />
//         {errors.zip && <p className="text-red-500">{errors.zip.message}</p>}

//         <div className="flex flex-col gap-2 mt-4">
//           <label>
//             <input type="radio" value="e-money" {...register("paymentMethod")} defaultChecked />
//             E-Money
//           </label>
//           <label>
//             <input type="radio" value="cash-on-delivery" {...register("paymentMethod")} />
//             Cash on Delivery
//           </label>
//         </div>

//         {paymentMethod === "e-money" && (
//           <>
//             <input {...register("emoneyNumber")} placeholder="E-Money Number" className="input" />
//             <input {...register("emoneyPin")} placeholder="E-Money PIN" className="input" />
//           </>
//         )}

//         <div className="mt-4">
//           <h2 className="font-bold">Order Summary</h2>
//           {cart.map(item => (
//             <div key={item.id} className="flex justify-between">
//               <p>{item.name} x{item.quantity}</p>
//               <p>${item.price && item.price * (item.quantity ?? 0)}</p>
//             </div>
//           ))}
//           <div className="flex justify-between font-bold mt-2">
//             <p>Total</p>
//             <p>${total}</p>
//           </div>
//         </div>

//         <button type="submit" disabled={loading} className="btn">
//           {loading ? "Processing..." : "Place Order"}
//         </button>
//       </form>
//     </div>
//   );
// }