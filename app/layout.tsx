import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './components/ThemeProvider'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PrayEasy - Your Digital Prayer Journey with Pastor Hope',
  description: 'Experience compassionate, Scripture-based prayer support with Pastor Hope AI. Submit your prayers and receive personalized spiritual guidance.',
  keywords: 'prayer, spiritual guidance, Pastor Hope, Bible verses, faith, Christian',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-azure-50 dark:from-slate-900 dark:via-slate-900 dark:to-cobalt-900 transition-colors duration-300">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
