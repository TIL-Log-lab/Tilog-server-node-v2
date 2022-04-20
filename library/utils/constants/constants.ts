export const COUNTRY = {
  ko: 'ko',
  en: 'en',
} as const;

export enum PostSearchDateScope {
  Daily = 1,
  Weekly = 7,
  Monthly = 30,
  Yearly = 365,
}

export enum PostSearchSortScope {
  like = 'likes',
  view = 'viewCounts',
  recently = 'createdAt',
}
