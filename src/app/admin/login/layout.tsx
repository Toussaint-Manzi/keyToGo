import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { Suspense } from "react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={{ token: { colorPrimary: "#14b8a6" } }}>
        <Suspense>{children}</Suspense>
      </ConfigProvider>
    </AntdRegistry>
  );
}
