"use client";

import Image from "next/image";

interface LanyardBadgeProps {
  src?: string;
  alt?: string;
  className?: string;
}

export const LanyardBadge = ({
  src = "/images/Perfil/Foto.png",
  alt = "Foto de perfil de Daniel Ramirez",
  className = "",
}: LanyardBadgeProps) => {
  return (
    <div
      // Eliminamos el absolute, left-1/2 y top. Dejamos solo flexbox y el className dinámico.
      className={`flex flex-col items-center z-40 ${className}`}
      aria-hidden="true"
    >
      {/* Strap */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: "58px",
          height: "280px",
          background: "linear-gradient(180deg, #151515 0%, #101010 55%, #151515 100%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02), inset 6px 0 10px -10px rgba(125,211,252,0.45), inset -6px 0 10px -10px rgba(245,158,11,0.38)",
          borderLeft: "1px solid rgba(125,211,252,0.55)",
          borderRight: "1px solid rgba(245,158,11,0.48)",
        }}
      >
        {/* Edge glow stripes */}
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-[rgba(125,211,252,0.8)] via-[rgba(125,211,252,0.25)] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-[rgba(245,158,11,0.8)] via-[rgba(245,158,11,0.25)] to-transparent" />
        {/* Subtle weave texture */}
        <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(0deg,transparent_0px,transparent_3px,rgba(255,255,255,0.015)_3px,rgba(255,255,255,0.015)_4px)]" />
        {/* Text printed on strap */}
        <div
          className="relative whitespace-nowrap uppercase tracking-[0.42em] text-[9px] sm:text-[10px]"
          style={{
            color: "rgba(235,238,245,0.92)",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            textShadow: "0 1px 12px rgba(0,0,0,0.6)",
            fontFamily: "var(--font-space-mono), ui-monospace, monospace",
          }}
        >
           Full Stack Dev
        </div>
      </div>

      {/* Hardware assembly */}
      <div className="relative -mt-1 flex flex-col items-center">
        {/* Side-release buckle */}
        <div
          className="relative"
          style={{
            width: "78px",
            height: "16px",
            borderRadius: "4px",
            background: "linear-gradient(180deg, #6f6f6f 0%, #3f3f3f 55%, #262626 100%)",
            boxShadow: "0 10px 30px -18px rgba(125,211,252,0.9), inset 0 1px 0 rgba(255,255,255,0.16)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />
          <div className="absolute left-[14%] top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-sm bg-[#151515]" />
          <div className="absolute right-[14%] top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-sm bg-[#151515]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28%] h-[2px] rounded-full bg-gradient-to-r from-[rgba(125,211,252,0.4)] to-[rgba(245,158,11,0.36)]" />
        </div>
        {/* D-ring */}
        <div
          className="relative -mt-0.5"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "linear-gradient(180deg, #9a9a9a 0%, #5f5f5f 38%, #2a2a2a 100%)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.22)",
          }}
        >
          <div className="absolute inset-[4px] rounded-full bg-gradient-to-b from-[#1f1f1f] to-[#101010]" />
          <div className="absolute left-1/2 top-[4px] -translate-x-1/2 w-3 h-[2px] rounded-full bg-[#6a6a6a]" />
        </div>
        {/* Lobster clasp */}
        <div className="relative -mt-0.5 w-5 h-7">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-4 rounded-t-[6px] bg-gradient-to-b from-[#b0b0b0] via-[#5f5f5f] to-[#262626] shadow-[0_0_0_1px_rgba(255,255,255,0.14)]" />
          <div
            className="absolute top-[10px] left-1/2 -translate-x-1/2 rotate-45"
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "5px",
              background: "linear-gradient(135deg, #b0b0b0 0%, #5a5a5a 48%, #242424 100%)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.16)",
            }}
          />
          <div className="absolute top-[16px] left-[9px] w-2 h-2 rounded-full bg-gradient-to-b from-[#c8c8c8] to-[#6a6a6a]" />
        </div>
      </div>

      {/* ID Badge Holder (Premium Modern Redesign) */}
      <div
        className="relative -mt-0.5 group"
        style={{
          width: "400px",
          height: "250px",
          borderRadius: "20px", // Bordes un poco más suaves para dar aspecto de alta gama
          background: "linear-gradient(145deg, rgba(20,22,28,0.85) 0%, rgba(10,12,16,0.95) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8), 0 0 40px -10px rgba(125,211,252,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Efecto de resplandor diagonal (Glare) y destellos */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(125,211,252,0.6)] to-transparent opacity-80" />
        <div className="absolute -left-20 -top-20 w-40 h-40 bg-[rgba(125,211,252,0.15)] blur-[50px] rounded-full pointer-events-none" />

        {/* Contenedor principal con Grid/Flex para mejor distribución */}
        <div className="absolute inset-0 p-6 flex items-center gap-7">
          
          {/* Foto de perfil (Izquierda) - Proporciones ajustadas para 400x250 */}
          <div className="relative w-[140px] h-[190px] rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            {/* Filtro de color sutil sobre la foto para unificar tonos */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(125,211,252,0.2)] via-transparent to-[rgba(245,158,11,0.15)] z-10 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-50" />
            <Image 
              src={src} 
              alt={alt} 
              fill 
              sizes="140px" 
              className="object-cover object-center grayscale-[15%] group-hover:grayscale-0 transition-all duration-500" 
            />
            {/* Detalles técnicos en las esquinas de la foto */}
            <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/50 z-20" />
            <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-white/50 z-20" />
          </div>

          {/* Información (Derecha) */}
          <div className="flex flex-col justify-center h-full w-full relative z-10">
            
            {/* Etiqueta de acceso (Header pequeño) */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[rgba(125,211,252,0.9)] animate-pulse shadow-[0_0_8px_rgba(125,211,252,0.8)]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(125,211,252,0.8)]">
                Access_Level: 01
              </span>
            </div>

            {/* Nombre y Cargo */}
            <h2 className="text-3xl font-bold tracking-wide text-white/95 leading-tight mb-1 font-sans">
              Daniel <br />
              <span className="text-white/60 font-medium">Ramirez</span>
            </h2>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[rgba(245,158,11,0.9)] font-semibold mb-5">
              Full Stack Developer
            </p>

            {/* Línea divisoria */}
            <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent mb-5" />

            {/* Footer de la tarjeta (ID y Código de barras) */}
            <div className="flex justify-between items-end mt-auto">
              <div className="flex flex-col gap-1.5">
                <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-semibold">
                  Portfolio ID
                </span>
                <span className="text-[11px] font-mono tracking-widest text-white/70">
                  DEV-0924-CR
                </span>
              </div>
              
              {/* Simulación de código de barras estilizado */}
              <div className="flex items-center gap-[2px] opacity-40 group-hover:opacity-70 transition-opacity duration-500">
                <div className="w-[2px] h-6 bg-white rounded-full"></div>
                <div className="w-[1px] h-5 bg-white rounded-full"></div>
                <div className="w-[3px] h-6 bg-white rounded-full"></div>
                <div className="w-[1px] h-4 bg-white rounded-full"></div>
                <div className="w-[2px] h-6 bg-white rounded-full"></div>
                <div className="w-[4px] h-5 bg-white rounded-full"></div>
                <div className="w-[1px] h-6 bg-white rounded-full"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LanyardBadge;
