import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import faqPage from '../../client/faq-index.html';

export const faq_page = UiPage({
  $id: Now.ID['faq-page'],
  endpoint: 'x_snc_amoila_conne_faq.do',
  html: faqPage,
  direct: true,
  public: true
});