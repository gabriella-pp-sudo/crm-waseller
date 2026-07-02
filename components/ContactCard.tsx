'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Phone, MessageSquare, Clock, Tag } from 'lucide-react'

interface Contact {
  id: string
  name: string
  phone: string
  status: 'active' | 'pending' | 'converted' | 'inactive'
  last_message?: string
  last_contact?: string
  tags?: string[]
  avatar_url?: string
}

const statusConfig = {
  active: { label: 'Ativo', color: 'bg-green-100 text-green-700' },
  pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700' },
  converted: { label: 'Convertido', color: 'bg-blue-100 text-blue-700' },
  inactive: { label: 'Inativo', color: 'bg-gray-100 text-gray-600' },
}

export default function ContactCard({ contact }: { contact: Contact }) {
  const status = statusConfig[contact.status] || statusConfig.inactive
  const initials = contact.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
      <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold text-sm flex-shrink-0">
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Phone size={12} />
            {contact.phone}
          </span>
          {contact.last_contact && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {format(new Date(contact.last_contact), "d 'de' MMM", { locale: ptBR })}
            </span>
          )}
        </div>

        {contact.last_message && (
          <p className="text-xs text-gray-400 mt-1 truncate flex items-center gap-1">
            <MessageSquare size={11} />
            {contact.last_message}
          </p>
        )}
      </div>

      {contact.tags && contact.tags.length > 0 && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <Tag size={12} className="text-gray-400" />
          <div className="flex gap-1">
            {contact.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
