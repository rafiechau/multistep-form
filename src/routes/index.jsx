import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import PaymentPage from '@pages/Payment';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
  {
    path: '/multiform',
    name: 'Payment',
    protected: false,
    component: PaymentPage,
    layout: MainLayout,
  },
];

export default routes;
