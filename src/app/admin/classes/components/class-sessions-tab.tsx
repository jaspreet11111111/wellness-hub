'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClassSession, updateClassSession, deleteClassSession } from '@/app/actions/admin-classes'

interface ClassSessionsTabProps {
    classSessions: any[]
    classTypes: any[]
}

export default function ClassSessionsTab({ classSessions, classTypes }: ClassSessionsTabProps) {
    const router = useRouter()
    const [showForm, setShowForm] = useState(false)
    const [editingSession, setEditingSession] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        classTypeId: '',
        date: '',
        time: '',
        duration: '60',
        maxCapacity: '10',
        location: '',
        instructorOverride: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const data = {
                ...formData,
                duration: parseInt(formData.duration),
                maxCapacity: parseInt(formData.maxCapacity)
            }

            if (editingSession) {
                await updateClassSession(editingSession.id, data)
            } else {
                await createClassSession(data)
            }

            setShowForm(false)
            setEditingSession(null)
            resetForm()
            router.refresh()
        } catch (err: any) {
            setError(err?.message || 'Failed to save session')
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (session: any) => {
        setEditingSession(session)
        setFormData({
            classTypeId: session.class_type_id,
            date: session.date,
            time: session.time,
            duration: session.duration.toString(),
            maxCapacity: session.max_capacity.toString(),
            location: session.location || '',
            instructorOverride: session.instructor_override || '',
        })
        setShowForm(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this session?')) return

        setLoading(true)
        try {
            await deleteClassSession(id)
            router.refresh()
        } catch (err: any) {
            setError(err?.message || 'Failed to delete session')
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setFormData({
            classTypeId: '',
            date: '',
            time: '',
            duration: '60',
            maxCapacity: '10',
            location: '',
            instructorOverride: '',
        })
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditingSession(null)
        resetForm()
        setError('')
    }

    return (
        <div>
            {/* Header with Add Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary-900">
                    Scheduled Sessions ({classSessions.length})
                </h2>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        + Add Session
                    </button>
                )}
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            {/* Add/Edit Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 bg-neutral-50 rounded-lg border border-neutral-200">
                    <h3 className="text-xl font-bold mb-4">
                        {editingSession ? 'Edit Session' : 'New Session'}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Class Type */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Class Type *
                            </label>
                            <select
                                required
                                value={formData.classTypeId}
                                onChange={(e) => setFormData({ ...formData, classTypeId: e.target.value })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">Select a class type...</option>
                                {classTypes.map((type: any) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Date *
                            </label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Time *
                            </label>
                            <input
                                type="time"
                                required
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Duration (minutes) *
                            </label>
                            <input
                                type="number"
                                required
                                min="15"
                                step="15"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Max Capacity */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Max Capacity *
                            </label>
                            <input
                                type="number"
                                required
                                min="1"
                                value={formData.maxCapacity}
                                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="e.g., Studio A"
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* Instructor Override */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Instructor Override
                            </label>
                            <input
                                type="text"
                                value={formData.instructorOverride}
                                onChange={(e) => setFormData({ ...formData, instructorOverride: e.target.value })}
                                placeholder="Leave empty to use class type's default instructor"
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : editingSession ? 'Update Session' : 'Create Session'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Sessions List */}
            <div className="space-y-4">
                {classSessions.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                        <p className="text-lg font-medium">No sessions scheduled yet</p>
                        <p className="text-sm">Click "Add Session" to create your first class session</p>
                    </div>
                ) : (
                    classSessions.map((session: any) => (
                        <div
                            key={session.id}
                            className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 transition-colors"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg text-primary-900">
                                        {session.class_type?.name || 'Unknown Class'}
                                    </h4>
                                    <div className="mt-2 grid md:grid-cols-2 gap-2 text-sm text-neutral-600">
                                        <div>
                                            <span className="font-medium">Date:</span> {new Date(session.date).toLocaleDateString()}
                                        </div>
                                        <div>
                                            <span className="font-medium">Time:</span> {session.time}
                                        </div>
                                        <div>
                                            <span className="font-medium">Duration:</span> {session.duration} min
                                        </div>
                                        <div>
                                            <span className="font-medium">Capacity:</span> {session.booked_count}/{session.max_capacity}
                                        </div>
                                        {session.location && (
                                            <div>
                                                <span className="font-medium">Location:</span> {session.location}
                                            </div>
                                        )}
                                        {session.instructor_override && (
                                            <div>
                                                <span className="font-medium">Instructor:</span> {session.instructor_override}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${session.status === 'scheduled'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                            }`}>
                                            {session.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(session)}
                                        className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded hover:bg-primary-200 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(session.id)}
                                        disabled={loading}
                                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors disabled:opacity-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
