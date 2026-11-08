
export type UserRole =
  | "CUSTOMER"
  | "AGENT"
  | "ADMIN";

export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "PENDING_CUSTOMER"
  | "RESOLVED"
  | "CLOSED";

export type TicketPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "URGENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
}
