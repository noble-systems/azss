import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { InquiryRecord } from "@/lib/types";
import type { Store } from "./types";

/**
 * Development driver. One JSON file under `.data/`.
 *
 * Lets the form work with `npm run dev` before any AWS resources exist. Never
 * used in production: `lib/store/index.ts` only selects this driver when
 * NODE_ENV !== "production".
 */

const DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DIR, "inquiries.json");

async function read(): Promise<InquiryRecord[]> {
  try {
    return JSON.parse(await readFile(FILE, "utf8")) as InquiryRecord[];
  } catch {
    return [];
  }
}

async function write(rows: InquiryRecord[]): Promise<void> {
  await mkdir(DIR, { recursive: true });
  await writeFile(FILE, JSON.stringify(rows, null, 2), "utf8");
}

export const localStore: Store = {
  kind: "local",

  async putInquiry(record) {
    const rows = await read();
    const next = rows.filter((row) => row.pk !== record.pk);
    next.push(record);
    await write(next);
    return record;
  },

  async listInquiries() {
    const rows = await read();
    return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
};
