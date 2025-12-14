'use client'

import { useState, useEffect } from 'react'
import { getAllClassTypes, getAllClassSessions } from '@/app/actions/admin-classes'
import ClassTypesTab from './components/class-types-tab'
// import ClassSessionsTab from './components/class-sessions-tab'

export default function AdminClassesContent() {
    const [activeTab, setActiveTab] = useState<'types' | 'sessions'>('types')
    const [classTypes, setClassTypes] = useState<any[]>([])
    const [classSessions, setClassSessions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            const [types, sessions] = await Promise.all([
                getAllClassTypes(),
                getAllClassSessions(),
            ])
            setClassTypes(types)
            setClassSessions(sessions)
            setLoading(false)
        }
        loadData()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-4xl font-bold text-primary-900 mb-2">
                        Manage Classes
                    </h1>
                    <p className="text-neutral-600">
                        Add, edit, or remove class types and scheduled sessions
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="border-b border-neutral-200">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('types')}
                                className={`px-6 py-4 font-semibold transition-colors ${activeTab === 'types'
                                        ? 'text-primary-700 border-b-2 border-primary-700'
                                        : 'text-neutral-600 hover:text-neutral-900'
                                    }`}
                            >
                                Class Types ({classTypes.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('sessions')}
                                className={`px-6 py-4 font-semibold transition-colors ${activeTab === 'sessions'
                                        ? 'text-primary-700 border-b-2 border-primary-700'
                                        : 'text-neutral-600 hover:text-neutral-900'
                                    }`}
                            >
                                Scheduled Sessions ({classSessions.length})
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {activeTab === 'types' ? (
                            <ClassTypesTab classTypes={classTypes} />
                        ) : (
                            <div className="text-center py-12 text-neutral-500">
                                <p className="text-lg font-medium mb-2">Session Management Coming Soon</p>
                                <p className="text-sm">
                                    You can currently view {classSessions.length} scheduled sessions.
                                    <br />
                                    Full session management (add/edit/delete) will be added shortly.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-8">
                    <a
                        href="/admin"
                        className="text-primary-700 hover:text-primary-800 font-medium"
                    >
                        ← Back to Admin Dashboard
                    </a>
                </div>
            </div>
        </div>
    )
}
