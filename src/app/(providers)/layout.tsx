// import AuthProvider from './_providers/AuthProvider';
// import QueryProvider from './_providers/QueryProvider';
// import 'xp.css/dist/XP.css';

// function ProvidersLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AuthProvider>
//       <QueryProvider>
//         <div
//           className={` font-medium min-h-screen w-full  flex flex-col  bg-center bg-no-repeat bg-cover`}
//         >
//           <main className="flex-grow overflow-hidden font-dotum">
//             {children}
//           </main>
//         </div>
//       </QueryProvider>
//     </AuthProvider>
//   );
// }

// export default ProvidersLayout;
import AuthProvider from './_providers/AuthProvider';
import BlogProvider from './_providers/BlogProvider';
import QueryProvider from './_providers/QueryProvider';
import 'xp.css/dist/XP.css';

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>
        <BlogProvider>
          <div className="min-h-screen flex flex-col justify-between font-medium w-full bg-center bg-no-repeat bg-cover">
            <main className="flex-grow overflow-auto font-dotum">
              {children}
            </main>
          </div>
        </BlogProvider>
      </QueryProvider>
    </AuthProvider>
  );
}

export default ProvidersLayout;
