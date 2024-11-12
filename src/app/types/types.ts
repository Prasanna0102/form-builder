// interfaces.ts

import { InputJsonValue } from "@prisma/client/runtime/library";

export interface Service {
  id: string;
  title: string;
  description: string;
  link?: string;
  icon: string;
  Forms: Form[];
  Applications: Application[];
}

export interface Form {
  id: string;
  title: string;
  description: string;
  areQuestionsRequired: boolean;
  conditionalQuestions: InputJsonValue; // JSON input
  staticQuestions: InputJsonValue; // JSON input
  isDocumentationRequired: boolean;
  documentation: string[];
  isPaymentNeeded: boolean;
  amount?: number;
  isNoteNeeded: boolean;
  serviceId: string;
  Service: Service;
  Responses: Response[];
  CustomFields: CustomField[];
  ApplicationForms: ApplicationForm[];
  Application: Application[];
}

export interface Response {
  id: string;
  formId: string;
  Form: Form;
  responseData: InputJsonValue; // JSON input
  s3Url: string;
  createdAt: Date;
}

export interface CustomField {
  id: string;
  label: string;
  fieldType: string;
  options?: InputJsonValue; // JSON for options
  formId: string;
  Form: Form;
}

export interface CreateFormRequestBody {
  formData: {
    title: string;
    description: string;
    areQuestionsRequired: boolean;
    conditionalQuestions: any;
    staticQuestions: any;
    isDocumentationRequired: boolean;
    documentation: string[];
    isPaymentNeeded: boolean;
    isNoteNeeded: boolean;
    serviceId: string;
  };
  customFieldsData: Array<{ label: string; fieldType: string; options?: any }>;
}

export interface Application {
  id: string;
  formId: string;
  Form: Form;
  clientId: string;
  status: string;
  additionalInfo?: InputJsonValue; // JSON for additional info
  notifiedAt?: Date;
  Notification: Notification[];
  ApplicationForm: ApplicationForm[];
  Service: Service[];
}

export interface ApplicationForm {
  id: string;
  formId: string;
  Form: Form;
  applicationId: string;
  Application: Application;
  createdAt: Date;
}

export interface Notification {
  id: string;
  applicationId: string;
  Application: Application;
  message: string;
  createdAt: Date;
}

export interface FormTemplate {
  id: string;
  title: string;
  description: string;
  fields: InputJsonValue; // JSON for form fields structure
  createdAt: Date;
}
export type FormCreateData = Omit<
  Form,
  "id" | "Service" | "Responses" | "CustomFields" | "ApplicationForms" | "Application"
>;
