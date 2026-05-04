import * as React from "react"

type BadgeProps = {
    variant: "default" | "secondary" | "destructive" | "outline",
    className: string,
}
function Badge({
    className,
    variant
}: BadgeProps) {
    const badgeVariants = {
        default:
            "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
            "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",

    }
    return (<div className={`${badgeVariants[variant]} ${className}`} />);
}

export { Badge }
