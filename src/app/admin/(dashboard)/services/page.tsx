"use client";

import { SimpleCrudPage } from "@/components/admin/simple-crud-page";
import { Tabs, Typography } from "antd";
import { useEffect, useState } from "react";

export default function AdminServicesPage() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    void fetch("/api/admin/service-categories")
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) setCategories(j.data);
      });
  }, []);

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div>
      <Typography.Title level={3}>Services</Typography.Title>
      <Tabs
        items={[
          {
            key: "items",
            label: "Service items",
            children: (
              <SimpleCrudPage
                title=""
                description="Individual services under IT, Transport, or Staffing."
                apiPath="/api/admin/services"
                columns={[
                  { title: "Title", dataIndex: "title" },
                  { title: "Category", dataIndex: "categoryId" },
                  { title: "Order", dataIndex: "sortOrder" },
                ]}
                fields={[
                  {
                    name: "categoryId",
                    label: "Category ID (copy from Categories tab)",
                    required: true,
                  },
                  { name: "title", label: "Title", required: true },
                  { name: "description", label: "Description", type: "textarea", required: true },
                  { name: "icon", label: "Icon name (e.g. Cloud, Truck)" },
                  { name: "sortOrder", label: "Sort order", type: "number" },
                  { name: "published", label: "Published", type: "switch" },
                ]}
              />
            ),
          },
          {
            key: "categories",
            label: "Categories",
            children: (
              <SimpleCrudPage
                title=""
                description="The three main pillars: IT, Transport, Staffing."
                apiPath="/api/admin/service-categories"
                columns={[
                  { title: "Name", dataIndex: "name" },
                  { title: "Slug", dataIndex: "slug" },
                  { title: "Order", dataIndex: "sortOrder" },
                ]}
                fields={[
                  { name: "slug", label: "Slug (e.g. it-solutions)", required: true },
                  { name: "name", label: "Name", required: true },
                  { name: "description", label: "Description", type: "textarea", required: true },
                  { name: "icon", label: "Icon name" },
                  { name: "sortOrder", label: "Sort order", type: "number" },
                  { name: "published", label: "Published", type: "switch" },
                ]}
                getInitialValues={() => ({ published: true, sortOrder: 0 })}
              />
            ),
          },
        ]}
      />
      {categories.length > 0 && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-sm">
          <Typography.Text strong>Category IDs (for service items):</Typography.Text>
          <ul className="mt-2 list-disc pl-5">
            {categories.map((c) => (
              <li key={c.id}>
                {c.name}: <code>{c.id}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
