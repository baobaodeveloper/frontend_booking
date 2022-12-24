import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
export const calcDate = (date1, date2) => {
  const timeDiff = Math.abs(
    new Date(dayjs(date2).format()).getTime() -
      new Date(dayjs(date1).format()).getTime()
  );
  const diffDate = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDate;
};
