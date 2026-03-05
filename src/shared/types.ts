export type EventWithTarget<T> = Event & {
  target: T;
};

export enum DateFormats {
  IsoDate = 'YYYY-MM-DD',
}
