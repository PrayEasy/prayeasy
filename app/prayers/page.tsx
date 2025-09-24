"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle, Search, Filter, BookOpen } from "lucide-react"

export default function PrayersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center">
        <BookOpen className="mr-2" /> My Prayers
      </h1>
      <p className="text-gray-600">Start your prayer journal here ??</p>
    </div>
  )
}
