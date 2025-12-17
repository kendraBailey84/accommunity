import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import kbPage from '../../client/kb-index.html';

export const knowledge_base_page = UiPage({
  $id: Now.ID['knowledge-base-page'],
  endpoint: 'x_snc_amoila_conne_kb.do',
  html: kbPage,
  direct: true,
  public: true
});