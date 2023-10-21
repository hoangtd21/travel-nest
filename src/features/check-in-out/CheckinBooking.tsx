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
import { useCheckin } from './useCheckin';
import useSetting from '../settings/useSetting';
import { formatCurrency } from '../../utils/helpers';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSetting } = useSetting();

  const { bookingId } = useParams();
  const moveBack = useMoveBack();

  const { guests, numGuests, numNights, hasBreakfast, totalPrice } =
    (booking as BookingI) || {};
  const optionalBreakfastPrice =
    settings?.breakfastPrice * numGuests * numNights;

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  function handleCheckin() {
    if (!confirmPaid) return;
    const convertedBookingId = Number(bookingId);

    if (addBreakfast) {
      checkin({
        bookingId: convertedBookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId: convertedBookingId, breakfast: {} });
    }
  }

  if (isLoading || isLoadingSetting) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {booking && <BookingDataBox booking={booking} />}

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice + optionalBreakfastPrice)}
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
