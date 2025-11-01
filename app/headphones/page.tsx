"use client";

import Header from "@/components/header";
import Layout from "@/components/layout";
import Product from "@/components/product";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const data = [
  {
    id: 1,
    name: "XX99 Mark II",
    slug: "xx99-mark-two-headphones",
    description:
      "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    new: "true",
    desktop_image: "/assets/shared/desktop/image-xx99-mark-two-headphones.jpg",
    tablet_image: "/assets/shared/mobile/image-xx99-mark-two-headphones.jpg",
    mobile_image: "/assets/shared/tablet/image-xx99-mark-two-headphones.jpg",
  },
  {
    id: 2,
    name: "XX99 Mark I",
    slug: "xx99-mark-one-headphones",
    description:
      "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
    new: "false",
    desktop_image: "/assets/shared/desktop/image-xx99-mark-one-headphones.jpg",
    tablet_image: "/assets/shared/mobile/image-xx99-mark-one-headphones.jpg",
    mobile_image: "/assets/shared/tablet/image-xx99-mark-one-headphones.jpg",
  },
  {
    id: 3,
    name: "XX59",
    slug: "xx59-headphones",
    description:
      "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    new: "false",
    desktop_image: "/assets/shared/desktop/image-xx59-headphones.jpg",
    tablet_image: "/assets/shared/mobile/image-xx59-headphones.jpg",
    mobile_image: "/assets/shared/mobile/image-xx59-headphones.jpg",
  },
];

function Headphones() {
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
    <Layout>
      {/* header */}
      <div className="h-48 md:h-84 bg-black">
        <Header border />
        <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-white uppercase tracking-[0.08931rem] flex justify-center items-center mt-8 md:mt-20">
          Headphones
        </h2>
      </div>
      <div className="container flex flex-col justify-center items-center gap-24 md:gap-32 mt-24">
        {/* Category 1 */}
        <div className="w-full flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-48 items-center">
          {/* Desktop Image */}
          <div className="hidden lg:block">
            {data[0].desktop_image ? (
              <Image
                src={data[0].desktop_image}
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
          <div className="hidden md:block lg:hidden w-full">
            {data[0].tablet_image ? (
              <Image
                src={data[0].tablet_image}
                alt="product_image"
                width={43.0625 * 16}
                height={22 * 16}
                style={{ width: "auto", height: "auto" }}
                layout="responsive"
                priority
              />
            ) : (
              <Skeleton height={22 * 16} />
            )}
          </div>
          {/* Mobile Image */}
          <div className="md:hidden w-full">
            {data[0].mobile_image ? (
              <Image
                src={data[0].mobile_image}
                alt="product_image"
                width={20.4375 * 16}
                height={22 * 16}
                style={{ width: "auto", height: "auto" }}
                layout="responsive"
                priority
              />
            ) : (
              <Skeleton height={22 * 16} />
            )}
          </div>
          <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">
            <div className="flex flex-col gap-1">
              <p className="text-[#D87D4A] text-[0.875rem] font-normal tracking-[0.625rem]">
                NEW PRODUCT
              </p>
              <h3 className="text-black text-[1.75rem] md:text-[2.5rem] font-bold leading-11 uppercase">
                {data[0].name} <br /> Headphones
              </h3>
            </div>
            <p className="md:w-143 lg:w-111.25 text-[0.9375rem] text-black opacity-50 leading-6.25">
              {data[0].description}
            </p>
            <button
              className="w-40 h-12 bg-[#D87D4A] font-bold text-[0.8125rem] text-white"
              onClick={() => router.push(data[0].slug)}
            >
              SEE PRODUCT
            </button>
          </div>
        </div>
        {/* Category 2 */}
        <div className="w-full flex flex-col-reverse lg:flex-row gap-8 md:gap-16 lg:gap-48 items-center">
          <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">
            <h3 className="text-black text-[1.75rem] md:text-[2.5rem] font-bold leading-11 uppercase">
              {data[1].name} <br /> Headphones
            </h3>
            <p className="md:w-143 lg:w-111.25 text-[0.9375rem] text-black opacity-50 leading-6.25">
              {data[1].description}
            </p>
            <button
              className="w-40 h-12 bg-[#D87D4A] font-bold text-[0.8125rem] text-white"
              onClick={() => router.push(data[1].slug)}
            >
              SEE PRODUCT
            </button>
          </div>
          {/* Desktop Image */}
          <div className="hidden lg:block">
            {data[1].desktop_image ? (
              <Image
                src={data[1].desktop_image}
                alt="product_image"
                width={33.75 * 16}
                height={35 * 16}
              />
            ) : (
              <Skeleton width={33.75 * 16} height={35 * 16} />
            )}
          </div>
          {/* Tablet Image */}
          <div className="hidden md:block lg:hidden w-full">
            {data[1].tablet_image ? (
              <Image
                src={data[1].tablet_image}
                alt="product_image"
                width={43.0625 * 16}
                height={22 * 16}
                style={{ width: "auto", height: "auto" }}
                layout="responsive"
              />
            ) : (
              <Skeleton height={22 * 16} />
            )}
          </div>
          {/* Mobile Image */}
          <div className="md:hidden w-full">
            {data[1].mobile_image ? (
              <Image
                src={data[1].mobile_image}
                alt="product_image"
                width={20.4375 * 16}
                height={22 * 16}
                style={{ width: "auto", height: "auto" }}
                layout="responsive"
              />
            ) : (
              <Skeleton height={22 * 16} />
            )}
          </div>
        </div>
        {/* Category 3 */}
        <div className="w-full flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-48 items-center mb-10 lg:mb-20">
          {/* Desktop Image */}
          <div className="hidden lg:block">
            {data[2].desktop_image ? (
              <Image
                src={data[2].desktop_image}
                alt="product_image"
                width={33.75 * 16}
                height={35 * 16}
              />
            ) : (
              <Skeleton width={33.75 * 16} height={35 * 16} />
            )}
          </div>
          {/* Tablet Image */}
          <div className="hidden md:block lg:hidden w-full">
            {data[2].tablet_image ? (
              <Image
                src={data[2].tablet_image}
                alt="product_image"
                width={43.0625 * 16}
                height={22 * 16}
                style={{ width: "auto", height: "auto" }}
                layout="responsive"
              />
            ) : (
              <Skeleton height={22 * 16} />
            )}
          </div>
          {/* Mobile Image */}
          <div className="md:hidden w-full">
            {data[2].mobile_image ? (
              <Image
                src={data[2].mobile_image}
                alt="product_image"
                width={20.4375 * 16}
                height={22 * 16}
                style={{ width: "auto", height: "auto" }}
                layout="responsive"
              />
            ) : (
              <Skeleton height={22 * 16} />
            )}
          </div>
          <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">
            <h3 className="text-black text-[1.75rem] md:text-[2.5rem] font-bold leading-11 uppercase">
              {data[2].name} <br /> Headphones
            </h3>
            <p className="md:w-143 lg:w-111.25 text-[0.9375rem] text-black opacity-50 leading-6.25">
              {data[2].description}
            </p>
            <button
              className="w-40 h-12 bg-[#D87D4A] font-bold text-[0.8125rem] text-white"
              onClick={() => router.push(data[2].slug)}
            >
              SEE PRODUCT
            </button>
          </div>
        </div>
      </div>
      <Product handleClick={handleProductClick} />
    </Layout>
  );
}

export default Headphones;