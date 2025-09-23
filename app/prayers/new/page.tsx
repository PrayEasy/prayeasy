import Link from 'next/link'  
import { ArrowLeft } from 'lucide-react'  
  
export default function NewPrayerPage() {  
  return (  
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  
      {/* Header */}  
      <div className="mb-8">  
        <Link href="/prayers" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4">  
          <ArrowLeft className="w-5 h-5" />  
          Back to Prayers  
        </Link>  
        <h1 className="text-3xl font-bold text-gray-900">New Prayer</h1>  
        <p className="text-gray-600 mt-2">Share your heart with God</p>  
      </div>  
  
      {/* Prayer Form */}  
      <div className="bg-white rounded-lg shadow-lg p-6">  
        <form className="space-y-6">  
          {/* Title */}  
          <div>  
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">  
              Prayer Title  
            </label>  
            <input  
              type="text"  
              id="title"  
              name="title"  
              placeholder="What would you like to pray about?"  
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"  
            />  
          </div>  
  
          {/* Category */}  
          <div>  
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">  
              Category  
            </label>  
            <select  
              id="category"  
              name="category"  
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"  
            >  
              <option value="">Select a category</option>  
              <option value="Health">Health</option>  
              <option value="Family">Family</option>  
              <option value="Career">Career</option>  
              <option value="Relationships">Relationships</option>  
              <option value="Finances">Finances</option>  
              <option value="Spiritual Growth">Spiritual Growth</option>  
              <option value="Gratitude">Gratitude</option>  
              <option value="Other">Other</option>  
            </select>  
          </div>  
  
          {/* Content */}  
          <div>  
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">  
              Your Prayer  
            </label>  
            <textarea  
              id="content"  
              name="content"  
              rows={8}  
              placeholder="Dear God, I come to you today..."  
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"  
            />  
          </div>  
  
          {/* Privacy Setting */}  
          <div className="flex items-center">  
            <input  
              type="checkbox"  
              id="isPrivate"  
              name="isPrivate"  
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"  
            />  
            <label htmlFor="isPrivate" className="ml-2 block text-sm text-gray-700">  
              Keep this prayer private (only visible to you)  
            </label>  
          </div>  
  
          {/* Submit Buttons */}  
          <div className="flex gap-4 pt-4">  
            <button  
              type="submit"  
              className="btn-primary flex-1"  
            >  
              Save Prayer  
            </button>  
            <Link href="/prayers" className="btn-secondary flex-1 text-center">  
              Cancel  
            </Link>  
          </div>  
        </form>  
      </div>  
    </div>  
  )  
}  
