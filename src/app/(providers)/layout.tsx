import AuthProvider from './_providers/AuthProvider';
import QueryProvider from './_providers/QueryProvider';
import 'xp.css/dist/XP.css';

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>
        <div
          className={` font-medium  w-full h-screen flex flex-col  bg-center bg-no-repeat bg-cover`}
        >
          <main className="flex-grow overflow-hidden font-dotum">
            {children}
          </main>
        </div>
      </QueryProvider>
    </AuthProvider>
  );
}

export default ProvidersLayout;
