/** @format */

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container-custom h-screen bg-slate-200 dark:bg-slate-900 flex items-center justify-center">
      {children}
    </div>
  );
}
