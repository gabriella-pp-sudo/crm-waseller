'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, MessageSquare, Settings, TrendingUp } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/contacts', label: 'Contatos', icon: Users },
  { href: '/conversations', label: 'Conversas', icon: MessageSquare },
  { href: '/reports', label: 'Relatórios', icon: TrendingUp },
  { href: '/settings', label: 'Configurações', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <MessageSquare size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm">CRM Waseller</h1>
            <p className="text-xs text-gray-500">WhatsApp CRM</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <Users size={14} className="text-gray-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900">Vendedor</p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
          <span className="ml-auto w-2 h-2 bg-green-500 rounded-full"></span>
        </div>
      </div>
    </aside>
  )
}
