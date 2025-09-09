import React from 'react'

export default function Loader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading...</p>
            </div>
        </div>
    )
}


