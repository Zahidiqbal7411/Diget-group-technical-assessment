export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl btn-primary-gradient px-5 py-2.5 text-sm font-bold tracking-tight transition-all ${disabled && 'opacity-50 grayscale pointer-events-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
