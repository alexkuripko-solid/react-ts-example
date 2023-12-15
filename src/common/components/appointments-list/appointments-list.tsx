import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListItemAction, ListItemData } from '../../ui/list/list-item/list-item';
import { selectAppointments, selectServices } from '../../../store/selectors';
import { getAppointments } from '../../../store/actions/appointments';
import List from '../../ui/list';
import { IService } from '../../../services/api/service/dto/service.dto';
import { IAppointment } from '../../../services/api/appointment/dto/appointment.dto';
import { formatTime } from '../../../helpers/date-time.helper';
import { Box, Typography } from '@mui/material';
import { getImagePath } from '../../../helpers/image.helper';
import StatusBadge from './status-badge';
import dayjs from 'dayjs';
import { useQuery } from '../../../hooks';
import useIsMobile from "../../../hooks/use-is-mobile.hook";
import { UserTypesEnum } from "../../../enums/user-types.enum";

interface Props {
  type: string;
  userType?: UserTypesEnum;
  actions?: (appointment: IAppointment) => ListItemAction[];
  itemColor?: string;
  dataMap?: ListItemData;
  updateListRef: (method: () => void) => void;
  selectedAppointments?: IAppointment[];
  onSelect?: (newAppointments: IAppointment[]) => void;
  selectedAction?: ReactNode;
  filters?: {
    date?: string;
  };
}

const AppointmentsList = ({
  type,
  userType = UserTypesEnum.CLIENT,
  actions,
  itemColor,
  updateListRef,
  dataMap,
  selectedAppointments,
  onSelect,
  selectedAction,
  filters = {},
}: Props): ReactElement => {
  const { params } = useQuery();
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(25);
  const dispatch = useDispatch();
  const { appointments, loading: appointmentsLoading } = useSelector(selectAppointments);
  const { services, loading: servicesLoading } = useSelector(selectServices);
  const isMobile = useIsMobile();

  const fetchAppointments = () => dispatch(getAppointments({ tab: type, offset, limit, userType, ...filters }));

  const handleChangeOffset = (newOffset: number) => {
    setOffset(newOffset > 0 ? newOffset - 1 : 0);
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    fetchAppointments();
  }, [limit, offset, filters]);

  useEffect(() => {
    updateListRef(() => {
      dispatch(getAppointments({ tab: type, offset, limit }));
    });
  }, [updateListRef]);

  useEffect(() => {
    if (!appointmentsLoading && params.selected?.length && onSelect) {
      const selectedIds = JSON.parse(params.selected);
      if (selectedIds.length) {
        onSelect(appointments.data.filter(({ id }: IAppointment) => selectedIds.includes(id)));
      }
    }
  }, [appointmentsLoading]);

  return (
    <List
      data={appointments.data}
      dataMap={
        dataMap || {
          image: ({ service_id }) =>
            getImagePath(services.data.find(({ id }: IService) => id === service_id)?.image_id || 0),
          title: ({ service_id, status }) => (
            <Box display="flex" alignItems="center">
              {services.data.find(({ id }: IService) => id === service_id)?.name || ''}
              <StatusBadge status={status} />
            </Box>
          ),
          subtitle: ({ intervals, start, end, date }: IAppointment): ReactNode => (
            <>
              <Typography variant="body2" fontSize={14} fontWeight={600}>
                {formatTime(intervals[0]?.start || start || '')} - {formatTime(intervals[0]?.end || end || '')}
              </Typography>
              <Typography variant="body2" fontSize={14} fontWeight={600}>
                {dayjs(date, 'YYYY-MM-DD').format('dddd, D MMMM YYYY')}
              </Typography>
            </>
          ),
          description: ({ therapist }) =>
            therapist && (
              <Typography variant="body2" fontSize={14}>
                Therapist {therapist.first_name} {therapist.last_name}
              </Typography>
            ),
        }
      }
      imageSize={isMobile ? 85 : 128}
      total={appointments.recordsTotal}
      loading={servicesLoading || appointmentsLoading}
      page={offset + 1}
      rowsPerPage={limit}
      emptyPageTitle="You have any appointments yet"
      onPageChange={handleChangeOffset}
      onRowsPerPageChange={handleChangeLimit}
      actions={actions}
      itemColor={itemColor}
      selectedItems={selectedAppointments}
      onSelect={onSelect}
      selectedAction={selectedAction}
    />
  );
};

export default AppointmentsList;
