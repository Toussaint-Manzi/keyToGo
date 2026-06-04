"use client";

import { FileTextOutlined, MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic, Typography } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    quotesNew: 0,
    servicesCount: 0,
    expertiseCount: 0,
    officesCount: 0,
  });

  useEffect(() => {
    void fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) setStats(j.data);
      });
  }, []);

  return (
    <div>
      <Typography.Title level={3}>Welcome back</Typography.Title>
      <Typography.Paragraph type="secondary">
        Use the menu on the left to update text, services, and contact details. Changes
        go live automatically.
      </Typography.Paragraph>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="New quote requests"
              value={stats.quotesNew}
              prefix={<MailOutlined />}
            />
            <Link href="/admin/quotes" className="text-teal-600 text-sm">
              View requests →
            </Link>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Services" value={stats.servicesCount} prefix={<AppstoreOutlined />} />
            <Link href="/admin/services" className="text-teal-600 text-sm">
              Manage services →
            </Link>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Expertise areas" value={stats.expertiseCount} prefix={<FileTextOutlined />} />
            <Link href="/admin/expertise" className="text-teal-600 text-sm">
              Manage expertise →
            </Link>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Offices" value={stats.officesCount} />
            <Link href="/admin/offices" className="text-teal-600 text-sm">
              Manage offices →
            </Link>
          </Card>
        </Col>
      </Row>

      <Card className="mt-8" title="Quick tips">
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>Start with Site settings to update the homepage headline and contact info.</li>
          <li>Turn off &quot;Published&quot; to hide an item without deleting it.</li>
          <li>Lower sort order numbers appear first on the website.</li>
        </ul>
      </Card>
    </div>
  );
}
