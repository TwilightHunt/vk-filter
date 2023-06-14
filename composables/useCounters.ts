export const countAgeByBDate = (bdate: string): boolean | number => {
  const regexp = /^\d{1,2}\.\d{1,2}\.\d{1,4}/;
  if (regexp.test(bdate)) {
    const dates: string[] = bdate.split('.');
    const date: number = Date.parse(`${dates[2]}-${dates[1]}-${dates[0]}`);
    const now: number = Date.now();

    const age: number = new Date(now - date).getFullYear() - 1970;

    return age;
  }
  return false;
};
