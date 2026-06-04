"use client";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Space, Typography, message } from "antd";
import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((j) => {
        if (j.ok && j.data) form.setFieldsValue(j.data);
        setLoading(false);
      });
  }, [form]);

  async function onFinish(values: Record<string, unknown>) {
    setSaving(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    setSaving(false);
    if (!json.ok) {
      message.error(json.message ?? "Failed to save");
      return;
    }
    message.success("Site settings saved. The homepage will update shortly.");
  }

  if (loading) return <Typography.Text>Loading…</Typography.Text>;

  return (
    <div className="max-w-3xl">
      <Typography.Title level={3}>Site settings</Typography.Title>
      <Typography.Paragraph type="secondary">
        Main homepage text, contact details, and SEO description.
      </Typography.Paragraph>
      <Alert
        className="mb-6"
        type="info"
        showIcon
        message="Tip"
        description='Use one line per typing phrase and intro paragraph. Click "Add" to add more lines.'
      />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="companyName" label="Company name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="heroTitle" label="Hero headline" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="heroSubtitle" label="Hero subtitle">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="tagline" label="Footer tagline">
          <Input />
        </Form.Item>
        <Form.Item name="countriesLine" label="Countries / regions line">
          <Input placeholder="Canada • North America" />
        </Form.Item>

        <Typography.Text strong>Hero typing animation (one phrase per line)</Typography.Text>
        <Form.List name="heroTypingPhrases">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Form.Item key={field.key} required={false}>
                  <Space className="flex w-full" align="baseline">
                    <Form.Item {...field} noStyle rules={[{ required: true, message: "Required" }]}>
                      <Input className="!w-[400px]" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  Add phrase
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Typography.Text strong className="mt-4 block">
          Introduction paragraphs
        </Typography.Text>
        <Form.List name="introParagraphs">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Form.Item key={field.key}>
                  <Space align="start" className="flex w-full">
                    <Form.Item {...field} noStyle rules={[{ required: true }]}>
                      <Input.TextArea rows={3} className="!w-[400px]" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                </Form.Item>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  Add paragraph
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item name="contactEmail" label="Contact email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="contactPhone" label="Contact phone">
          <Input />
        </Form.Item>
        <Form.Item name="contactAddress" label="Address">
          <Input />
        </Form.Item>
        <Form.Item name="metaDescription" label="SEO description">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="footerText" label="Footer copyright text">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={saving} size="large">
          Save settings
        </Button>
      </Form>
    </div>
  );
}
