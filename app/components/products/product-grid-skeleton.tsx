import React from 'react';

export default function ProductGridSkeleton({ count = 8 }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-(--card) rounded-xl overflow-hidden">
                    <div className="aspect-square skeleton-shimmer" />
                    <div className="p-4 space-y-3">
                        <div className="h-3 w-16 skeleton-shimmer rounded" />
                        <div className="h-4 w-full skeleton-shimmer rounded" />
                        <div className="h-4 w-2/3 skeleton-shimmer rounded" />
                        <div className="h-5 w-24 skeleton-shimmer rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}