import Image from "next/image";

export default function RootLayout({
     children,
   }: Readonly<{
     children: React.ReactNode;
   }>) {
     return (
       <html lang="en">
         <main className="flex min-h-screen w-full justify-between font-inter"> 
             {children}
             <div className="auth-asset">
              <div>
                <Image src='/icons/image.png' alt="Auth Image" width={700} height={800} />
              </div>
             </div>
         </main>
       </html>
     );
   }
   