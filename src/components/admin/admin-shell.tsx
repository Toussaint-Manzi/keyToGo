"use client";

import {
  AppstoreOutlined,
  BankOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Typography, Button, theme } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: "/admin", icon: <HomeOutlined />, label: <Link href="/admin">Dashboard</Link> },
  {
    key: "/admin/settings",
    icon: <SettingOutlined />,
    label: <Link href="/admin/settings">Site settings</Link>,
  },
  {
    key: "/admin/stats",
    icon: <ThunderboltOutlined />,
    label: <Link href="/admin/stats">Statistics</Link>,
  },
  {
    key: "/admin/services",
    icon: <AppstoreOutlined />,
    label: <Link href="/admin/services">Services</Link>,
  },
  {
    key: "/admin/expertise",
    icon: <BankOutlined />,
    label: <Link href="/admin/expertise">Expertise</Link>,
  },
  {
    key: "/admin/partners",
    icon: <TeamOutlined />,
    label: <Link href="/admin/partners">Partners</Link>,
  },
  {
    key: "/admin/testimonials",
    icon: <FileTextOutlined />,
    label: <Link href="/admin/testimonials">Testimonials</Link>,
  },
  {
    key: "/admin/vision-mission",
    icon: <FileTextOutlined />,
    label: <Link href="/admin/vision-mission">Vision & Mission</Link>,
  },
  {
    key: "/admin/why-choose",
    icon: <TeamOutlined />,
    label: <Link href="/admin/why-choose">Why choose us</Link>,
  },
  {
    key: "/admin/offices",
    icon: <BankOutlined />,
    label: <Link href="/admin/offices">Offices</Link>,
  },
  {
    key: "/admin/quotes",
    icon: <MailOutlined />,
    label: <Link href="/admin/quotes">Quote requests</Link>,
  },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { token } = theme.useToken();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Layout className="min-h-screen">
      <Sider
        breakpoint="lg"
        collapsedWidth={0}
        theme="light"
        className="border-r border-slate-200"
        width={240}
      >
        <div className="border-b border-slate-100 px-4 py-5">
          <Typography.Title level={5} className="!mb-0 !text-teal-700">
            KeyTOGO Admin
          </Typography.Title>
          <Typography.Text type="secondary" className="text-xs">
            Manage your website
          </Typography.Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          className="border-0"
        />
      </Sider>
      <Layout>
        <Header
          className="flex items-center justify-between border-b bg-white px-6"
          style={{ padding: "0 24px", background: token.colorBgContainer }}
        >
          <Typography.Text type="secondary">
            Simple tools — changes appear on the live site within a few minutes.
          </Typography.Text>
          <Button icon={<LogoutOutlined />} onClick={logout}>
            Sign out
          </Button>
        </Header>
        <Content className="bg-slate-50 p-6">{children}</Content>
      </Layout>
    </Layout>
  );
}
