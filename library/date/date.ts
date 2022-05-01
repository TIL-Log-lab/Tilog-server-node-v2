import * as dateFns from 'date-fns';
import { formatISO } from 'date-fns';

export const now = (date?: string) => (date ? new Date(date) : new Date());

// NOTE: 오늘부터 인자로 받은일 만큼의 날자를 배열로 리턴합니다
export const arrayOfLastDate = (date: Date, range: number) => {
  return new Array(range)
    .fill(
      dateFns.parseISO(
        `${formatISO(date, { representation: 'date' })}T00:00:00.000Z`,
      ),
    )
    .map((val, index) => {
      if (index === 0) return val;
      return dateFns.subDays(val, index);
    });
};
