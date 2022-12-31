import type { Member } from "./member.js";

export interface Fee {
  id: number;
  year: number;
  paidAmount: number;
  member: Member;
  feesOnSchedule?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
