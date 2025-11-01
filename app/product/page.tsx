"use client";

import Header from "@/components/header";
import Layout from "@/components/layout";
import Product from "@/components/product";
import React, { useState } from "react";
import { data } from "../../components/data";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useAtom } from "jotai";
import { cartsAtom } from "../store/globalAtom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductPage() {
  const [count, setCount] = useState(1);
  const router = useRouter();
  const params = useParams();

  const [carts, setCart] = useAtom(cartsAtom);

  const product = data.find((product) => product.slug === params?.product);

  const notify = (text: string) => toast(text);

  const handleClick = () => {
    const cart = {
      id: product?.id,
      image: product?.cart?.image,
      name: product?.cart?.name,
      price: product?.price,
      quantity: count,
    };
    const itemExists = carts.some((item) => item.id === cart.id);
    if (itemExists) {
      notify("Item exists in cart already!");
    } else {
      setCart((prev) => [...prev, cart]);
      notify("Item added to cart!");
    }
  };

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
    <Layout>
      {/* Header */}
      <div className="bg-black h-[6.0625rem]">
        <Header border={false} />
      </div>
      <div className="container lg:max-w-[69.375rem] mt-8 md:mt-24 mx-auto">
        <div
          className="text-black text-[0.9375rem] font-medium opacity-50 cursor-pointer"
          onClick={() => router.back()}
        >
          Go Back
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-24 mt-7 md:mt-14">
          {/* Desktop Image */}
          <div className="hidden lg:block">
            {product?.image?.desktop ? (
              <Image
                src={product?.image.desktop}
                alt="product_image"
                width={33.75 * 16}
                height={35 * 16}
                priority
              />
            ) : (
              <Skeleton width={33.75 * 16} height={35 * 16} />
            )}
          </div>
          {/* Tablet Image */}
          <div className="hidden md:block lg:hidden">
            {product?.image?.tablet ? (
              <Image
                src={product?.image.tablet}
                alt="product_image"
                width={17.5625 * 16}
                height={30 * 16}
                priority
              />
            ) : (
              <Skeleton width={17.5625 * 16} height={30 * 16} />
            )}
          </div>
          {/* Mobile Image */}
          <div className="md:hidden w-full">
            {product?.image?.mobile ? (
              <Image
                src={product?.image.mobile}
                alt="product_image"
                width={13.9375 * 16}
                height={19.875 * 16}
                layout="responsive"
                priority
              />
            ) : (
              <Skeleton height={19.875 * 16} />
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-[#D87D4A] text-[0.875rem] font-normal tracking-[0.625rem]">
                NEW PRODUCT
              </p>
              <h3 className="text-black text-[1.75rem] lg:text-[2.5rem] font-bold leading-[2rem] lg:leading-[2.75rem] uppercase">
                {product?.name} <br />
              </h3>
            </div>
            <p className="md:w-[21.1875rem] lg:w-[27.8125rem] text-[0.9375rem] text-black font-medium opacity-50 leading-[1.5625rem]">
              {product?.description}
            </p>
            <p className="text-black text-[1.125rem] font-bold">
              $ {product?.price}
            </p>
            <div className="flex items-center gap-5">
              <div className="w-[7.5rem] h-[3rem] bg-[#F1F1F1] flex items-center justify-center gap-5">
                <div
                  className="text-[1rem] font-bold opacity-[0.25] cursor-pointer"
                  onClick={() => count !== 1 && setCount((prev) => prev - 1)}
                >
                  -
                </div>
                <div className="text-[1rem] font-bold">{count}</div>
                <div
                  className="text-[1rem] font-bold opacity-[0.25] cursor-pointer"
                  onClick={() => setCount((prev) => prev + 1)}
                >
                  +
                </div>
              </div>
              <button
                className="w-[10rem] h-[3rem] bg-[#D87D4A] font-bold text-[0.8125rem] text-white"
                onClick={handleClick}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-24 md:gap-32 mt-28 md:mt-32">
          <div className="flex flex-col gap-6">
            <h3 className="text-[1.5rem] md:text-[2rem] font-bold uppercase tracking-[0.05356rem] md:tracking-[0.07144rem] leading-[2.25rem]">
              Features
            </h3>
            <p className="lg:w-[39.6875rem] text-[0.9375rem] font-medium leading-[1.5625rem] opacity-50">
              {product?.featuresA}
            </p>
            <p className="lg:w-[39.6875rem] text-[0.9375rem] font-medium leading-[1.5625rem] opacity-50">
              {product?.featuresB}
            </p>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-col gap-6 md:gap-32 lg:gap-6">
            <h3 className="text-[2rem] font-bold uppercase tracking-[0.07144rem] leading-[2.25rem]">
              In the Box
            </h3>
            <div className="flex flex-col gap-3">
              {product?.includes.map((item) => (
                <div key={item.item} className="flex items-center gap-5">
                  <p className="text-[#D87D4A] text-[0.9375rem] font-bold">
                    {item.quantity}x
                  </p>
                  <p className="text-[0.9375rem] font-medium text-black opacity-50">
                    {item.item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mx-auto w-full md:w-[43.125rem] lg:w-[69.375rem] md:h-[23rem] lg:h-[37rem] justify-between mt-24 md:mt-40 mb-32">
          <div className="flex flex-col gap-4 w-full md:w-[17.3125rem] lg:w-[28rem]">
            <div className="h-full w-full">
              {/* Desktop Image */}
              <img
                src={product?.gallery.first.desktop}
                alt="gallery_image"
                className="hidden lg:block object-cover w-full h-full rounded-[0.5rem]"
              />
              {/* Tablet Image */}
              <img
                src={product?.gallery.first.tablet}
                alt="gallery_image"
                className="hidden md:block lg:hidden object-cover w-full h-full rounded-[0.5rem]"
              />
              {/* Mobile Image */}
              <img
                src={product?.gallery.first.mobile}
                alt="gallery_image"
                className="md:hidden object-cover w-full h-[10.875rem] rounded-[0.5rem]"
              />
            </div>
            <div className="h-full w-full">
              {/* Desktop Image */}
              <img
                src={product?.gallery.second.desktop}
                alt="gallery_image"
                className="hidden lg:block object-cover w-full h-full rounded-[0.5rem]"
              />
              {/* Tablet Image */}
              <img
                src={product?.gallery.second.tablet}
                alt="gallery_image"
                className="hidden md:block lg:hidden object-cover w-full h-full rounded-[0.5rem]"
              />
              {/* Mobile Image */}
              <img
                src={product?.gallery.second.mobile}
                alt="gallery_image"
                className="md:hidden object-cover w-full h-full rounded-[0.5rem]"
              />
            </div>
          </div>
          <div className="w-full md:w-[24.6875rem] lg:w-[39.6875rem] h-full">
            {/* Desktop Image */}
            <img
              src={product?.gallery.third.desktop}
              alt="gallery_image"
              className="hidden lg:block object-cover w-full h-full rounded-[0.5rem]"
            />
            {/* Tablet Image */}
            <img
              src={product?.gallery.third.tablet}
              alt="gallery_image"
              className="hidden md:block lg:hidden object-cover w-full h-[23rem] rounded-[0.5rem]"
            />
            {/* Mobile Image */}
            <img
              src={product?.gallery.third.mobile}
              alt="gallery_image"
              className="md:hidden object-cover w-full h-full rounded-[0.5rem] mt-4 md:mt-0"
            />
          </div>
          {/* <div className="flex flex-col gap-5 w-full">
            <Image
              src={product?.gallery.first.desktop}
              alt="gallery_image"
              width={27.8125 * 16}
              height={17.5 * 16}
              style={{ width: 'auto', height: 'auto' }}
              layout="responsive"
              className="rounded-[0.5rem]"
            />
            <Image
              src={product?.gallery.second.desktop}
              alt="gallery_image"
              width={27.8125 * 16}
              height={17.5 * 16}
              style={{ width: 'auto', height: 'auto' }}
              layout="responsive"
              className="rounded-[0.5rem]"
            />
          </div>
          <div className="col-span-2 h-full w-full">
          <Image
              src={product?.gallery.third.desktop}
              alt="gallery_image"
              width={39.6875 * 16}
              height={35 * 16}
              style={{ width: 'auto', height: 'auto' }}
              layout="responsive"
              className="rounded-[0.5rem] object-cover"
            />
          </div> */}
        </div>
        <div className="flex flex-col gap-10 mb-48">
          <h3 className="text-[1.5rem] md:text-[2rem] font-bold text-black tracking-[0.05356rem] md:tracking-[0.07144rem] uppercase text-center">
            You may also like
          </h3>
          <div className="flex flex-col md:flex-row gap-16">
            {product?.others.map((item) => (
              <div key={item.slug} className="flex flex-col gap-4">
                <div>
                  {/* Desktop Image */}
                  <Image
                    src={item.image.desktop}
                    alt="product-image"
                    width={21.875 * 16}
                    height={19.875 * 16}
                    className="hidden lg:block"
                  />
                  {/* Tablet Image */}
                  <Image
                    src={item.image.tablet}
                    alt="product-image"
                    width={13.9375 * 16}
                    height={19.875 * 16}
                    className="hidden md:block lg:hidden"
                  />
                  {/* Mobile Image */}
                  <Image
                    src={item.image.mobile}
                    alt="product-image"
                    width={20.4375 * 16}
                    height={7.5 * 16}
                    className="md:hidden"
                    layout="responsive"
                  />
                </div>
                <div className="flex flex-col gap-4 justify-center items-center">
                  <h3 className="text-[1.5rem] font-bold text-black text-center">
                    {item.name}
                  </h3>
                  <button
                    className="w-[10rem] h-[3rem] bg-[#D87D4A] font-bold text-[0.8125rem] text-white"
                    onClick={() => router.push(item.slug)}
                  >
                    SEE PRODUCT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Product handleClick={handleProductClick} />
      <ToastContainer position="bottom-center" />
    </Layout>
  );
}

export default ProductPage;