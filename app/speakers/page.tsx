"use client";

import Header from "@/components/header";
import Layout from "@/components/layout";
import React from "react";
import Image from "next/image";
import Product from "@/components/product";
import { useRouter } from "next/navigation";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const data = [
  {
    id: 1,
    name: "ZX9",
    slug: "zx9-speaker",
    description:
      "Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
    desktop_image: "/assets/shared/desktop/image-zx9-speaker.jpg",
    tablet_image: "/assets/shared/mobile/image-zx9-speaker.jpg",
    mobile_image: "/assets/shared/tablet/image-zx9-speaker.jpg",
  },
  {
    id: 2,
    name: "ZX7",
    slug: "zx7-speaker",
    description:
      "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
    desktop_image: "/assets/shared/desktop/image-zx7-speaker.jpg",
    tablet_image: "/assets/shared/mobile/image-zx7-speaker.jpg",
    mobile_image: "/assets/shared/tablet/image-zx7-speaker.jpg",
  },
];

function Speakers() {
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
          Speakers
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
                {data[0].name} <br /> Speaker
              </h3>
            </div>
            <p className="md:w-143 lg:w-111.25 text-[0.9375rem] text-black opacity-50 leading-6.25">
              {data[0].description}
            </p>
            <button
              className="w-40 h-12 bg-[#D87D4A] font-bold text-[0.8125rem] text-white cursor-pointer hover:bg-[#FBAF85]"
              onClick={() => router.push(data[0].slug)}
            >
              SEE PRODUCT
            </button>
          </div>
        </div>
        {/* Category 2 */}
        <div className="w-full flex flex-col-reverse lg:flex-row gap-8 md:gap-16 lg:gap-48 items-center mb-10 lg:mb-20">
          <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">
            <h3 className="text-black text-[1.75rem] md:text-[2.5rem] font-bold leading-11 uppercase">
              {data[1].name} <br /> Speaker
            </h3>
            <p className="md:w-143 lg:w-111.25 text-[0.9375rem] text-black opacity-50 leading-6.25">
              {data[1].description}
            </p>
            <button
              className="w-40 h-12 bg-[#D87D4A] font-bold text-[0.8125rem] text-white cursor-pointer hover:bg-[#FBAF85]"
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
      </div>
      <Product handleClick={handleProductClick} />
    </Layout>
  );
}

export default Speakers;