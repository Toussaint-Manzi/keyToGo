"use client";

import { SimpleCrudPage } from "@/components/admin/simple-crud-page";

export default function AdminPartnersPage() {
  return (
    <SimpleCrudPage
      title="Partners"
      description="Logos and names shown in the Partners section on the homepage."
      apiPath="/api/admin/partners"
      columns={[
        { title: "Name", dataIndex: "name" },
        { title: "Role", dataIndex: "role" },
        { title: "Order", dataIndex: "sortOrder" },
      ]}
      fields={[
        { name: "name", label: "Partner name", required: true },
        { name: "role", label: "Role (e.g. Technology partner)" },
        { name: "logoUrl", label: "Logo image URL (optional)" },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
    />
  );
}
