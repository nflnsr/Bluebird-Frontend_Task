"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import {
  getVehiclesData,
  vehiclesStatus,
  vehiclesError,
} from "@/store/vehicles-slice";
import { Categories, VehicleList } from "./_components";

export const config = {
  amp: true,
};

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(vehiclesStatus);
  const error = useSelector(vehiclesError);

  useEffect(() => {
    let isMounted = true;
    if (status === "idle" && isMounted) {
      dispatch(getVehiclesData());
    }
    return () => {
      isMounted = false;
    };
  }, [status, dispatch]);

  return (
    <>
      {status === "loading" && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-48 items-center justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
          </div>
        </div>
      )}
      {status === "failed" && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="px-4 text-center">{error && "Something went wrong!"}</p>
        </div>
      )}

      {status === "succeeded" && (
        <main className="px-4 sm:px-8">
          <Categories />
          <VehicleList />
        </main>
      )} 

    </>
  );
}
