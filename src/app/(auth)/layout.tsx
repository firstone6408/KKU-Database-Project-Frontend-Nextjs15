/** @format */

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen bg-slate-200 dark:bg-slate-900">
      <div className="container-custom flex items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
}
