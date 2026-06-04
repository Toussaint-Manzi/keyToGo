"use client";

import { SimpleCrudPage } from "@/components/admin/simple-crud-page";

export default function AdminTestimonialsPage() {
  return (
    <SimpleCrudPage
      title="Testimonials"
      description="Client quotes shown on the homepage."
      apiPath="/api/admin/testimonials"
      columns={[
        { title: "Author", dataIndex: "authorName" },
        { title: "Company", dataIndex: "company" },
        { title: "Rating", dataIndex: "rating" },
      ]}
      fields={[
        { name: "authorName", label: "Author name", required: true },
        { name: "authorRole", label: "Role / title" },
        { name: "company", label: "Company" },
        { name: "content", label: "Quote", type: "textarea", required: true },
        { name: "rating", label: "Rating (1-5)", type: "number" },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
    />
  );
}
