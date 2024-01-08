"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { selectVehiclesType, toggleLike } from "@/store/vehicles-slice";
import { Love } from "@/assets/icon";
import { CarType, VehicleType } from "@/types";
import Link from "next/link";

export function VehicleList() {
  const dispatch = useDispatch();
  const vehiclesType = useSelector(selectVehiclesType) as VehicleType[];

  console.log(vehiclesType, "vehiclesTypee");

  return (
    <>
      <h1 className="py-12 text-center text-3xl font-semibold text-green-400">
        Vehicle List
      </h1>
      <section className="flex flex-wrap justify-center">
        {vehiclesType?.map((vehicleType: VehicleType) => (
          <div
            key={vehicleType.id}
            className="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            {vehicleType.car_type.map((carType: CarType) => (
              <div
                key={carType.id}
                className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
              >
                <Link href={`vehicle/${carType.id}`}>
                  <Image
                    className="h-48 w-full object-cover object-center"
                    src={carType?.imageURL?.replace(" ", "")}
                    alt={carType.vehicle}
                    width={720}
                    height={400}
                    sizes="100vw"
                  />
                </Link>
                <div className="p-4">
                  <Link
                    href={`vehicle/${carType.id}`}
                    className="text-lg font-medium text-gray-800 dark:text-white"
                  >
                    {carType.vehicle}
                  </Link>
                </div>

                <div className="flex justify-between p-4">
                  <Link
                    href={`vehicle/${carType.id}`}
                    className="text-lg font-medium text-gray-800 dark:text-white"
                  >
                    {carType.price}
                  </Link>

                  <div className="flex select-none items-center">
                    <span
                      onClick={() => {
                        dispatch(toggleLike({ id: carType.id }));
                      }}
                    >
                      <Love
                        className={`h-6 w-6 cursor-pointer ${
                          carType.isLiked ? "fill-red-400" : "fill-none"
                        }`}
                      />
                    </span>
                    <span className="leading-none text-gray-700 dark:text-gray-300">
                      {carType.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
