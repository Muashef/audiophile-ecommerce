import React from "react";
import Image from "next/image";
import { nav } from "./header";
import Link from "next/link";

function Footer() {
  return (
    <div className="w-full h-163.5 md:h-100 lg:h-91.25 footer mt-32 lg:mt-40">
      <div className="container">
        <div className="flex justify-center md:justify-start items-center md:items-start">
          <div className="w-25.25 h-1 bg-[#D87D4A]"></div>
        </div>
        <div className="h-88 pt-10 md:pt-20 flex flex-col gap-14 md:gap-8">
          <div className="flex flex-col lg:flex-row justify-between items-center md:items-start lg:items-center">
            <div>
              <Image
                src="/assets/shared/desktop/logo.svg"
                alt="logo"
                width={8.9375 * 16}
                height={1.5625 * 16}
                priority
              />
            </div>
            <div className="flex flex-col md:flex-row gap-7 md:gap-14 mt-10 md:mt-8 lg:mt-0 text-center md:text-left">
              {nav.map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  className="text-white text-[0.8125rem] font-bold uppercase hover:text-[#D87D4A] transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-end lg:items-center">
            <div className="flex flex-col gap-10">
              <p className="text-white opacity-50 text-[0.9375rem] font-medium lg:w-135 text-center md:text-left">
                Audiophile is an all in one stop to fulfill your audio needs.
                We&apos;re a small team of music lovers and sound specialists who are
                devoted to helping you get the most out of personal audio. Come
                and visit our demo facility - we&apos;re open 7 days a week.
              </p>
              <div className="flex flex-col md:flex-row gap-10 justify-between items-center mt-10 lg:mt-0">
                <p className="text-white opacity-50 text-[0.9375rem] font-bold lg:mt-10">
                  Copyright 2021. All Rights Reserved
                </p>
                <div className="lg:hidden flex items-center gap-5">
                  <div>
                    <Image
                      src="/assets/shared/desktop/icon-facebook.svg"
                      className="cursor-pointer"
                      alt="icon-facebook"
                      width={1.5 * 16}
                      height={1.5 * 16}
                      priority
                    />
                  </div>
                  <div>
                    <Image
                      src="/assets/shared/desktop/icon-twitter.svg"
                      className="cursor-pointer"
                      alt="icon-facebook"
                      width={1.5 * 16}
                      height={1.219 * 16}
                      priority
                    />
                  </div>
                  <div>
                    <Image
                      src="/assets/shared/desktop/icon-instagram.svg"
                      className="cursor-pointer"
                      alt="icon-facebook"
                      width={1.5 * 16}
                      height={1.5 * 16}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-5">
              <div>
                <Image
                  src="/assets/shared/desktop/icon-facebook.svg"
                  className="cursor-pointer"
                  alt="icon-facebook"
                  width={1.5 * 16}
                  height={1.5 * 16}
                  priority
                />
              </div>
              <div>
                <Image
                  src="/assets/shared/desktop/icon-twitter.svg"
                  className="cursor-pointer"
                  alt="icon-facebook"
                  width={1.5 * 16}
                  height={1.219 * 16}
                  priority
                />
              </div>
              <div>
                <Image
                  src="/assets/shared/desktop/icon-instagram.svg"
                  className="cursor-pointer"
                  alt="icon-facebook"
                  width={1.5 * 16}
                  height={1.5 * 16}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;