import type { InquiryRecord } from "@/lib/types";

export type Store = {
  kind: "dynamodb" | "local";
  putInquiry(record: InquiryRecord): Promise<InquiryRecord>;
  listInquiries(): Promise<InquiryRecord[]>;
};
