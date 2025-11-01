"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Product from "./product";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Cart from "@/app/component/cart";

export const nav = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Headphones",
    path: "/headphones",
  },
  {
    id: 3,
    name: "Speakers",
    path: "/speakers",
  },
  {
    id: 4,
    name: "Earphones",
    path: "/earphones",
  },
];

interface Header {
  border: boolean;
}

function Header({ border }: Header) {
  const [mobileNav, setMobileNav] = useState(false);
  const [cart, setCart] = useState(false);
  const router = useRouter();

  function handleProductClick(slug: string) {
    if (slug === "headphones") {
      router.push("/headphones");
    } else if (slug === "speakers") {
      router.push("/speakers");
    } else {
      router.push("/earphones");
    }
  }

  return (
    <div className="bg-transparent pt-8">
      {cart && <Cart open={cart} setOpen={setCart} />}
      {/* Desktop header */}
      <div className="hidden container lg:flex justify-between items-center">
        <Image
          src="/assets/shared/desktop/logo.svg"
          alt="logo"
          width={8.9375 * 16}
          height={1.5625 * 16}
          priority
        />
        <div className="flex items-center gap-10">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="text-white text-[0.8125rem] font-bold uppercase"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="cursor-pointer" onClick={() => setCart(true)}>
          <Image
            src="/assets/shared/desktop/icon-cart.svg"
            alt="cart"
            width={1.45831 * 16}
            height={1.25 * 16}
            priority
          />
        </div>
      </div>
      {/* Tablet header */}
      <div className="hidden container md:flex lg:hidden items-center justify-between">
        <div className="flex gap-5 items-center">
          <Image
            src="/assets/shared/tablet/icon-hamburger.svg"
            alt="hamburger-icon"
            width={16}
            height={15}
            priority
            onClick={() => setMobileNav(true)}
          />
          <Image
            src={"assets/shared/desktop/logo.svg"}
            alt="logo"
            width={143}
            height={25}
            priority
          />
        </div>
        <div className="cursor-pointer" onClick={() => setCart(true)}>
          <Image
            src="/assets/shared/desktop/icon-cart.svg"
            alt="cart-icon"
            width={23}
            height={20}
            priority
          />
        </div>
      </div>
      {/* Mobile header */}
      <div className="container flex md:hidden items-center justify-between">
        <div onClick={() => setMobileNav(mobileNav ? false : true)}>
          <Image
            src="/assets/shared/tablet/icon-hamburger.svg"
            alt="hamburger-icon"
            width={16}
            height={15}
            priority
          />
        </div>
        <div onClick={() => router.push("/")}>
          <Image
            src="/assets/shared/desktop/logo.svg"
            alt="logo"
            width={143}
            height={25}
            priority
          />
        </div>
        <div onClick={() => setCart(true)}>
          <Image
            src="/assets/shared/desktop/icon-cart.svg"
            alt="cart-icon"
            width={23}
            height={20}
            priority
          />
        </div>
      </div>
      {border && (
        <div className="container w-full h-px bg-[rgba(255,255,255,0.2)] mt-8"></div>
      )}

      {mobileNav && (
        <div className="md:hidden fixed top-0 right-0 bg-white h-full w-full z-10 overflow-y-auto">
          <div
            className="ml-auto w-fit mr-1 mt-1"
            onClick={() => setMobileNav(false)}
          >
            <AiFillCloseCircle size={32} />
          </div>
          <div className="-mt-20">
            <Product handleClick={handleProductClick} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;