import { ReactElement, useEffect, useState } from "react";
import AppointmentsList from '../../../../../../common/components/appointments-list';
import { IAppointment } from '../../../../../../services/api/appointment/dto/appointment.dto';
import Button from '../../../../../../common/ui/button';
import useIsMobile from '../../../../../../hooks/use-is-mobile.hook';
import CartModal from './cart-modal';
import PaymentModal from "./payment-modal";
import { TabProps } from "../bookings";
import { useQuery } from "../../../../../../hooks";
import { UserApi } from "../../../../../../services/api/user";
import useSnackbar from "../../../../../../hooks/use-snackbar.hook";
import { AppointmentApi } from '../../../../../../services/api/appointment';

const WaitingForPayment = ({ updateListRef, onUpdateAppointmentOpen, onCancelAppointmentOpen}: TabProps): ReactElement => {
  const { params } = useQuery();
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentToken, setPaymentToken] = useState<string>('');
  const [selected, setSelected] = useState<IAppointment[]>([]);
  const isMobile = useIsMobile();
  const { errorSnackbar, successSnackbar } = useSnackbar();

  const handleRemoveItem = (item: IAppointment) => {
    const newSelectedItems = selected.filter(({ id }) => id !== item.id);
    setSelected(newSelectedItems);
    if (!newSelectedItems.length) {
      setOpenCartModal(false);
    }
  };

  const handleCreatePayment = async () => {
    try {
      setLoading(true);
      const { client_secret, status } = await AppointmentApi.createPayment({
        items: selected.map(({ id }) => id),
      });

      if (status) {
        setPaymentToken(client_secret);
        setOpenCartModal(false);
        setOpenPaymentModal(true);
      } else {
        errorSnackbar('Error while checking out!')
      }
    } catch (e) {
      errorSnackbar('Error while checking out!');
    } finally {
      setLoading(false);
    }
  };

  const handleCompletePayment = async ()  => {
    try {
      setLoading(true);
      const { message, status } = await AppointmentApi.completePayment({
        items: selected.map(({ id }) => id),
        client_secret: paymentToken,
      });

      if (status) {
        setPaymentToken('');
        setOpenPaymentModal(false);
        successSnackbar('Appointments paid successfully')
      } else {
        errorSnackbar('Error while paying appointments!')
      }
    } catch (e) {
      errorSnackbar('Error while paying appointments!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.openPaymentModal) {
      setOpenPaymentModal(true);
    }
  }, []);

  return (
    <>
      <AppointmentsList
        type="cart"
        updateListRef={(method) => (updateListRef.current = method)}
        actions={() => [
          {
            label: 'Cancel',
            color: 'info',
            onClick: onCancelAppointmentOpen,
          },
          {
            label: 'Edit',
            variant: 'contained',
            onClick: onUpdateAppointmentOpen,
          },
        ]}
        selectedAppointments={selected}
        onSelect={setSelected}
        selectedAction={
          <Button sx={{ width: isMobile ? '100%' : 'auto' }} variant="contained" onClick={() => setOpenCartModal(true)}>
            Review and pay (selected {selected.length} appointment{selected.length > 1 ? 's' : ''})
          </Button>
        }
      />
      <CartModal
        open={openCartModal}
        items={selected}
        loading={loading}
        onRemove={handleRemoveItem}
        onClose={() => setOpenCartModal(false)}
        onSubmit={handleCreatePayment}
      />
      {
        paymentToken && (
          <PaymentModal
            open={openPaymentModal}
            loading={loading}
            paymentToken={paymentToken}
            onSubmit={handleCompletePayment}
            items={selected} onClose={() => setOpenPaymentModal(false)}
          />
        )
      }
    </>
  );
};

export default WaitingForPayment;
