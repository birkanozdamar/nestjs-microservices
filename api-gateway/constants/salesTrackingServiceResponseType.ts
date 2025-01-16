export interface GetFlowStatusSalesTrackingServiceResponseType {
  status: boolean;
  flowStatuses: FlowStatusType[];
  message: string;
}

export interface FlowStatusType {
  _id: string;
  name: string;
}

export interface CreateFlowSalesTrackingServiceResponseType {
  status: boolean;
  newFlow: FlowType;
  message: string;
}

export interface FlowType {
  _id: string;
  customer_id: string;
  isActive: boolean;
  flowStatusId: string;
  created_by_id: string;
  created_at: string;
}
