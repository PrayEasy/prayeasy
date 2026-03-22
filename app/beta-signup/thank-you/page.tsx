'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ThankYouPage() {
  const [show, setShow] = useState(false)
  
  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-azure-500 via-ocean-400 to-cobalt-500 flex items-center justify-center px-4 py-8 overflow-y-auto">
      <div className={`w-full max-w-md my-auto transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Celebration */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🙏</span>
            <span className="text-2xl font-bold text-white">PrayEasy</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You for Joining PrayEasy!
          </h1>
          <p className="text-gray-600 mb-6">
            We&apos;re excited to have you in our prayer community. Check your email for a welcome message from us.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full py-4 bg-gradient-to-r from-azure-500 to-ocean-400 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              🙏 Try PrayEasy Now
            </Link>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Here&apos;s what you can explore:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link href="/" className="p-3 rounded-xl bg-azure-50 text-azure-700 hover:bg-azure-100 transition-colors font-medium">
                  💬 Pastor Hope
                </Link>
                <Link href="/devotionals" className="p-3 rounded-xl bg-azure-50 text-azure-700 hover:bg-azure-100 transition-colors font-medium">
                  ☀️ Devotionals
                </Link>
                <Link href="/bible" className="p-3 rounded-xl bg-azure-50 text-azure-700 hover:bg-azure-100 transition-colors font-medium">
                  📖 Bible Study
                </Link>
                <Link href="/prayers/journal" className="p-3 rounded-xl bg-azure-50 text-azure-700 hover:bg-azure-100 transition-colors font-medium">
                  📓 Prayer Journal
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-azure-100 text-sm mt-6">
          Blessings from the PrayEasy Team ✨
        </p>
      </div>
    </div>
  )
}
