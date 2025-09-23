import './globals.css'  
import { Inter } from 'next/font/google'  
  
const inter = Inter({ subsets: ['latin'] })  
  
export const metadata = {  
  title: 'PrayEasy - Your Digital Prayer Journal',  
  description: 'A simple and beautiful way to organize your prayers',  
}  
  
export default function RootLayout({  
  children,  
}: {  
  children: React.ReactNode  
}) {  
  return (  
    <html lang="en">  
      <body className={inter.className}>  
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">  
          <header className="bg-white shadow-sm border-b">  
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
              <div className="flex justify-between items-center py-4">  
                <h1 className="text-2xl font-bold text-indigo-600">PrayEasy</h1>  
                <nav className="space-x-4">  
                  <a href="/" className="text-gray-600 hover:text-indigo-600">Home</a>  
                  <a href="/prayers" className="text-gray-600 hover:text-indigo-600">My Prayers</a>  
                </nav>  
              </div>  
            </div>  
          </header>  
          <main>{children}</main>  
        </div>  
      </body>  
    </html>  
  )  
}  
