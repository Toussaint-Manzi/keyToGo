"use client";

import { CrudPage } from "@/components/dashboard/crud-page";

type Row = {
  id: string;
  authorName: string;
  authorRole: string | null;
  company: string | null;
  content: string;
  rating: number | null;
  sortOrder: number;
  published: boolean;
};

export default function DashboardTestimonialsPage() {
  return (
    <CrudPage<Row>
      resourceLabel="Testimonial"
      resourceLabelPlural="Testimonials"
      apiPath="/api/admin/testimonials"
      addButtonLabel="Add testimonial"
      wideModal
      columns={[
        { key: "authorName", header: "Author" },
        { key: "company", header: "Company", render: (r) => r.company ?? "—" },
        { key: "rating", header: "Rating", render: (r) => (r.rating ? `${r.rating}/5` : "—") },
      ]}
      fields={[
        { name: "authorName", label: "Author name", required: true },
        { name: "authorRole", label: "Role / title" },
        { name: "company", label: "Company" },
        { name: "content", label: "Quote", type: "textarea", required: true, fullWidth: true },
        { name: "rating", label: "Rating (1-5)", type: "number" },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
      emptyForm={{
        authorName: "",
        authorRole: "",
        company: "",
        content: "",
        rating: 5,
        sortOrder: 0,
        published: true,
      }}
      rowToForm={(r) => ({
        authorName: r.authorName,
        authorRole: r.authorRole ?? "",
        company: r.company ?? "",
        content: r.content,
        rating: r.rating ?? 5,
        sortOrder: r.sortOrder,
        published: r.published,
      })}
    />
  );
}
