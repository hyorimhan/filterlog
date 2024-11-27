import AuthProvider from './_providers/AuthProvider';
import QueryProvider from './_providers/QueryProvider';
import 'xp.css/dist/XP.css';

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col justify-between font-medium w-full bg-center bg-no-repeat bg-cover">
          <main className="flex-grow overflow-auto font-dotum">{children}</main>
        </div>
      </AuthProvider>
    </QueryProvider>
  );
}

export default ProvidersLayout;
