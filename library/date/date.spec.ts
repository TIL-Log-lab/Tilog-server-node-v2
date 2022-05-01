import { now, arrayOfLastDate } from './date';

describe('Date Service ', () => {
  const testTimeString = '1995-12-17T03:24:00';
  const testDate = new Date(testTimeString);
  describe('.now()', () => {
    // NOTE: 지정된 시간으로 시스템 시간을 고정합니다
    jest.useFakeTimers().setSystemTime(testDate);

    it('[기능]현재 시간을 Date 타입으로 반환한다', () => {
      expect(now()).toEqual(testDate);
    });

    it('[기능]지정된 시간을 Date 타입으로 반환한다', () => {
      expect(now(testTimeString)).toEqual(testDate);
    });
  });

  describe('.arrayOfLastDate()', () => {
    it('[기능]첫 번째 인자 지정일부터 두 번째 인자만큼의 이전일을 배열에 담아 반환한다 (ISO 8610 T00:00:00.000Z)', () => {
      const dates: Date[] = [
        new Date('1995-12-17T00:00:00.000Z'),
        new Date('1995-12-16T00:00:00.000Z'),
        new Date('1995-12-15T00:00:00.000Z'),
      ];
      expect(arrayOfLastDate(testDate, dates.length)).toEqual(
        expect.arrayContaining(dates),
      );
    });
    it('[검증]음수를 매개변수로 요청시 실패한다', () => {
      expect(() => arrayOfLastDate(testDate, -1)).toThrow();
    });
    it('[검증]0을 매개변수로 요청시 빈 배열을 반환한다', () => {
      expect(arrayOfLastDate(testDate, 0)).toEqual([]);
    });
  });
});
