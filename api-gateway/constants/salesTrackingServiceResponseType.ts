export interface GetFlowStatusSalesTrackingServiceResponseType {
  status: boolean;
  flowStatuses: FlowStatusType[];
  message: string;
}

export interface FlowStatusType {
  _id: string;
  name: string;
}
