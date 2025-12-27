export default function ApplicationLogo(props) {
    return (
        <div {...props} className={`flex items-center space-x-2 ${props.className}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 font-bold text-white shadow-lg animate-pulse-subtle">
                D
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
                Diget<span className="text-indigo-600">Group</span>
            </span>
        </div>
    );
}
