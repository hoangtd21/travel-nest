import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export default function useBookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { bookings, isLoading,error };
}
