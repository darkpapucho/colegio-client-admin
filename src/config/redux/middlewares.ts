import { AnyAction, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { DispatchApp, RootState } from './store';
import { history } from '../../utils/history';
// import toaster from 'react-hot-toast';

export const onChangeNivel: Middleware = (_api: MiddlewareAPI<DispatchApp, RootState>) => (next: DispatchApp) => (action: AnyAction) => {
  const currentPath = window.location.pathname;

  if (action.type === 'nivel/setNivel' && currentPath !== '/') {
    history.navigate('/menu');
  }
  next(action);
};

export const restrictYearRatificar: Middleware = (_api: MiddlewareAPI<DispatchApp, RootState>) => (next: DispatchApp) => (action: AnyAction) => {
  // const pathname = window.location.pathname;
  // const type = action.type;
  // const navigate = history.navigate;

  // if (pathname === '/menu/admin/ratificarmatricula' && type === 'año/setAño') {
  //   toaster.error('no se puede cambiar de año en esta operación');
  //   navigate('/menu');
  // }

  return next(action);
};
// export const ratificarMatriculaOnChangeYear = createListenerMiddleware();
// ratificarMatriculaOnChangeYear.startListening({
//   actionCreator: setAño,
//   effect: async (action, listenerApi) => {
//     // Run whatever additional side-effect-y logic you want here
//     //https://redux-toolkit.js.org/api/createListenerMiddleware
//     const validAño = (new Date().getFullYear() - 1 + '') as Year;
//     if (validAño !== action.payload) {
//       toaster.error(`Esta operación solo está permitida en el año ${validAño}`);
//       action.payload = validAño;
//       listenerApi.cancelActiveListeners();
//       listenerApi.dispatch(setAño(validAño));
//       history.navigate('/menu/admin');
//       history.navigate('/menu/admin/ratificarmatricula');
//     }
//   },
// });
