export const TAF_INDEX_PAGE_PATH = '/track-and-field';
export const TAF_SEARCH_PAGE_PATH = `${TAF_INDEX_PAGE_PATH}/search`;
export const TAF_COMPARE_PAGE_PATH = `${TAF_INDEX_PAGE_PATH}/compare`;
export const TAF_CHART_PAGE_PATH = `${TAF_INDEX_PAGE_PATH}/chart`;
export const TAF_RANKING_PAGE_PATH = `${TAF_INDEX_PAGE_PATH}/ranking`;
export const TAF_ARTICLE_PAGE_PATH = `${TAF_INDEX_PAGE_PATH}/article`;

import { Link } from 'shared/constants/type';
export const routing: Link[] = [
  {
    label: '検索',
    href: TAF_SEARCH_PAGE_PATH,
  },
  {
    label: '比較',
    href: TAF_COMPARE_PAGE_PATH,
  },
  {
    label: 'チャート',
    href: TAF_CHART_PAGE_PATH,
  },
  {
    label: 'ユーザーランキング',
    href: TAF_RANKING_PAGE_PATH,
  },
  {
    label: '記事一覧',
    href: TAF_ARTICLE_PAGE_PATH,
  },
];
