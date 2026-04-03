export default function ProgressBar({ currentSlide, slides, progress, isLargeScreen }) {
    // Guard against undefined values
    if (!slides || slides.length === 0 || currentSlide === undefined) {
        return null;
    }
    
    const currentNumber = currentSlide + 1;
    const totalSlides = slides.length;
    
    // Progress goes from 0 to 1 during the entire slideshow
    const progressPercentage = ((progress || 0) * 100);
    
    return (
        <div 
            className={`
                absolute top-8 left-5 z-50
                flex items-center gap-3
                bg-black/60 backdrop-blur-sm
                px-4 py-0.5
                w-[calc(100%-40px)]
                md:w-auto
                md:min-w-[240px]
                lg:min-w-[280px]
                xl:min-w-[320px]
            `}
            style={{
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                borderRadius: '0'
            }}
        >
            {/* Slide counter */}
            <div className="flex items-center gap-1 shrink-0">
                <span className="text-white font-medium text-sm md:text-base">
                    {currentNumber}
                </span>
                <span className="text-white/60 text-sm md:text-base">
                    /
                </span>
                <span className="text-white/80 text-sm md:text-base">
                    {totalSlides}
                </span>
            </div>
            
            {/* Progress bar container - full width available */}
            <div className="relative flex-1 h-[2px] bg-white/30 overflow-visible" style={{ borderRadius: '0', minWidth: '80px' }}>
                {/* Progress fill - worm that crawls forward */}
                <div 
                    className="absolute top-0 left-0 h-full bg-white"
                    style={{ 
                        width: `${progressPercentage}%`,
                        borderRadius: '0',
                        transition: 'width 0.05s linear',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 2px rgba(255,255,255,0.5)'
                    }}
                />
            </div>
        </div>
    );
}