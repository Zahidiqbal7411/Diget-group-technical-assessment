export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-red-600 px-5 py-2.5 text-sm font-bold tracking-tight text-white transition-all duration-200 hover:bg-red-500 hover:shadow-lg hover:shadow-red-200 active:scale-[0.98] ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
