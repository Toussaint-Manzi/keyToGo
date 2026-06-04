"use client";

import { useState } from "react";
import { CrudPage } from "@/components/dashboard/crud-page";

type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string | null;
  sortOrder: number;
  published: boolean;
};

type Service = {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  icon: string | null;
  sortOrder: number;
  published: boolean;
};

export default function DashboardServicesPage() {
  const [tab, setTab] = useState<"services" | "categories">("services");

  return (
    <div>
      <div className="mb-6 flex gap-2 rounded-xl bg-white p-1 shadow-sm w-fit">
        <button
          type="button"
          onClick={() => setTab("services")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "services" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          Service items
        </button>
        <button
          type="button"
          onClick={() => setTab("categories")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "categories" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          Categories
        </button>
      </div>

      {tab === "services" ? (
        <CrudPage<Service>
          resourceLabel="Service"
          resourceLabelPlural="Services"
          apiPath="/api/admin/services"
          addButtonLabel="Add service"
          wideModal
          columns={[
            { key: "title", header: "Title" },
            {
              key: "categoryId",
              header: "Category ID",
              render: (r) => (
                <span className="font-mono text-xs text-slate-500">{r.categoryId}</span>
              ),
            },
            { key: "sortOrder", header: "Order" },
          ]}
          fields={[
            {
              name: "categoryId",
              label: "Category ID (from Categories tab)",
              required: true,
              fullWidth: true,
            },
            { name: "title", label: "Title", required: true },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              required: true,
              fullWidth: true,
            },
            { name: "icon", label: "Icon name" },
            { name: "sortOrder", label: "Sort order", type: "number" },
            { name: "published", label: "Published", type: "switch" },
          ]}
          emptyForm={{
            categoryId: "",
            title: "",
            description: "",
            icon: "",
            sortOrder: 0,
            published: true,
          }}
          rowToForm={(r) => ({
            categoryId: r.categoryId,
            title: r.title,
            description: r.description,
            icon: r.icon ?? "",
            sortOrder: r.sortOrder,
            published: r.published,
          })}
        />
      ) : (
        <CrudPage<Category>
          resourceLabel="Category"
          resourceLabelPlural="Categories"
          apiPath="/api/admin/service-categories"
          addButtonLabel="Add category"
          wideModal
          columns={[
            { key: "name", header: "Name" },
            { key: "slug", header: "Slug" },
            { key: "sortOrder", header: "Order" },
          ]}
          fields={[
            { name: "slug", label: "Slug (e.g. it-solutions)", required: true },
            { name: "name", label: "Name", required: true },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              required: true,
              fullWidth: true,
            },
            { name: "icon", label: "Icon name" },
            { name: "sortOrder", label: "Sort order", type: "number" },
            { name: "published", label: "Published", type: "switch" },
          ]}
          emptyForm={{
            slug: "",
            name: "",
            description: "",
            icon: "",
            sortOrder: 0,
            published: true,
          }}
          rowToForm={(r) => ({
            slug: r.slug,
            name: r.name,
            description: r.description,
            icon: r.icon ?? "",
            sortOrder: r.sortOrder,
            published: r.published,
          })}
        />
      )}
    </div>
  );
}
