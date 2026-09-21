import type { Metadata } from "next";
import { ComingSoon } from "@/components/page-shell";

export const metadata: Metadata = { title: "Terms of Use" };

export default function Page() {
  return <ComingSoon title="Terms of Use" note="This page is being finalized and will be published after review." />;
}
