/** @format */

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="h-screen bg-slate-200">{children}</div>;
}
