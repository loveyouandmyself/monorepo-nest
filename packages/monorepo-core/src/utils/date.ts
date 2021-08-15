import moment from 'moment-timezone';

/**
 * @description 原子时之间转换为ISO时间
 * @export
 * @param {(string | number)} date
 * @returns {String} ISO Date String
 */
export function transformAtomic(date: moment.MomentInput): moment.Moment {
  return moment(date).subtract(27, 'seconds');
}

/**
 * 转换日期为北京时间
 * @param date 
 * @param format 
 */
export function formatDate2BeiJing(
  date: moment.MomentInput,
  format = 'YYYY-MM-DD HH:mm:ss',
): string {
  return moment(date)
    .utcOffset(480)
    .format(format);
}

/**
 * 判断日期相差多长时间,如果传入的时间小于当前时间，返回负数
 * @param endDate 
 * @param startDate 
 * @param unitOfTime 
 */
export function calcDiffTime(
  startDate: moment.MomentInput,
  endDate: moment.MomentInput = new Date,
  unitOfTime: any = 'm',
): number {
  if (moment(endDate).isAfter(startDate)) {
    return -moment(startDate).diff(moment(endDate), unitOfTime);
  }
  return moment(startDate).diff(moment(endDate), unitOfTime);
}