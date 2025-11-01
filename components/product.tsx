"use client";
import headphones from "../public/assets/shared/desktop/image-category-thumbnail-headphones.png";
import speakers from "../public/assets/shared/desktop/image-category-thumbnail-speakers.png";
import earphones from "../public/assets/shared/desktop/image-category-thumbnail-earphones.png";
import arrow from "../public/assets/shared/desktop/icon-arrow-right.svg";
import React from "react";
import Image from "next/image";

export interface PRODUCT {
  handleClick: Function;
}

function Product({ handleClick }: PRODUCT) {
  return (
    <div className="container mt-36 mb-28 flex flex-col md:flex-row items-center md:items-end justify-center gap-20 md:gap-5 lg:gap-20">
      <div className="w-81.75 md:w-87.5 h-41.25 md:h-51 rounded-lg bg-[#F1F1F1] flex flex-col items-center">
        <Image
          className="-mt-16"
          src={headphones}
          alt="headphones"
          width={12 * 16}
          height={10 * 16}
          priority
        />
        <h2 className="text-[1.125rem] font-bold uppercase -mt-6 md:-mt-3">
          Headphones
        </h2>
        <div
          className="flex items-center gap-2 mt-3 cursor-pointer"
          onClick={() => handleClick("headphones")}
        >
          <span className="text-[0.8125rem] font-bold opacity-50">SHOP</span>
          <Image
            src={arrow}
            alt="icon-arrow-right"
            width={0.3125 * 16}
            height={0.625 * 16}
            priority
          />
        </div>
      </div>
      <div className="w-81.75 md:w-87.5 h-41.25 md:h-51 rounded-lg bg-[#F1F1F1] flex flex-col items-center">
        <Image
          className="-mt-16"
          src={speakers}
          alt="headphones"
          width={12 * 16}
          height={10 * 16}
          priority
        />
        <h2 className="text-[1.125rem] font-bold uppercase -mt-6 md:-mt-3">
          Speakers
        </h2>
        <div
          className="flex items-center gap-2 mt-3 cursor-pointer"
          onClick={() => handleClick("speakers")}
        >
          <span className="text-[0.8125rem] font-bold opacity-50">SHOP</span>
          <Image
            src={arrow}
            alt="icon-arrow-right"
            width={0.3125 * 16}
            height={0.625 * 16}
            priority
          />
        </div>
      </div>
      <div className="w-81.75 md:w-87.5 h-41.25 md:h-51 rounded-lg bg-[#F1F1F1] flex flex-col items-center">
        <Image
          className="-mt-16"
          src={earphones}
          alt="headphones"
          width={12 * 16}
          height={10 * 16}
          priority
        />
        <h2 className="text-[1.125rem] font-bold uppercase -mt-6 md:-mt-3">
          Earphones
        </h2>
        <div
          className="flex items-center gap-2 mt-3 cursor-pointer"
          onClick={() => handleClick("earphones")}
        >
          <span className="text-[0.8125rem] font-bold opacity-50">SHOP</span>
          <Image
            src="/assets/shared/desktop/icon-arrow-right.svg"
            alt="icon-arrow-right"
            width={0.3125 * 16}
            height={0.625 * 16}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Product;