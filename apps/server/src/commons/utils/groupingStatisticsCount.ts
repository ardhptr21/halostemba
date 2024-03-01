interface GroupingStatisticsCount {
  [key: string]: Date;
}

export default function groupingStatisticsCount(
  data: GroupingStatisticsCount[],
) {
  const result = data.reduce(
    (acc, curr) => {
      const date = new Date(
        Object.values(curr).at(0).toISOString().split('T')[0],
      ).toISOString();

      if (acc[date]) {
        acc[date] += 1;
      } else {
        acc[date] = 1;
      }

      return acc;
    },
    {} as { [key: string]: number },
  );

  return Object.keys(result).map((key) => ({
    date: key,
    count: result[key],
  }));
}
