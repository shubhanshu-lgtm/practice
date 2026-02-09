export interface IAuditorRegistration {
  id?: number;
  name: string;
  email: string;
  mobile: string;
  qualification?: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IRegistrationStep {
  auditor_id: number;
  step: string;
  data: Record<string, any>;
}

export interface IEvaluation {
  auditor_id: number;
  evaluation_data: Record<string, any>;
  evaluated_by: number;
  status: string;
}

export interface IAuditorListResponse {
  id: number;
  name: string;
  email: string;
  mobile: string;
  status: number;
  created_at: Date;
}

export interface IAuditorDetailResponse extends IAuditorRegistration {
  educations?: any[];
  experiences?: any[];
  standards?: any[];
}

export interface IAuditorLogin {
  email: string;
  password: string;
}

export interface IFileUpload {
  filename: string;
  mimetype: string;
  size: number;
  path: string;
}

export interface IFileUploadResponse {
  success: boolean;
  message: string;
  file?: IFileUpload;
  error?: string;
}

export interface IAuditorFile {
  id?: number;
  auditor_id: number;
  file_name: string;
  file_type: string;
  file_path: string;
  uploaded_at?: Date;
}

export interface IAuditorDashboardStats {
  total_auditors: number;
  active_auditors: number;
  pending_auditors: number;
  evaluations_pending: number;
}