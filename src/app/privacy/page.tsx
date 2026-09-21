import type { Metadata } from "next";
import { ComingSoon } from "@/components/page-shell";

export const metadata: Metadata = { title: "Privacy Notice" };

export default function Page() {
  return <ComingSoon title="Privacy Notice" note="This page is being finalized and will be published after review." />;
}
