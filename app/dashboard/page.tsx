'use client'

  import { useEffect, useState } from 'react'
  import { supabase } from '@/lib/supabase'
  import Sidebar from '@/components/Sidebar'
  import ContactCard from '@/components/ContactCard'
  import StatsBar from '@/components/StatsBar'
  import { Users, MessageSquare, TrendingUp, Bell } from 'lucide-react'

  export default function Dashboard() {
    const [contacts, setContacts] = useState<any[]>([])
        const [loading, setLoading] = useState(true)
        const [stats, setStats] = useState({ total: 0, active: 0, pending: 0, converted: 0 })

        useEffect(() => {
              fetchContacts()
        }, [])

        async function fetchContacts() {
          setLoading(true)
                const { data, error } = await supabase
                  .from('contacts')
                  .select('*')
                  .order('created_at', { ascending: false })
                  .limit(20)

                if (!error && data) {
                  setContacts(data)
                          setStats({
                                    total: data.length,
                                    active: data.filter((c: any) => c.status === 'active').length,
                                    pending: data.filter((c: any) => c.status === 'pending').length,
                                    converted: data.filter((c: any) => c.status === 'converted').length,
                          })
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
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard CRM</h1>
                    <p className="text-sm text-gray-500 mt-1">Gerencie seus contatos e leads do WhatsApp</p>
                  </div>
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    <MessageSquare size={18} />
                    Novo Contato
                  </button>
                </div>

                <StatsBar stats={stats} />

                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Contatos Recentes</h2>
      {loading ? (
                      <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      </div>
                    ) : contacts.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <Users size={48} className="mx-auto mb-3 opacity-50" />
                        <p>Nenhum contato encontrado</p>
                        <p className="text-sm mt-1">Os contatos do Waseller aparecerão aqui</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
        {contacts.map((contact) => (
                            <ContactCard key={contact.id} contact={contact} />
                          ))}
                      </div>
                    )}
                </div>
              </div>
            </main>
          </div>
        )
}
