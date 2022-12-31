import type FiltersNonMember from "./filters-non-member";

interface GetNonMemberRequest {
  skip: number;
  take: number;
  filters: FiltersNonMember;
}

export default GetNonMemberRequest;
