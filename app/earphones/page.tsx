"use client";

import Layout from "@/components/layout";
import React from "react";
import Header from "@/components/header";
import Image from "next/image";
import Product from "@/components/product";
import { useRouter } from "next/navigation";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const data = [
  {
    id: 1,
    name: "YX1 WIRELESS",
    slug: "yx1-earphones",
    description:
      "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    desktop_image:
      "/assets/product-yx1-earphones/desktop/image-category-page-preview.jpg",
    tablet_image:
      "/assets/product-yx1-earphones/tablet/image-category-page-preview.jpg",
    mobile_image:
      "/assets/product-yx1-earphones/mobile/image-category-page-preview.jpg",
  },
];

function Earphones() {
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
      <div className="h-[12rem] md:h-[21rem] bg-black">
        <Header border />
        <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold text-white uppercase tracking-[0.08931rem] flex justify-center items-center mt-8 md:mt-20">
          Earphones
        </h2>
      </div>
      {/* Category 1 */}
      <div className="container w-full flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-48 items-center mt-24 mb-10 md:mb-20 lg:mb-32">
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
            <h3 className="text-black text-[1.75rem] md:text-[2.5rem] font-bold leading-[2.75rem] uppercase">
              {data[0].name} <br /> Earphones
            </h3>
          </div>
          <p className="md:w-[35.75rem] lg:w-[27.8125rem] text-[0.9375rem] text-black opacity-50 leading-[1.5625rem]">
            {data[0].description}
          </p>
          <button
            className="w-[10rem] h-[3rem] bg-[#D87D4A] font-bold text-[0.8125rem] text-white cursor-pointer"
            onClick={() => router.push(data[0].slug)}
          >
            SEE PRODUCT
          </button>
        </div>
      </div>
      <Product handleClick={handleProductClick} />
    </Layout>
  );
}

export default Earphones;