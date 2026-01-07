interface CameraListFilterParams {
  code?: string;
  camera_name?: string;
  direction?: string;
  stationIds?: string[] | number[];
  fromDate?: string;
  toDate?: string;
}

interface CameraWagonFilterParams {
  stationIds?: string[] | number[];
  stationId?: string | number;
  camera_name?: string;
  fromDate?: string;
  toDate?: string;
}

interface CameraItemsFilterParams {
  id?: string;
  wagonNumber?: string;
  withDefects?: boolean;
}



export { type CameraListFilterParams, type CameraWagonFilterParams, type CameraItemsFilterParams };