'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BetaSignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interestedInBeta: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, phone: formatPhone(value) }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }))
    }
  }

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Please enter your first and last name.')
      return
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.')
      return
    }
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone,
          interested_in_beta: formData.interestedInBeta,
          source: 'Weekend Event - March 28, 2026',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      router.push('/beta-signup/thank-you')
    } catch {
      setError('Network error. Please check your connection and try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-azure-500 via-ocean-400 to-cobalt-500 flex items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-md my-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-4xl" role="img" aria-label="pray">🙏</span>
            <span className="text-3xl font-bold text-white">PrayEasy</span>
          </Link>
          <p className="text-azure-100 mt-2 text-lg">Your AI-Powered Prayer Companion</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Join PrayEasy</h1>
            <p className="text-gray-600 mt-1">Sign up to experience faith-powered prayer</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-azure-500 focus:border-azure-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-azure-500 focus:border-azure-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-azure-500 focus:border-azure-500 outline-none transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                maxLength={14}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-azure-500 focus:border-azure-500 outline-none transition-all text-gray-900 placeholder-gray-400"
              />
            </div>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-azure-50 border border-azure-200 cursor-pointer">
              <input
                name="interestedInBeta"
                type="checkbox"
                checked={formData.interestedInBeta}
                onChange={handleChange}
                className="mt-0.5 w-5 h-5 text-azure-500 border-gray-300 rounded focus:ring-azure-500"
              />
              <span className="text-sm text-gray-700">
                <strong>Yes!</strong> I&apos;m interested in beta testing new features 🚀
              </span>
            </label>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-azure-500 to-ocean-400 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Joining...
                </>
              ) : (
                <>🙏 Join PrayEasy</>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            We respect your privacy. Your information is never shared.
          </p>
        </div>

        <p className="text-center text-azure-100 text-sm mt-6">
          Already using PrayEasy?{' '}
          <Link href="/" className="text-white font-semibold underline">
            Go to App →
          </Link>
        </p>
      </div>
    </div>
  )
}
