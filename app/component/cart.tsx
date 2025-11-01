import React from "react";
import Modal from "react-modal";
import { useAtom } from "jotai";
import { cartsAtom } from "../store/globalAtom";
import { data } from "../../components/data";
import Image from "next/image";
import { BiMinus, BiPlus } from "react-icons/bi";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface CART {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Cart({ open, setOpen }: CART) {
  const [cart, setCart] = useAtom(cartsAtom);

  const totalPrice = (
    cart as {
      id: number;
      name: string;
      image: string;
      price?: number;
      quantity: number;
    }[]
  ).reduce(
    (total: number, item: { price?: number; quantity?: number }) =>
      total + ((item.price ?? 0) * (item.quantity ?? 0) || 0),
    0
  );

  function handleSignClick(sign: string, id: number | undefined) {
    if (sign === "plus") {
      setCart((prevCart) => {
        return prevCart.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: (item.quantity ?? 1) + 1,
            };
          }
          return item;
        });
      });
    } else if (sign === "minus") {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        const itemIndex = updatedCart.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          if ((updatedCart[itemIndex].quantity ?? 1) > 0) {
            updatedCart[itemIndex] = {
              ...updatedCart[itemIndex],
              quantity: (updatedCart[itemIndex].quantity ?? 1) - 1,
            };
          } else {
            updatedCart.splice(itemIndex, 1);
          }
        }
        return updatedCart;
      });
    }
  }

  return (
    <Modal
      isOpen={open}
      className="modal"
      overlayClassName="backdrop"
      onRequestClose={() => setOpen(false)}
      shouldCloseOnOverlayClick={true}
    >
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-[1.125rem] font-bold uppercase tracking-[0.08038rem]">
            Cart ({cart.length})
          </h2>
          <div
            className="cursor-pointer text-black opacity-50 underline leading-6.25"
            onClick={() => setCart([])}
          >
            Remove all
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-5">
          {cart.length === 0 && (
            <p className="text-center">No cart item added yet</p>
          )}
          {cart?.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div>
                  {item.image ? (
                    <Image
                      src={item.image || ""}
                      alt="cart-image"
                      width={4 * 16}
                      height={4 * 16}
                      className="rounded-lg"
                      priority
                    />
                  ) : (
                    <Skeleton width={4 * 16} height={4 * 16} />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-black text-[0.9375rem] font-bold leading-6.25">
                    {item.name}
                  </h3>
                  <p className="text-black text-[0.875rem] font-bold opacity-50">
                    ${" "}
                    {item.price && item.quantity && item.price * item.quantity}
                  </p>
                </div>
              </div>
              <div className="bg-[#F1F1F1] w-24 h-8 flex gap-4 justify-center items-center">
                <div
                  className="w-5 h-5 text-black opacity-25 cursor-pointer flex justify-center items-center"
                  onClick={() => handleSignClick("minus", item.id)}
                >
                  <BiMinus />
                </div>
                <div className="text-black text-[0.8125rem] font-bold">
                  {item.quantity}
                </div>
                <div
                  className="w-5 h-5 text-black opacity-25 cursor-pointer flex justify-center items-center"
                  onClick={() => handleSignClick("plus", item.id)}
                >
                  <BiPlus />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <h4 className="text-black text-[0.9375rem] font-medium opacity-50">
            Total
          </h4>
          <h4 className="text-black text-[1.125rem] font-bold">
            $ {totalPrice}
          </h4>
        </div>
        <button
          className="mt-3 bg-[#D87D4A] w-full h-12 text-white text-[0.8125rem] font-bold uppercase"
          disabled={cart.length === 0}
        >
          CHECKOUT
        </button>
      </div>
    </Modal>
  );
}

export default Cart;