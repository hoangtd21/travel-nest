// import styled from 'styled-components';
import BookingDataBox from '../bookings/BookingDataBox';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

import { useMoveBack } from '../../hooks/useMoveBack';
import Spinner from '../../ui/Spinner';
import useBooking from '../bookings/useBooking';
import { useParams } from 'react-router-dom';

// const Box = styled.div`
//   /* Box */
//   background-color: var(--color-grey-0);
//   border: 1px solid var(--color-grey-100);
//   border-radius: var(--border-radius-md);
//   padding: 2.4rem 4rem;
// `;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const { bookingId } = useParams();
  const moveBack = useMoveBack();

  // const {
  //   id,
  //   // guests,
  //   // totalPrice,
  //   // numGuests,
  //   // hasBreakfast,
  //   // numNights,
  // } = booking as BookingI;

  function handleCheckin() {}

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {booking && <BookingDataBox booking={booking} />}

      <ButtonGroup>
        <Button variation="primary" size="medium" onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
