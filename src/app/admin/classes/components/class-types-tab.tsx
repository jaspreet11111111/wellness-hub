'use client'

import { useState } from 'react'
import { createClassType, updateClassType, deleteClassType } from '@/app/actions/admin-classes'
import { useRouter } from 'next/navigation'

export default function ClassTypesTab({ classTypes }: { classTypes: any[] }) {
    const router = useRouter()
    const [showForm, setShowForm] = useState(false)
    const [editingClass, setEditingClass] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)

        const result = editingClass
            ? await updateClassType(editingClass.id, formData)
            : await createClassType(formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            setShowForm(false)
            setEditingClass(null)
            router.refresh()
        }
    }

    async function handleDelete(id: string, name: string) {
        if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
            return
        }

        const result = await deleteClassType(id)
        if (result.error) {
            alert(`Error: ${result.error}`)
        } else {
            router.refresh()
        }
    }

    function handleEdit(classType: any) {
        setEditingClass(classType)
        setShowForm(true)
    }

    function handleCancel() {
        setShowForm(false)
        setEditingClass(null)
        setError(null)
    }

    return (
        <div>
            {/* Add New Button */}
            {!showForm && (
                <div className="mb-6">
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors"
                    >
                        + Add New Class Type
                    </button>
                </div>
            )}

            {/* Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-neutral-50 rounded-lg p-6 mb-6">
                    <h3 className="font-heading text-xl font-bold text-primary-900 mb-4">
                        {editingClass ? 'Edit Class Type' : 'New Class Type'}
                    </h3>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Class Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                defaultValue={editingClass?.name}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="e.g., Hatha Yoga"
                            />
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Duration (minutes) *
                            </label>
                            <input
                                type="number"
                                name="duration"
                                required
                                defaultValue={editingClass?.duration || 60}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Price ($) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                step="0.01"
                                required
                                defaultValue={editingClass?.price}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        {/* Difficulty */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Difficulty Level *
                            </label>
                            <select
                                name="difficulty_level"
                                required
                                defaultValue={editingClass?.difficulty_level || 'beginner'}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>

                        {/* Instructor */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Default Instructor
                            </label>
                            <input
                                type="text"
                                name="instructor"
                                defaultValue={editingClass?.instructor}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="e.g., Sarah Johnson"
                            />
                        </div>

                        {/* Image URL */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="image_url"
                                defaultValue={editingClass?.image_url}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="/images/hathayoga.png"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                required
                                rows={3}
                                defaultValue={editingClass?.description}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Brief description of the class..."
                            />
                        </div>

                        {/* Benefits */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Benefits (one per line)
                            </label>
                            <textarea
                                name="benefits"
                                rows={4}
                                defaultValue={editingClass?.benefits?.join('\n')}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Increases flexibility&#10;Reduces stress&#10;Improves balance"
                            />
                        </div>

                        {/* What to Bring */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                What to Bring
                            </label>
                            <textarea
                                name="what_to_bring"
                                rows={2}
                                defaultValue={editingClass?.what_to_bring}
                                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Yoga mat, water bottle, comfortable clothing..."
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white rounded-lg font-semibold transition-colors"
                        >
                            {loading ? 'Saving...' : (editingClass ? 'Update' : 'Create')}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-lg font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Class Types List */}
            <div className="grid gap-4">
                {classTypes.map((classType: any) => (
                    <div key={classType.id} className="bg-white border border-neutral-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="font-heading text-lg font-bold text-primary-900 mb-1">
                                    {classType.name}
                                </h4>
                                <p className="text-sm text-neutral-600 mb-2">{classType.description}</p>
                                <div className="flex flex-wrap gap-3 text-sm">
                                    <span className="text-neutral-600">
                                        <strong>Duration:</strong> {classType.duration} min
                                    </span>
                                    <span className="text-neutral-600">
                                        <strong>Price:</strong> ${classType.price}
                                    </span>
                                    <span className="text-neutral-600">
                                        <strong>Level:</strong> {classType.difficulty_level}
                                    </span>
                                    {classType.instructor && (
                                        <span className="text-neutral-600">
                                            <strong>Instructor:</strong> {classType.instructor}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(classType)}
                                    className="px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(classType.id, classType.name)}
                                    className="px-4 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {classTypes.length === 0 && !showForm && (
                    <div className="text-center py-12 text-neutral-500">
                        No class types yet. Click "Add New Class Type" to create one.
                    </div>
                )}
            </div>
        </div>
    )
}
