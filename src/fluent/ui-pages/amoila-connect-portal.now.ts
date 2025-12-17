import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import portalPage from '../../client/index.html';

export const amoila_connect_portal = UiPage({
  $id: Now.ID['amoila-connect-portal'],
  endpoint: 'x_snc_amoila_conne_amoila.do',
  html: portalPage,
  direct: true,
  public: true
});