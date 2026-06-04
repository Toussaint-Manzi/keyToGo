"use client";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Switch,
  Table,
  message,
} from "antd";
import { useCallback, useEffect, useState } from "react";

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "switch";
  required?: boolean;
};

type SimpleCrudPageProps = {
  title: string;
  description: string;
  apiPath: string;
  columns: { title: string; dataIndex: string; key?: string }[];
  fields: FieldConfig[];
  getInitialValues?: () => Record<string, unknown>;
};

export function SimpleCrudPage({
  title,
  description,
  apiPath,
  columns,
  fields,
  getInitialValues,
}: SimpleCrudPageProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [form] = Form.useForm();

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(apiPath);
    const json = await res.json();
    if (json.ok) setItems(json.data);
    else message.error(json.message ?? "Failed to load");
    setLoading(false);
  }, [apiPath]);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue(getInitialValues?.() ?? { published: true, sortOrder: 0 });
    setOpen(true);
  }

  function openEdit(record: Record<string, unknown>) {
    setEditing(record);
    form.setFieldsValue(record);
    setOpen(true);
  }

  async function save(values: Record<string, unknown>) {
    const isEdit = Boolean(editing?.id);
    const url = isEdit ? `${apiPath}/${editing?.id}` : apiPath;
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    if (!json.ok) {
      const errMsg =
        json.errors?._form ?? json.message ?? "Save failed";
      message.error(errMsg);
      return;
    }
    message.success(isEdit ? "Updated" : "Created");
    setOpen(false);
    void load();
  }

  async function remove(id: string) {
    const res = await fetch(`${apiPath}/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (!json.ok) message.error(json.message);
    else {
      message.success("Deleted");
      void load();
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>
          <p className="text-slate-500">{description}</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Add new
        </Button>
      </div>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={items}
        columns={[
          ...columns,
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <div className="flex gap-2">
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => openEdit(record as Record<string, unknown>)}
                />
                <Popconfirm
                  title="Delete this item?"
                  onConfirm={() => remove(String(record.id))}
                >
                  <Button size="small" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </div>
            ),
          },
        ]}
      />

      <Modal
        title={editing ? "Edit" : "Add new"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Save"
        width={560}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={save}>
          {fields.map((f) => {
            if (f.type === "switch") {
              return (
                <Form.Item
                  key={f.name}
                  name={f.name}
                  label={f.label}
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              );
            }
            if (f.type === "number") {
              return (
                <Form.Item key={f.name} name={f.name} label={f.label} rules={[{ required: f.required }]}>
                  <InputNumber className="w-full" min={0} />
                </Form.Item>
              );
            }
            if (f.type === "textarea") {
              return (
                <Form.Item key={f.name} name={f.name} label={f.label} rules={[{ required: f.required }]}>
                  <Input.TextArea rows={4} />
                </Form.Item>
              );
            }
            return (
              <Form.Item key={f.name} name={f.name} label={f.label} rules={[{ required: f.required }]}>
                <Input />
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </div>
  );
}
