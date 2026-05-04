import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"

type ButtonProps = {
    variant: "default" | "destructive" | "secondary" | "ghost" | "link" | "outline" | "primary" | "disabled" | "icon",
    size: "default" | "sm" | "lg" | "icon",
    className?: string,
    asChild?: boolean
}
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }: ButtonProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ref) => {
    const buttonVariants = {
        default:
            "bg-(--primary) text-(--primary-foreground) shadow hover:bg-(--primary)/90",
        destructive:
            "bg-(--destructive) text-(--destructive-foreground) shadow-sm hover:bg-(--destructive)/90",
        outline:
            "border border-(--input) bg-transparent hover:bg-(--accent) hover:text-(--accent-foreground)",
        secondary:
            "bg-(--secondary) text-(--secondary-foreground) shadow-sm hover:bg-(--secondary)/80",
        primary:
            "bg-(--primary) text-(--primary-foreground) shadow-sm hover:bg-(--primary)/80",
        ghost: "hover:bg-(--accent) hover:text-(--accent-foreground)",
        link: "text-(--primary) underline-offset-4 hover:underline",
        disabled:  "bg-(--foreground)/50 text-(--secondary-foreground)",
        icon: "hover:bg-(--accent) hover:text-(--accent-foreground)",
    }
    const buttonSize = {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
    }
    // const Comp = asChild ? Slot : "button"
    return (
        (<button
            className={`${buttonVariants[variant]} ${buttonSize[size]} ${className}`}
            // ref={ref}
            {...props}
        />)
    );
})
Button.displayName = "Button"

export { Button }
