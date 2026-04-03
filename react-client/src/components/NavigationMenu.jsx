export default function NavigationMenu({ menuItems }) {
    return (
        <div className="flex items-center gap-10">
            {menuItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <span className="text-[11px] tracking-[0.18em] text-black font-medium cursor-pointer uppercase">
                        {item.label}
                    </span>
                    {item.svg && (
                        <span className="inline-flex">
                            {item.svg}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}