import React from 'react';

export default function SpecBadge({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary/80 min-w-20">
            <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
            <span className="text-sm font-bold">{value}</span>
        </div>
    );
}