import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import formSaga from '@pages/Payment/saga';

export default function* rootSaga() {
  yield all([appSaga(), formSaga()]);
}
