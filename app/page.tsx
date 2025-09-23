import Link from 'next/link'  
import { Heart, BookOpen, Users, Shield } from 'lucide-react'  
  
export default function Home() {  
  return (  
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">  
      {/* Hero Section */}  
      <div className="text-center mb-16">  
        <h1 className="text-5xl font-bold text-gray-900 mb-6">  
          Welcome to <span className="text-indigo-600">PrayEasy</span>  
        </h1>  
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">  
          Your personal digital prayer journal. Organize, track, and reflect on your prayers   
          in a simple, beautiful, and secure environment.  
        </p>  
        <div className="space-x-4">  
          <Link href="/prayers" className="btn-primary text-lg px-8 py-3">  
            Start Praying  
          </Link>  
          <Link href="/about" className="btn-secondary text-lg px-8 py-3">  
            Learn More  
          </Link>  
        </div>  
      </div>  
  
      {/* Features Grid */}  
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">  
        <div className="text-center">  
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">  
            <Heart className="w-8 h-8 text-indigo-600" />  
          </div>  
          <h3 className="text-lg font-semibold mb-2">Personal & Private</h3>  
          <p className="text-gray-600">Your prayers are kept secure and private, just between you and God.</p>  
        </div>  
          
        <div className="text-center">  
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">  
            <BookOpen className="w-8 h-8 text-indigo-600" />  
          </div>  
          <h3 className="text-lg font-semibold mb-2">Organized Journal</h3>  
          <p className="text-gray-600">Categorize and organize your prayers for easy reflection and review.</p>  
        </div>  
          
        <div className="text-center">  
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">  
            <Users className="w-8 h-8 text-indigo-600" />  
          </div>  
          <h3 className="text-lg font-semibold mb-2">Community Support</h3>  
          <p className="text-gray-600">Share prayer requests with trusted friends and family when you choose.</p>  
        </div>  
          
        <div className="text-center">  
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">  
            <Shield className="w-8 h-8 text-indigo-600" />  
          </div>  
          <h3 className="text-lg font-semibold mb-2">Answer Tracking</h3>  
          <p className="text-gray-600">Mark prayers as answered and see God's faithfulness over time.</p>  
        </div>  
      </div>  
  
      {/* CTA Section */}  
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">  
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Begin?</h2>  
        <p className="text-gray-600 mb-6">  
          Join thousands who have found peace and organization in their prayer life with PrayEasy.  
        </p>  
        <Link href="/prayers" className="btn-primary text-lg px-8 py-3">  
          Create Your First Prayer  
        </Link>  
      </div>  
    </div>  
  )  
}  
