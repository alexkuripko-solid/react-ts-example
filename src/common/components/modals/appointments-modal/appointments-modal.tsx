import React, { ReactElement, useState } from 'react';
import Modal from '../../../ui/modal';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, styled, Typography } from '@mui/material';
import { IAppointment } from '../../../../services/api/appointment/dto/appointment.dto';
import { colors } from '../../../../config/theme/colors';
import CustomTooltip from '../../../ui/custom-tooltip';
import { ExpandMore, InfoOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectServices } from '../../../../store/selectors';
import { IService } from '../../../../services/api/service/dto/service.dto';
import { AlarmDelete, Calendar, Call, File, Location, Note, Notepad } from '../../../ui/icon-v2';
import AcceptDetails from './accept-details';
import ReviewDetails from './review-details';
import StartDetails from './start-details';
import CancelDetails from './cancel-details';
import ShowDetails from './show-details';
import dayjs from 'dayjs';
import AcceptRequestDto from '../../../../services/api/appointment/dto/accept-request.dto';
import CancelRequestDto from '../../../../services/api/appointment/dto/cancel-request.dto';
import ReviewRequestDto from '../../../../services/api/appointment/dto/review-request.dto';
import EditDetails from './edit-details';
import { Form, Formik, useFormikContext } from 'formik';
import appointmentValidationSchema from '../../../../services/api/appointment/validations/appointment-validation-schema';
import { TextField } from '../../../ui/text-field';
import DatePicker from '../../../ui/date-picker';
import TimePicker from '../../appointment-date-picker/time-picker';
import { AppointmentTimeTypesEnum } from '../../../../enums/appointment-time-types.enum';
import useWorkingHours from '../../../../hooks/use-working-hours.hook';
import CloseDetails from './close-details';
import RebookDetails from './rebook-details';
import FeedbackDetails from './feedback-details';
import Button from '../../../ui/button';
import { UserTypesEnum } from '../../../../enums/user-types.enum';
import { IProvider } from '../../../../services/api/provider/dto/provider.dto';
import { getImagePath } from '../../../../helpers/image.helper';

const StyledAccordion = styled(Accordion)(
  () => `
    &::before {
      opacity: 0 !important;
    }
`,
);

const StaticField = styled(Box)(
  () => `
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`,
);

const FieldLabel = styled(Typography)(
  () => `
    margin-bottom: 4px;
    font-weight: 600;
`,
);

const FieldValue = styled(Typography)(
  () => `
    font-size: 14px;
    margin-left: 8px;
`,
);

const Image = styled('img')(
  () => `
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 16px;
`,
);

const TimeField = styled(Box)(
  () => `
    padding: 9px 0;
    display: flex;
`,
);

export enum AppointmentsModalTypes {
  ACCEPT,
  REVIEW,
  START,
  CANCEL,
  CLOSE,
  EDIT,
  SHOW,
  FEEDBACK,
  REBOOK,
}

const detailsComponents = {
  [AppointmentsModalTypes.ACCEPT]: AcceptDetails,
  [AppointmentsModalTypes.REVIEW]: ReviewDetails,
  [AppointmentsModalTypes.START]: StartDetails,
  [AppointmentsModalTypes.CANCEL]: CancelDetails,
  [AppointmentsModalTypes.CLOSE]: CloseDetails,
  [AppointmentsModalTypes.EDIT]: EditDetails,
  [AppointmentsModalTypes.SHOW]: ShowDetails,
  [AppointmentsModalTypes.FEEDBACK]: FeedbackDetails,
  [AppointmentsModalTypes.REBOOK]: RebookDetails,
};

export interface AppointmentSubmitData {
  start?: string;
  end?: string;
}

interface AppointmentFormProps {
  type: AppointmentsModalTypes;
  userType: UserTypesEnum;
  loading: boolean;
  onClose: () => void;
}

const AppointmentForm = ({ type, loading, userType, onClose }: AppointmentFormProps): ReactElement => {
  const hours = useWorkingHours();
  const [expanded, setExpanded] = useState<boolean>(type !== AppointmentsModalTypes.REVIEW);
  const { values, setFieldValue } = useFormikContext<IAppointment>();
  const { services } = useSelector(selectServices);
  const service: IService = services.data.find(({ id }: IService) => values.service_id === id);

  const userData = values[userType === UserTypesEnum.PROVIDER ? 'user' : 'therapist'];

  return (
    <Form>
      <Grid container spacing={2}>
        {userData && (
          <>
            <Grid item display="flex" alignItems="center" xs={12} md={12}>
              <Image
                src={
                  userType === UserTypesEnum.PROVIDER
                    ? getImagePath(values.therapist?.details.image_id || 0)
                    : '/img/default-avatar.svg'
                }
              />
              <Box>
                <Typography variant="h6">
                  {userData.first_name} {userData.last_name}
                </Typography>
                <Typography variant="body2" color={colors.primary[60]}>
                  {userData.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
          </>
        )}
        <StyledAccordion
          sx={{ boxShadow: 'none' }}
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Typography fontWeight={600}>Appointment Details</Typography>
              {type === AppointmentsModalTypes.ACCEPT && (
                <CustomTooltip
                  title={'Select "accept" a notification of the appointment will be sent to you and the client'}
                >
                  <InfoOutlined sx={{ width: 24, height: 24 }} color="primary" />
                </CustomTooltip>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, ml: 2 }}>
            <Grid container spacing={2}>
              <Grid sx={{ paddingTop: 2 }} item xs={12}>
                <FieldLabel variant="subtitle2">Service</FieldLabel>
                <StaticField>
                  <File size={16} />
                  <FieldValue variant="body2">{service?.name}</FieldValue>
                </StaticField>
              </Grid>
              <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
                <FieldLabel variant="subtitle2">Phone number</FieldLabel>
                {type === AppointmentsModalTypes.EDIT ? (
                  <TextField name="phone" startIcon={<Call size={18} />} />
                ) : (
                  <StaticField>
                    <Call size={16} />
                    <FieldValue variant="body2">{values.phone}</FieldValue>
                  </StaticField>
                )}
              </Grid>
              <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
                <FieldLabel variant="subtitle2">Date</FieldLabel>
                {type === AppointmentsModalTypes.EDIT ? (
                  <DatePicker
                    sx={{ mb: 2 }}
                    value={dayjs(values.date, 'YYYY-MM-DD')}
                    onChange={(value) => setFieldValue('date', value.format('YYYY-MM-DD'))}
                    format="dddd, D MMMM YYYY"
                  />
                ) : (
                  <StaticField>
                    <Calendar size={16} />
                    <FieldValue variant="body2">
                      {dayjs(values.date, 'YYYY-MM-DD').format('dddd, D MMMM YYYY')}
                    </FieldValue>
                  </StaticField>
                )}
              </Grid>
              <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
                <FieldLabel variant="subtitle2">Time</FieldLabel>
                <TimeField>
                  {type === AppointmentsModalTypes.EDIT ? (
                    <TimePicker
                      row
                      type={values.timeType}
                      selectedIntervals={values.intervals}
                      onTypeChange={(newType) => {
                        setFieldValue('timeType', newType);
                        setFieldValue(
                          'intervals',
                          newType === AppointmentTimeTypesEnum.SPECIFIC
                            ? [
                                {
                                  start: hours[0],
                                  end: hours[5],
                                },
                              ]
                            : [],
                        );
                      }}
                      onIntervalsChange={(newIntervals) => setFieldValue('intervals', newIntervals)}
                    />
                  ) : (
                    <>
                      <AlarmDelete size={16} />
                      <Typography sx={{ ml: 1 }} variant="subtitle2" fontSize={14}>
                        {dayjs(values.start, 'HH:mm:ss').format('H:ma')} -{' '}
                        {dayjs(values.start, 'HH:mm:ss').format('H:ma')}
                      </Typography>
                    </>
                  )}
                </TimeField>
              </Grid>
              <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
                <FieldLabel variant="subtitle2">Address</FieldLabel>
                {type === AppointmentsModalTypes.EDIT ? (
                  <TextField name="address" startIcon={<Location size={18} />} />
                ) : (
                  <StaticField>
                    <Location size={16} />
                    <FieldValue variant="body2" color={colors.primary[60]}>
                      {values.address}
                    </FieldValue>
                  </StaticField>
                )}
              </Grid>
              <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
                <FieldLabel variant="subtitle2">Details</FieldLabel>
                {type === AppointmentsModalTypes.EDIT ? (
                  <TextField name="details" startIcon={<Notepad size={18} />} />
                ) : (
                  <StaticField>
                    <Notepad size={16} />
                    <FieldValue variant="body2">{values.details}</FieldValue>
                  </StaticField>
                )}
              </Grid>
              <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
                <FieldLabel variant="subtitle2">Description</FieldLabel>
                {type === AppointmentsModalTypes.EDIT ? (
                  <TextField name="description" type="textarea" startIcon={<Note size={18} />} />
                ) : (
                  <StaticField sx={{ alignItems: 'start' }}>
                    <Note size={16} />
                    <FieldValue variant="body2">{values.description}</FieldValue>
                  </StaticField>
                )}
              </Grid>
              {type === AppointmentsModalTypes.EDIT && (
                <>
                  <Grid item xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box sx={{ mt: 2 }} display="flex" justifyContent="space-between">
                      <Button variant="contained" color="secondary" onClick={onClose}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained" disabled={loading} loading={loading}>
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </AccordionDetails>
        </StyledAccordion>
      </Grid>
    </Form>
  );
};

interface Props {
  open: boolean;
  type: AppointmentsModalTypes;
  userType: UserTypesEnum;
  appointment: IAppointment;
  submitData?: AcceptRequestDto | CancelRequestDto | ReviewRequestDto | IAppointment;
  setSubmitData?: (submitData: AcceptRequestDto | CancelRequestDto | ReviewRequestDto) => void;
  loading: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

const AppointmentsModal = ({
  open,
  type,
  userType,
  appointment,
  submitData,
  loading,
  setSubmitData = () => {
    /**/
  },
  onClose,
  onSubmit = () => {
    /**/
  },
}: Props): ReactElement | null => {
  const Details = detailsComponents[type];

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Formik
        initialValues={appointment}
        onSubmit={onSubmit}
        validationSchema={appointmentValidationSchema}
        enableReinitialize
      >
        <AppointmentForm type={type} userType={userType} loading={loading} onClose={onClose} />
      </Formik>
      {type !== AppointmentsModalTypes.EDIT && (
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>
      )}
      {open && <Details loading={loading} onSubmit={onSubmit} onClose={onClose} />}
    </Modal>
  );
};

export default AppointmentsModal;
