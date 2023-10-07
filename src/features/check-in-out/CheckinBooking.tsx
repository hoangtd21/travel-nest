import styled from 'styled-components';
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
import Checkbox from '../../ui/Checkbox';
import { BookingI } from '../bookings/BookingRow';
import { useEffect, useState } from 'react';
import { useChecking } from './useCheckin';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useChecking();
  const { bookingId } = useParams();
  const moveBack = useMoveBack();

  const { guests } = (booking as BookingI) || {};

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  function handleCheckin() {
    if (!confirmPaid) return;
    bookingId && checkin(+bookingId);
  }

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {booking && <BookingDataBox booking={booking} />}
      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          variation="primary"
          size="medium"
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >
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
