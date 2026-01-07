export type WagonFilterParams = {
  wagonNumber?: string;
  stationCode?: string;
  status?: 'overload' | 'clean';
  name: string;
  stationId: string;
  type: string;
  fromDate?: string;
  toDate?: string;
  sostavNumber?: string;
  borderCustomsCode?: string;
  hasWagonSession?: boolean;
  hasData?: boolean;
};
