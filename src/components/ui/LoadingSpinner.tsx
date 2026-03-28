export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-bg flex items-center justify-center z-[9999]">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-[#b7e0c6] to-[#5d8c70] animate-spin-gradient" />
        <div className="absolute inset-[5px] rounded-full bg-bg" />
      </div>
    </div>
  )
}
