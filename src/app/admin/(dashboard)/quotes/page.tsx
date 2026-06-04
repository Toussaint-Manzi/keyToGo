"use client";

import { Button, Select, Table, Tag, Typography, message } from "antd";
import { useCallback, useEffect, useState } from "react";

type Quote = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/quotes");
    const json = await res.json();
    if (json.ok) setQuotes(json.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/admin/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    if (!json.ok) message.error(json.message);
    else {
      message.success("Status updated");
      void load();
    }
  }

  return (
    <div>
      <Typography.Title level={3}>Quote requests</Typography.Title>
      <Typography.Paragraph type="secondary">
        Messages sent from the contact form on your website.
      </Typography.Paragraph>
      <Table
        className="mt-4"
        rowKey="id"
        loading={loading}
        dataSource={quotes}
        scroll={{ x: true }}
        columns={[
          { title: "Date", dataIndex: "createdAt", render: (d: string) => new Date(d).toLocaleString() },
          { title: "Name", dataIndex: "name" },
          { title: "Email", dataIndex: "email" },
          { title: "Service", dataIndex: "service" },
          {
            title: "Status",
            dataIndex: "status",
            render: (status: string, record: Quote) => (
              <Select
                size="small"
                value={status}
                style={{ width: 120 }}
                onChange={(v) => updateStatus(record.id, v)}
                options={[
                  { value: "new", label: "New" },
                  { value: "read", label: "Read" },
                  { value: "archived", label: "Archived" },
                ]}
              />
            ),
          },
          {
            title: "Message",
            dataIndex: "message",
            render: (m: string) => (
              <Typography.Paragraph ellipsis={{ rows: 2 }} className="!mb-0 max-w-xs">
                {m}
              </Typography.Paragraph>
            ),
          },
        ]}
        expandable={{
          expandedRowRender: (record) => (
            <div className="space-y-2 text-sm">
              {record.company && <p><strong>Company:</strong> {record.company}</p>}
              {record.phone && <p><strong>Phone:</strong> {record.phone}</p>}
              <p><strong>Message:</strong> {record.message}</p>
            </div>
          ),
        }}
      />
    </div>
  );
}
