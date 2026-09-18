export type ContactMessageStatus = "NEW" | "READ" | "ARCHIVED";

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  organization: string | null;
  message: string;
  status: ContactMessageStatus;
  createdAt: string;
  updatedAt: string;
};

export type ContactMessageListResponse = {
  data: ContactMessage[];
  total: number;
};
