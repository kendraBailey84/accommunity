import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import supportPage from '../../client/support-index.html';

export const support_page = UiPage({
  $id: Now.ID['support-page'],
  endpoint: 'x_snc_amoila_conne_support.do',
  html: supportPage,
  direct: true,
  public: true
});