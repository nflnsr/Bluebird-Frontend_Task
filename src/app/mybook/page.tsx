"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import {
  selectMyBook,
} from "@/store/vehicles-slice";
import { CarType, VehicleType } from "@/types";

export default function MyBook() {
  const myBook = useSelector(selectMyBook) as CarType[];

  return (
    <>
      <section>
        <h1 className="text-center text-2xl font-bold text-green-400">
          MyBook
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-16 px-10 md:grid-cols-2 xl:px-36">
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
                />
              </div>
              <div className=" max-w-1/3 rounded-lg bg-white px-4">
                <p className="text-2xl font-bold">{list.vehicle}</p>
                <p className="text-xl ">{list.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
