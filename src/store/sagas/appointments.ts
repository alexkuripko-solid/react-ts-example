import { call, put } from 'redux-saga/effects';
import { type SagaIterator } from 'redux-saga';

import { AppointmentApi } from '../../services/api/appointment';
import type Action from '../actions/action.interface';

import { AuthStorage } from '../../services/storage/auth.storage';
import {
  createAppointmentError,
  createAppointmentSuccess,
  getAppointmentsError,
  getAppointmentsSuccess,
  removeAppointmentError,
  removeAppointmentSuccess,
  updateAppointmentError,
  updateAppointmentSuccess,
} from '../actions/appointments';
import { UserTypesEnum } from '../../enums/user-types.enum';

export function* getAppointments({ payload }: Action): SagaIterator {
  const { userType, ...requestData } = payload;
  try {
    const data = yield call(
      userType === UserTypesEnum.PROVIDER ? AppointmentApi.getForProviderByQuery : AppointmentApi.getForClientByQuery,
      requestData,
    );
    yield put(getAppointmentsSuccess(data));
  } catch (error: any) {
    console.log([error]);
    yield put(getAppointmentsError(error));
  }
}

export function* createAppointment({ payload, meta }: Action): SagaIterator {
  try {
    const res = yield call(AppointmentApi.create, payload);
    yield put(createAppointmentSuccess());
    yield call(meta.onSuccess, res);
  } catch (error: any) {
    console.log([error]);
    yield put(createAppointmentError(error));
    meta.onError();
  }
}

export function* updateAppointment({ payload, meta }: Action): SagaIterator {
  try {
    const res = yield call(AppointmentApi.update, payload.id, payload);
    yield put(updateAppointmentSuccess());
    yield call(meta.onSuccess, res);
  } catch (error: any) {
    console.log([error]);
    yield put(updateAppointmentError(error));
    meta.onError();
  }
}

export function* removeAppointment({ payload, meta }: Action): SagaIterator {
  try {
    const res = yield call(AppointmentApi.clientCancel, payload);
    yield put(removeAppointmentSuccess());
    yield call(meta.onSuccess, res);
  } catch (error: any) {
    console.log([error]);
    yield put(removeAppointmentError(error));
    meta.onError();
  }
}
