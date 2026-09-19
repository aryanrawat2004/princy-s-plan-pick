import { createFileRoute } from "@tanstack/react-router";
import { PlanExperience } from "@/components/plan-experience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pick Our Plan ✨" },
      { name: "description", content: "Just a small plan :)" },
      { property: "og:title", content: "Pick Our Plan ✨" },
      { property: "og:description", content: "Just a small plan :)" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PlanExperience,
});