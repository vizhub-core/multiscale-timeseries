declare module 'multiscale-timeseries' {
  type IntervalProp = { [key: string]: number; }
  type Intervals = {
    days: IntervalProp;
    hours: IntervalProp;
    minutes: IntervalProp;
    months: IntervalProp;
    quarters: IntervalProp;
    weeks: IntervalProp;
    years: IntervalProp;
    all: { all: number };
  }
  
  export function increment(record: object, date: Date, maxEntries?: number): Intervals;
}
