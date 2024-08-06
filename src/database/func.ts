import { GetData } from "@/classes/data";
import pb, { url } from "@/database";
import { Destination, Rate, Tour } from "@/types";
import { ListResult } from "pocketbase";

export async function getRates() {
  try {
    const response = fetch(
      `https://perigee.pockethost.io/api/collections/Rates/records`
    ).then((response) => {
      if (!response.ok) throw new Error("HTTP error " + response.status);
      return response.json();
    });
    return response as unknown as ListResult<Rate>;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
export async function getAllDestinationsMeta() {
  try {
    const response = fetch(
      `https://perigee.pockethost.io/api/collections/Destinations/records?page=1&perPage=300&expand=Country`
    ).then((response) => {
      if (!response.ok) throw new Error("HTTP error " + response.status);
      return response.json();
    });
    return response as unknown as ListResult<Destination>;
  } catch (error) {}
}
export async function getAllToursMeta() {
  try {
    const response = fetch(
      `https://perigee.pockethost.io/api/collections/Tour/records`
    ).then((response) => {
      if (!response.ok) throw new Error("HTTP error " + response.status);
      return response.json();
    });
    return response as unknown as ListResult<Tour>;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
