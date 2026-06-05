import { http } from "@/api/http";

export const getReservation = () =>
  http.get("/reservation").then((response) => response.data);

export const createReservation = (data) =>
  http.post("/reservation", data);