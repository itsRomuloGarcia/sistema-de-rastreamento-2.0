'use client'

import { useState } from 'react'
import { useTrackingSearch } from '@/hooks/use-tracking'
import { Search, Truck, Clock, ArrowRight } from 'lucide-react'
import { TrackingResult } from '@/components/tracking-result'
import { ThemeToggle } from '@/components/theme-toggle'
import { motion, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const { data: tracking, isLoading, error } = useTrackingSearch(searchTerm)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim().length >= 1) {
      setSearchTerm(query.trim())
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-[#FFA000]/20 rounded-lg blur-sm" />
              <Truck className="relative w-8 h-8 text-[#FFA000]" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-[#ea1d2c] dark:from-gray-100 dark:to-[#FFA000] bg-clip-text text-transparent">
              Rastreamento Videosoft
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Hero */}
        <section className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Rastreador de Entregas
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Acompanhe seus pedidos de forma rápida e simples.  
              Insira abaixo o número do pedido ou da nota fiscal.
            </p>
          </motion.div>
        </section>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg p-6 mb-10"
        >
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Número do Pedido ou Nota Fiscal
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Exemplo: 12345 ou NF89012"
                  className="pl-12 pr-4 py-3 w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-[#FFA000] bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg outline-none transition-colors"
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={query.trim().length < 1}
              className="w-full bg-gradient-to-r from-[#FFA000] to-[#FDB913] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-3 text-lg hover:scale-105 disabled:opacity-50 transition-transform"
            >
              <Search className="w-5 h-5" />
              Consultar Entrega
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <a
              href="/rastreio-ifood"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ea1d2c] to-[#FFA000] hover:from-[#d01827] hover:to-[#b81522] text-white rounded-lg font-medium hover:scale-105 transition-all shadow-md"
            >
              <Truck className="w-4 h-4" />
              Rastrear via iFood
            </a>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="relative mb-4">
                  <div className="animate-spin w-12 h-12 border-4 border-[#FFA000]/20 border-t-[#FFA000] rounded-full" />
                  <Clock className="w-6 h-6 text-[#FFA000] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Consultando pedido...
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Buscando informações atualizadas.
                </p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center shadow-md"
            >
              <p className="text-red-700 dark:text-red-400 font-semibold">
                Erro ao consultar o pedido.
              </p>
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                Verifique sua conexão e tente novamente.
              </p>
            </motion.div>
          )}

          {searchTerm && !isLoading && !error && !tracking && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center shadow-md"
            >
              <p className="text-orange-700 dark:text-orange-400 font-semibold">
                Pedido não encontrado.
              </p>
              <p className="text-orange-600 dark:text-orange-400 text-sm mt-1">
                Confira o número informado e tente novamente.
              </p>
            </motion.div>
          )}

          {tracking && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Resultado da Consulta
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Informações detalhadas sobre seu pedido.
                </p>
              </div>
              <TrackingResult data={tracking} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Truck className="w-5 h-5 text-[#FFA000]" />
            <span className="font-semibold text-gray-900 dark:text-white">
              Rastreio Videosoft
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 ·{' '}
            <a
              href="https://linkedin.com/in/itsromulogarcia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFA000] hover:text-[#FDB913] font-medium"
            >
              LinkedIn
            </a>{' '}·{' '}
            <a
              href="https://github.com/itsromulogarcia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFA000] hover:text-[#FDB913] font-medium"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
