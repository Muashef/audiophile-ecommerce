import React from "react";
import Image from "next/image";

function LastSection() {
  return (
    <div className="container mt-20 md:mt-32 lg:mt-40 flex flex-col-reverse lg:flex-row justify-between items-center">
      <div className="flex flex-col gap-8 text-center lg:text-start">
        <h4 className="md:hidden lg:block text-[1.75rem] lg:text-[2.75rem] font-bold uppercase leading-normal lg:leading-11 tracking-[0.0625rem] lg:tracking-[0.08931rem]">
          Bringing you the <br /> <span className="text-[#D87D4A]">best</span>{" "}
          audio gear
        </h4>
        <h4 className="hidden md:block lg:hidden text-[2.75rem] font-bold uppercase leading-11 tracking-[0.08931rem]">
          Bringing you the <span className="text-[#D87D4A]">best</span>{" "}
          <br />audio gear
        </h4>
        <p className="md:w-143.25 lg:w-111.25 text-[0.9375rem] font-medium opacity-50">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div className="md:hidden w-full mb-10 md:mb-20 lg:mb-0">
        <Image
          src="/assets/shared/mobile/image-best-gear.jpg"
          alt="image-best-gear"
          width={20.4375 * 16}
          height={12.5 * 16}
          style={{ width: "auto", height: "auto" }}
          priority
          className="rounded-lg"
          layout="responsive"
        />
      </div>
      <div className="hidden md:block lg:hidden w-full mb-20">
        <Image
          src="/assets/shared/tablet/image-best-gear.jpg"
          alt="image-best-gear"
          width={43.0625 * 16}
          height={36.75 * 16}
          style={{ width: "auto", height: "auto" }}
          priority
          className="rounded-lg"
          layout="responsive"
        />
      </div>
      <div className="hidden lg:block">
        <Image
          src="/assets/shared/desktop/image-best-gear.jpg"
          alt="image-best-gear"
          width={33.75 * 16}
          height={36.75 * 16}
          priority
          className="rounded-lg"
        />
      </div>
    </div>
  );
}

export default LastSection;