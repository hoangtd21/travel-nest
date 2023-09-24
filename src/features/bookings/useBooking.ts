import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router-dom';

export default function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['booking'],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,
  });

  return { booking, isLoading, error };
}
