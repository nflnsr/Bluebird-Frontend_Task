"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { selectMyBook } from "@/store/vehicles-slice";
import { Car } from "@/types";
import Link from "next/link";

export default function MyBook() {
  const myBook = useSelector(selectMyBook) as Car[];
  const total = myBook.reduce(
    (acc, item) =>
      acc + Number(item.price.replace("IDR ", "").replaceAll(".", "")),
    0,
  );

  return (
    <>
      <section>
        <h1 className="text-center text-2xl font-bold text-green-400">
          MyBook
        </h1>
        <div className="grid grid-cols-1 gap-16 px-10 py-8 md:grid-cols-2 xl:px-36">
          {myBook.map((list, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-lg bg-gray-100 max-[435px]:flex-col max-[435px]:pb-4 min-[435px]:pr-4"
            >
              <div className="relative h-full w-full max-w-96">
                <Image
                  src={list?.imageURL || ""}
                  alt="vehicle image"
                  sizes="100vw"
                  width={0}
                  height={0}
                  className="h-[155px] w-full min-[500px]:h-52 md:h-64"
                  unoptimized
                />
              </div>
              <div className="max-w-1/3 rounded-lg bg-white px-4">
                <p className="text-2xl font-bold">{list.vehicle}</p>
                <p className="text-xl ">{list.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`w-full px-10 text-end text-xl font-semibold xl:px-36 ${
            (myBook.length === 1 && "mb-48") || (myBook.length === 2 && "mb-48")
          }`}
        >
          {total ? `Total: Rp.${total}` : ""}
        </div>
        {myBook.length === 0 && (
          <div className="min-h-[calc(100svh-72px-80px-64px-32px)]">
            <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
              <p>You have no books.</p>
              <Link href="/" className="text-blue-400 underline">
                Book Now!
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
