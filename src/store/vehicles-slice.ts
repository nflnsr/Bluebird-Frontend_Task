import axios, { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios-instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { VehicleCategory, VehicleType, CarType } from "@/types";

type Data = {
  category: VehicleCategory[];
  type: VehicleType[];
  myBook: CarType[];
  wishlist: CarType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
};

const initialState: Data = {
  category: [] as VehicleCategory[],
  type: [] as VehicleType[],
  myBook: [] as CarType[],
  wishlist: [] as CarType[],
  status: "idle",
  error: "",
};

export const getVehiclesData = createAsyncThunk(
  "vehicles/getAllvehicles",
  async () => {
    try {
      const { data } = await axiosInstance.get("/vehicles");
      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError: AxiosError = err;
        console.error(axiosError.stack);
        throw new Error(axiosError.stack);
      }
      console.error(err);
      throw new Error(String(err));
    }
  },
);

export const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const { id } = action.payload;
      state.type.map((typeItem: VehicleType) => {
        typeItem.car_type.map((carItem: CarType) => {
          if (carItem.id === id) {
            carItem.isLiked = !carItem.isLiked;
            carItem.isLiked ? carItem.likes++ : carItem.likes--;
            const index = state.wishlist.findIndex((car) => car.id === id);
            const carExist = state.wishlist.find((car) => car.id === id);
            if (!carExist) state.wishlist.push(carItem);
            else state.wishlist.splice(index, 1);
          }
        });
      });
    },
    addToMyBook: (state, action) => {
      const { id } = action.payload;
      state.type.map((typeItem: VehicleType) => {
        typeItem.car_type.map((carItem: CarType) => {
          if (carItem.id === id) {
            state.myBook.push(carItem);
          }
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVehiclesData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getVehiclesData.fulfilled, (state, action) => {
      let id = 1;
      const modifiedData = action.payload.type?.map(
        (typeItem: { car_type: CarType }) => {
          typeItem.car_type.map(
            (carItem: { id: string; likes: number; isLiked: boolean }) => {
              carItem.id = String(id++);
              carItem.likes = Math.floor(Math.random() * 10) + 1;
              carItem.isLiked = false;
            },
          );
          return typeItem;
        },
      );
      state.status = "succeeded";
      state.category = action.payload.category;
      state.type = modifiedData;
    });
    builder.addCase(getVehiclesData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectVehiclesCategory = (state: { vehicles: Data }) =>
  state.vehicles.category;
export const selectVehiclesType = (state: { vehicles: Data }) =>
  state.vehicles.type;
export const selectMyBook = (state: { vehicles: Data }) =>
  state.vehicles.myBook;
export const selectWishlist = (state: { vehicles: Data }) =>
  state.vehicles.wishlist;
export const vehiclesStatus = (state: { vehicles: Data }) =>
  state.vehicles.status;
export const vehiclesError = (state: { vehicles: Data }) =>
  state.vehicles.error;

export const { toggleLike, addToMyBook } = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
