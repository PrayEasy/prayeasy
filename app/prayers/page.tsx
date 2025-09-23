import { PlusCircle, Search, Filter } from 'lucide-react'  
import Link from 'next/link'  
  
// This would normally fetch from your database  
const samplePrayers = [  
  {  
    id: '1',  
    title: 'Guidance for Career Decision',  
    content: 'Lord, please guide me as I consider this new job opportunity...',  
    category: 'Career',  
    isAnswered: false,  
    createdAt: new Date('2024-01-15'),  
  },  
  {  
    id: '2',  
    title: 'Healing for Mom',  
    content: 'Please bring healing and comfort to my mother during her recovery...',  
    category: 'Health',  
    isAnswered: true,  
    createdAt: new Date('2024-01-10'),  
  },  
  {  
    id: '3',  
    title: 'Peace in Relationships',  
    content: 'Help me to be more patient and understanding with my family...',  
    category: 'Relationships',  
    isAnswered: false,  
    createdAt: new Date('2024-01-08'),  
  },  
]  
  
export default function PrayersPage() {  
  return (  
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  
      {/* Header */}  
      <div className="flex justify-between items-center mb-8">  
        <div>  
          <h1 className="text-3xl font-bold text-gray-900">My Prayers</h1>  
          <p className="text-gray-600 mt-2">Manage and track your prayer requests</p>  
        </div>  
        <Link href="/prayers/new" className="btn-primary flex items-center gap-2">  
          <PlusCircle className="w-5 h-5" />  
          New Prayer  
        </Link>  
      </div>  
  
      {/* Search and Filter Bar */}  
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">  
        <div className="flex gap-4">  
          <div className="flex-1 relative">  
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />  
            <input  
              type="text"  
              placeholder="Search prayers..."  
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"  
            />  
          </div>  
          <button className="btn-secondary flex items-center gap-2">  
            <Filter className="w-5 h-5" />  
            Filter  
          </button>  
        </div>  
      </div>  
  
      {/* Prayers Grid */}  
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">  
        {samplePrayers.map((prayer) => (  
          <div key={prayer.id} className="prayer-card">  
            <div className="flex justify-between items-start mb-3">  
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">  
                {prayer.title}  
              </h3>  
              {prayer.isAnswered && (  
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">  
                  Answered  
                </span>  
              )}  
            </div>  
              
            <p className="text-gray-600 mb-4 line-clamp-3">  
              {prayer.content}  
            </p>  
              
            <div className="flex justify-between items-center text-sm">  
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">  
                {prayer.category}  
              </span>  
              <span className="text-gray-500">  
                {prayer.createdAt.toLocaleDateString()}  
              </span>  
            </div>  
              
            <div className="mt-4 flex gap-2">  
              <Link href={`/prayers/${prayer.id}`} className="btn-primary text-sm flex-1 text-center">  
                View  
              </Link>  
              <Link href={`/prayers/${prayer.id}/edit`} className="btn-secondary text-sm flex-1 text-center">  
                Edit  
              </Link>  
            </div>  
          </div>  
        ))}  
      </div>  
  
      {/* Empty State (if no prayers) */}  
      {samplePrayers.length === 0 && (  
        <div className="text-center py-12">  
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">  
            <BookOpen className="w-12 h-12 text-gray-400" />  
          </div>  
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No prayers yet</h3>  
          <p className="text-gray-600 mb-6">Start your prayer journey by creating your first prayer.</p>  
          <Link href="/prayers/new" className="btn-primary">  
            Create Your First Prayer  
          </Link>  
        </div>  
      )}  
    </div>  
  )  
}  
