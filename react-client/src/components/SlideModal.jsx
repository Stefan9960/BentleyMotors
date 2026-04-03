import { useEffect, useState } from "react";

export default function SlideModal({ slide, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (slide) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [slide]);

  useEffect(() => {
    if (!slide) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [slide]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 400);
  };

  if (!slide) return null;

  // ── Markdown parser ──────────────────────────────────
  const parseMarkdown = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={idx}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#394D45] hover:text-[#4a6a5c] block my-2"
          >
            {linkMatch[1]}
          </a>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-gray-900 block mt-4 mb-2">
            {line.slice(2, -2)}
          </strong>
        );
      }
      if (line.includes('**') && !line.startsWith('**')) {
        const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <p key={idx} className="mb-2" dangerouslySetInnerHTML={{ __html: boldText }} />;
      }
      if (line.trim()) {
        return <p key={idx} className="mb-2">{line}</p>;
      }
      return <br key={idx} />;
    });
  };

  // ── Button icon ──────────────────────────────────────
  const exploreSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" />
    </svg>
  );

  const playSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3l14 9-14 9V3z" />
    </svg>
  );

  const getButtonIcon = (label) => {
    if (!label) return exploreSvg;
    const upper = label.toUpperCase();
    if (upper === 'WATCH THE FILM') return playSvg;
    return exploreSvg;
  };

  return (
    <div className="fixed inset-0" style={{ zIndex: 1100 }}>

      {/* ================================
          MOBILE — below 768px
      ================================ */}
      <div className="md:hidden w-full h-full">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-white bg-black/40 hover:bg-black/60 rounded-full w-8 h-8 flex items-center justify-center text-lg cursor-pointer"
        >
          ✕
        </button>
        <div
          className="absolute left-0 right-0 bottom-0 bg-white overflow-y-auto z-10"
          style={{
            height: '100vh',
            transform: visible ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full overflow-hidden" style={{ height: 'min(72vh, 500px)' }}>
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          </div>
          <div className="px-3 py-2">
            <h2 className="text-2xl font-light text-gray-900 mb-2">{slide.title}</h2>
            <div className="text-gray-700 text-sm leading-relaxed">
              {parseMarkdown(slide.description)}
            </div>
          </div>
          {slide.buttonLabel && (
            <div className="px-3 pb-3 mt-2">
              <a
                href={slide.link || "#"}
                className="flex items-center justify-center gap-2 w-full py-2 bg-[#1e3a2f] hover:bg-[#162d24] text-white text-sm tracking-widest uppercase font-medium transition-colors"
              >
                {getButtonIcon(slide.buttonLabel)}
                {slide.buttonLabel}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ================================
          TABLET — 768px to 1023px
      ================================ */}
      <div
        className="hidden md:flex lg:hidden w-full h-full"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Left — image */}
        <div className="w-[35%] h-full flex-shrink-0 relative">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6">
            <h3 className="text-white text-[28px] font-light">{slide.title}</h3>
          </div>
        </div>

        {/* Right — white content panel */}
        <div
          className="flex-1 bg-white flex flex-col justify-between overflow-y-auto"
          style={{
            transform: visible ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 border-none px-4 py-2 text-sm tracking-widest uppercase text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
            >
              ✕ Close
            </button>
          </div>
          <div className="px-10 py-6 flex-1">
            <h2 className="text-2xl font-light text-gray-900 mb-6">{slide.title}</h2>
            <div className="text-gray-700 text-sm leading-relaxed">
              {parseMarkdown(slide.description)}
            </div>
          </div>
          {slide.buttonLabel && (
            <div className="px-10 pb-10">
              <a
                href={slide.link || "#"}
                className="flex items-center gap-2 py-4 px-6 bg-[#1e3a2f] hover:bg-[#162d24] text-white text-sm tracking-widest uppercase font-medium transition-colors w-fit"
              >
                {getButtonIcon(slide.buttonLabel)}
                {slide.buttonLabel}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* ================================
          DESKTOP — 1024px and above
      ================================ */}
      <div className="hidden lg:flex w-full h-full">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-white bg-black/40 hover:bg-black/60 rounded-full w-8 h-8 flex items-center justify-center text-lg cursor-pointer"
        >
          ✕
        </button>
      </div>

    </div>
  );
}