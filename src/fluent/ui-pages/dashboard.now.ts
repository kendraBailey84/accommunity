import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import dashboardPage from '../../client/dashboard-index.html';

export const dashboard_page = UiPage({
  $id: Now.ID['dashboard-page'],
  endpoint: 'x_snc_amoila_conne_dashboard.do',
  html: dashboardPage,
  direct: true
});