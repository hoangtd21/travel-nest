import BookingRow, { BookingI } from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import useBookings from './useBookings';
import Spinner from '../../ui/Spinner';
import { useSearchParams } from 'react-router-dom';

function BookingTable() {
  const { bookings, isLoading } = useBookings();
  const [searchParams] = useSearchParams();
  let filteredBookings: BookingI[] | undefined;

  // Filter
  const filterValue = searchParams.get('status') || 'all';
  if (filterValue === 'all') filteredBookings = bookings;
  if (filterValue === 'checked-out')
    filteredBookings = bookings?.filter(
      (booking) => booking.status === 'checked-out'
    );
  if (filterValue === 'checked-in')
    filteredBookings = bookings?.filter(
      (booking) => booking.status === 'checked-in'
    );
  if (filterValue === 'unconfirmed')
    filteredBookings = bookings?.filter(
      (booking) => booking.status === 'unconfirmed'
    );

  // Sort
  const sortBy = searchParams.get('sortBy') || 'Sort by date (recent first)';
  const [field, direction] = sortBy.split('-') as [keyof BookingI, string];
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedBookings = filteredBookings?.sort((a, b) => {
    const valueA =
      typeof a[field] === 'string' ? String(a[field]).toLowerCase() : a[field];
    const valueB =
      typeof b[field] === 'string' ? String(b[field]).toLowerCase() : b[field];
    if (valueA < valueB) return -1 * modifier;
    if (valueA > valueB) return 1 * modifier;
    return 0;
  });

  if (!bookings?.length) return <Empty resourceName="bookings" />;
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedBookings ? sortedBookings : []}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
