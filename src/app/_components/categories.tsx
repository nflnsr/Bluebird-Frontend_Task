"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { selectVehiclesCategory } from "@/store/vehicles-slice";
import { VehicleCategory } from "@/types";
import Link from "next/link";

export function Categories() {
  const vehiclesCategory = useSelector(selectVehiclesCategory);

  return (
    <>
      <h1 className="text-center text-3xl font-semibold text-green-400 py-8">
        Categories
      </h1>
      <section className="flex flex-wrap justify-center">
        {vehiclesCategory?.map((category: VehicleCategory) => (
          <div
            key={category.id}
            className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
              <Link href="#">
                <Image
                  className="h-48 w-full object-cover object-center"
                  src={category?.imageURL?.replace(" ", "")}
                  alt={category.name}
                  width={720}
                  height={400}
                />
              </Link>
              <div className="p-4">
                <Link
                  href="#"
                  className="text-lg font-medium text-gray-800 dark:text-white"
                >
                  {category.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
