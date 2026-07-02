'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/Sidebar'
import ContactCard from '@/components/ContactCard'
import { Users, Search, Plus, Filter } from 'lucide-react'

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchContacts()
  }, [])

  useEffect(() => {
    let result = contacts
    if (search) {
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(search.toLowerCase()) ||
          c.phone?.includes(search)
      )
    }
    if (statusFilter !== 'all') {
      result = result.filter((c) => c.status === statusFilter)
    }
    setFiltered(result)
  }, [search, statusFilter, contacts])

  async function fetchContacts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setContacts(data)
      setFiltered(data)
    }
    setLoading(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Contatos</h1>
              <p className="text-sm text-gray-500 mt-1">
                {filtered.length} contatos encontrados
              </p>
            </div>
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              <Plus size={18} />
              Novo Contato
            </button>
          </div>

          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Pesquisar por nome ou telefone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Todos</option>
              <option value="active">Ativos</option>
              <option value="pending">Pendentes</option>
              <option value="converted">Convertidos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Users size={48} className="mx-auto mb-3 opacity-50" />
              <p>Nenhum contato encontrado</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {filtered.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
