import { ReactElement } from "react";
import AppointmentsList from "../../../../../../common/components/appointments-list";
import { TabProps } from "../bookings";

const Upcoming = ({ updateListRef, onCancelAppointmentOpen}: TabProps): ReactElement => {
  return (
    <>
      <AppointmentsList
        type="upcoming"
        updateListRef={(method) => (updateListRef.current = method)}
        actions={() => [
          {
            label: 'Cancel',
            color: 'info',
            onClick: onCancelAppointmentOpen,
          },
        ]}
      />
    </>
  );
};

export default Upcoming;
