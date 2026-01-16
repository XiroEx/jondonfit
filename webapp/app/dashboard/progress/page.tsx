"use client"
import { useEffect, useState } from 'react'
import PageTransition from "@/components/PageTransition"

interface WeightEntry {
  date: string
  weight: number
  unit: string
}

export default function ProgressPage() {
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchWeightHistory()
  }, [])

  async function fetchWeightHistory() {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/weight', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setWeightEntries(data.weightEntries || [])
      }
    } catch (err) {
      console.error('Error fetching weight history:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const sortedEntries = [...weightEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const latestWeight = sortedEntries[0]
  const earliestWeight = sortedEntries[sortedEntries.length - 1]
  const weightChange = latestWeight && earliestWeight 
    ? (latestWeight.weight - earliestWeight.weight).toFixed(1)
    : null

  return (
    <PageTransition>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Progress</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">Track lifts, photos and measurements.</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Weight Tracking</h2>
        
        {isLoading ? (
          <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
        ) : weightEntries.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-600 dark:text-zinc-400">
              No weight entries yet. You'll be prompted to track your weight daily on the dashboard.
            </p>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid gap-4 mb-6 md:grid-cols-3">
              <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Current Weight</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {latestWeight?.weight} {latestWeight?.unit}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  {formatDate(latestWeight?.date)}
                </p>
              </div>

              <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Entries</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {weightEntries.length}
                </p>
              </div>

              {weightChange !== null && (
                <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Change</p>
                  <p className={`text-2xl font-bold ${
                    parseFloat(weightChange) > 0 
                      ? 'text-orange-600' 
                      : parseFloat(weightChange) < 0 
                      ? 'text-green-600' 
                      : 'text-zinc-900 dark:text-white'
                  }`}>
                    {parseFloat(weightChange) > 0 ? '+' : ''}{weightChange} {latestWeight?.unit}
                  </p>
                </div>
              )}
            </div>

            {/* Weight History */}
            <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-white">Weight History</h3>
              </div>
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {sortedEntries.map((entry, index) => {
                  const prevEntry = sortedEntries[index + 1]
                  const change = prevEntry 
                    ? (entry.weight - prevEntry.weight).toFixed(1)
                    : null

                  return (
                    <div key={index} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">
                          {entry.weight} {entry.unit}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          {formatDate(entry.date)}
                        </p>
                      </div>
                      {change !== null && (
                        <div className={`text-sm font-medium ${
                          parseFloat(change) > 0 
                            ? 'text-orange-600' 
                            : parseFloat(change) < 0 
                            ? 'text-green-600' 
                            : 'text-zinc-500'
                        }`}>
                          {parseFloat(change) > 0 ? '+' : ''}{change} {entry.unit}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </PageTransition>
  )
}
