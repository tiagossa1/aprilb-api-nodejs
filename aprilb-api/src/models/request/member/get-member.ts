import type FiltersMember from "./filters-member.js";

interface GetMemberRequest {
  skip: number;
  take: number;
  filters: FiltersMember;
}

export default GetMemberRequest;
