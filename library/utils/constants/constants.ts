export const COUNTRY = {
  ko: 'ko',
  en: 'en',
} as const;

export enum PostSearchDateScope {
  Daily = 1,
  Weekly = 7,
  Monthly = 30,
  All = 0,
}

export enum PostSearchSortScope {
  like = 'likes',
  view = 'viewCounts',
  recently = 'createdAt',
}
