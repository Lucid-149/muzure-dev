import { getRates } from "@/database/func";
import { useQuery } from "@tanstack/react-query";

export const useRates = () => {
  return useQuery({
    queryKey: ["rates"],
    queryFn: async () => await getRates(),
  });
};
