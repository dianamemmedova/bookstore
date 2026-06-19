export default function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          {title}
        </h1>
        <p className="text-gray-400 text-sm">Bu bölmə tezliklə hazır olacaq.</p>
      </div>
    </div>
  )
}