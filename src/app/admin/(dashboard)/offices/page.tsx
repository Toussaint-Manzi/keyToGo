"use client";

import { SimpleCrudPage } from "@/components/admin/simple-crud-page";

export default function AdminOfficesPage() {
  return (
    <SimpleCrudPage
      title="Offices & locations"
      description="Office locations shown in the contact section."
      apiPath="/api/admin/offices"
      columns={[
        { title: "Country", dataIndex: "country" },
        { title: "City", dataIndex: "city" },
        { title: "HQ", dataIndex: "isHeadquarters" },
      ]}
      fields={[
        { name: "country", label: "Country", required: true },
        { name: "city", label: "City" },
        { name: "address", label: "Address", type: "textarea" },
        { name: "phone", label: "Phone" },
        { name: "email", label: "Email" },
        { name: "isHeadquarters", label: "Headquarters", type: "switch" },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
    />
  );
}
