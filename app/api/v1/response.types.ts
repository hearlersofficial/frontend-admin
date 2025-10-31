export interface ApiSuccessResponse<TData> {
    message: string;
    data: TData;
    timestamp: string;
  }

export interface ApiErrorResponse<TData> {
    status: string;
    code: string;
    message: string;
    details: string[];
    data: TData;
    timestamp: string;
  }