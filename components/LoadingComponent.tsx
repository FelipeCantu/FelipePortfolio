'use client'

interface Props {
  loadingText?: string
  statusText?: string
}

export default function LoadingComponent({
  loadingText = 'Loading Application',
  statusText = 'Initializing components...',
}: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(20,20,30,0.75),rgba(20,20,30,0.75)),url(/images/mainbg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Glass card */}
      <div className="relative z-10 bg-white/[0.03] backdrop-blur-[20px] border border-white/[0.08] rounded-[40px] p-16 flex flex-col items-center gap-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)]">

        {/* Spinner + logo */}
        <div className="relative w-[140px] h-[140px] flex items-center justify-center">
          <div className="absolute inset-0 border-[3px] border-white/[0.05] border-t-[#00bfff] rounded-full animate-ring-rotate" />
          <div className="w-[70px] h-[70px] flex items-center justify-center animate-logo-breathe">
            <img
              src="/images/mainwlogo.png"
              alt="Logo"
              className="w-full h-full object-contain"
              style={{ filter: 'drop-shadow(0 0 15px rgba(0,191,255,0.3))' }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="text-center flex flex-col gap-6">
          <h1
            className="text-[1.75rem] font-semibold tracking-[-0.02em] m-0"
            style={{
              background: 'linear-gradient(to bottom,#fff,rgba(255,255,255,0.7))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {loadingText}
          </h1>
          <div className="flex flex-col items-center gap-3">
            <div className="w-[200px] h-[3px] bg-white/[0.05] rounded-[10px] overflow-hidden relative">
              <div
                className="absolute h-full w-[40%] animate-progress-flow"
                style={{ background: 'linear-gradient(90deg,transparent,#00bfff,transparent)' }}
              />
            </div>
            <p className="text-white/40 text-[0.9rem] font-normal m-0 tracking-[0.02em] uppercase">
              {statusText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
