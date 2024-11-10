export interface Service {
    id: string;
    title: string;
    description: string;
    link?: string;
    icon: string;
    forms: Form[];
    Application: Application[];
  }
  
  export interface Form {
    id: string;
    title: string;
    description: string;
    areQuestionsRequired: boolean;
    conditionalQuestions: Record<string, any>;
    staticQuestions: Record<string, any>;
    isDocumentationRequired: boolean;
    documentation: string[];
    isPaymentNeeded: boolean;
    amount?: number;
    isNoteNeeded: boolean;
    serviceId: string;
    ApplicationForm: ApplicationForm[];
    CustomFields: CustomField[];
  }
  
  export interface CustomField {
    id: string;
    formId: string;
    fieldName: string;
    fieldType: string;
    fieldValue: Record<string, any>;
  }
  
  export interface Response {
    id: string;
    applicationFormId: string;
    userId: string;
    answers: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    username: string;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;
    isVerified: boolean;
    isBlocked: boolean;
  }
  
  export interface Role {
    id: number;
    name: string;
  }
  
  export interface Account {
    id: string;
    userId: string;
    providerType: string;
    providerId: string;
    providerAccountId: string;
    refreshToken?: string;
    accessToken?: string;
    accessTokenExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Application {
    id: string;
    title: string;
    status: string;
    statusColor: string;
    deadline?: Date;
    paymentDetails: PaymentDetails[];
    forms: ApplicationForm[];
    documentationUploaded: string[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    serviceId: string;
    totalAmount?: number;
    additionalInfo?: Record<string, any>;
  }
  
  export interface PaymentDetails {
    id: string;
    amount: number;
    GST: number;
    applicationId: string;
    paymentStatus: string;
    paymentMethod: string;
    isPartialPayment: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface File {
    id: string;
    applicationFormId: string;
    fileName: string;
    documentation: string;
    mimeType: string;
    filePath: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ApplicationForm {
    id: string;
    applicationId: string;
    formId: string;
    File: File[];
    Response: Response[];
  }
  
  export interface Notification {
    id: string;
    userId: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
  }
  
  export interface RequestLog {
    id: string;
    userId: string;
    endpoint: string;
    method: string;
    timestamp: Date;
  }
  