"use client";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onFinish(values: { email: string; password: string }) {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const json = await res.json();
    setLoading(false);
    if (!json.ok) {
      setError(json.message ?? "Login failed");
      return;
    }
    const from = searchParams.get("from") || "/admin";
    router.push(from);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-teal-900 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <Typography.Title level={3} className="!text-center !text-teal-700">
          KeyTOGO Admin
        </Typography.Title>
        <Typography.Paragraph type="secondary" className="text-center">
          Sign in to manage your website content
        </Typography.Paragraph>
        <Typography.Paragraph type="secondary" className="mb-4 text-center text-xs">
          Use <code>ADMIN_EMAIL</code> and <code>ADMIN_PASSWORD</code> from your{" "}
          <code>.env</code> file.
        </Typography.Paragraph>
        {error && <Alert className="mb-4" type="error" message={error} showIcon />}
        <Form layout="vertical" onFinish={onFinish} size="large">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Enter your email" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="admin@keytogo.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Enter your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign in
          </Button>
        </Form>
      </Card>
    </div>
  );
}
