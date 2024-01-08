"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  selectVehiclesType,
  selectMyBook,
  toggleLike,
  addToMyBook,
} from "@/store/vehicles-slice";
import { CarType, VehicleType } from "@/types";
import { Love } from "@/assets/icon";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const dispatch = useDispatch();
  const vehiclesType = useSelector(selectVehiclesType) as VehicleType[];
  const myBook = useSelector(selectMyBook) as CarType[];
  const [vehicle, setVehicle] = useState<CarType>();
  console.log(vehiclesType, "vehiclesTypee");
  console.log(vehicle, "vehicle");
  useEffect(() => {
    vehiclesType?.map((vehicle) => {
      vehicle?.car_type.map((typeItem) => {
        if (typeItem.id === params.id) {
          setVehicle(typeItem);
        }
        console.log(typeItem, "typeItem");
        console.log(params.id, "id");
      });
    });
    console.log(myBook, "myBookk");
  }, [params.id, vehiclesType, myBook]);

  return (
    <>
      <section className="flex h-[calc(100svh-72px)] w-full items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center justify-center gap-2 bg-gray-200 px-5 py-6 min-[435px]:px-16 md:flex-row md:gap-0 md:py-20">
          <div className="relative h-full w-full">
            <Image
              src={vehicle?.imageURL || ""}
              alt="vehicle image"
              width={100}
              height={100}
              sizes="100vw"
              className="h-[155px] w-full min-[500px]:h-52 md:h-64"
            />
          </div>
          <div className="w-full max-w-72 rounded-xl bg-gray-50 px-5 py-8 ring-2 ring-slate-300 md:max-w-64 md:px-4">
            <p className="text-2xl font-bold">{vehicle?.vehicle}</p>
            <p className="text-xl">{vehicle?.price}</p>
            <div className="my-5 text-lg">
              <p>Description:</p>
              {vehicle?.description.map((desc) => {
                return <p key={desc}>- {desc}</p>;
              })}
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <span
                  onClick={() => {
                    dispatch(toggleLike({ id: vehicle?.id }));
                  }}
                >
                  <Love
                    className={`h-6 w-6 cursor-pointer ${
                      vehicle?.isLiked ? "fill-red-400" : "fill-none"
                    }`}
                  />
                </span>
                <p>{vehicle?.likes}</p>
              </div>
              <div>
                <button
                  className="rounded-lg bg-green-400 px-4 py-2 text-white"
                  onClick={() => {
                    dispatch(addToMyBook({ id: vehicle?.id }));
                  }}
                >
                  <Link href="/mybook">Book Now</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
