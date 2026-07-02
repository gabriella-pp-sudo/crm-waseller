interface Stats {
  total: number
  active: number
  pending: number
  converted: number
}

const statCards = [
  { key: 'total', label: 'Total de Contatos', color: 'bg-blue-50 text-blue-700 border-blue-100', icon: '👥' },
  { key: 'active', label: 'Ativos', color: 'bg-green-50 text-green-700 border-green-100', icon: '✅' },
  { key: 'pending', label: 'Pendentes', color: 'bg-yellow-50 text-yellow-700 border-yellow-100', icon: '⏳' },
  { key: 'converted', label: 'Convertidos', color: 'bg-purple-50 text-purple-700 border-purple-100', icon: '🎯' },
]

export default function StatsBar({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card) => (
        <div
          key={card.key}
          className={`rounded-xl border p-4 ${card.color}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium opacity-80">{card.label}</span>
            <span className="text-lg">{card.icon}</span>
          </div>
          <p className="text-2xl font-bold">
            {stats[card.key as keyof Stats]}
          </p>
        </div>
      ))}
    </div>
  )
}
