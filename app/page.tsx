'use client'

import { useState } from 'react'
import { useTrackingSearch } from '@/hooks/use-tracking'
import { Search, Package, Truck, Clock, ArrowRight } from 'lucide-react'
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
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-[#FFA000]/20 rounded-lg blur-sm"></div>
                <Truck className="relative w-8 h-8 text-[#FFA000]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-[#ea1d2c] dark:from-gray-100 dark:to-[#FFA000] bg-clip-text text-transparent">
                  Rastreio Videosoft
                </h1>
                {/* REMOVIDO: <p> vazio */}
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* CORRIGIDO: Separado h2 e p */}
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Rastreador de Entregas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Digite o número do pedido ou nota fiscal
            </p>
          </motion.div>
        </div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl mb-8"
        >
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Número do Pedido ou Nota Fiscal
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex: 12345 ou 67890..."
                  className="input-field pl-12 pr-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-600 focus:border-[#FFA000] transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={query.trim().length < 1}
                className="btn-primary bg-gradient-to-r from-[#FFA000] to-[#FDB913] hover:from-[#FDB913] hover:to-[#FFA000] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 py-3 text-lg font-semibold transition-all hover:scale-105 flex-1"
              >
                <Search className="w-5 h-5" />
                Consultar Entrega
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Botão iFood - Integrado no card */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center gap-4">
              {/* REMOVIDO: <span> vazio */}
              <a 
                href="/rastreio-ifood"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ea1d2c] to-[#FFA000] hover:from-[#d01827] hover:to-[#b81522] text-white rounded-lg font-medium transition-all hover:scale-105 shadow-lg"
              >
                <Truck className="w-4 h-4" />
                Rastreio iFood
              </a>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card text-center py-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="animate-spin w-12 h-12 border-4 border-[#FFA000]/20 border-t-[#FFA000] rounded-full"></div>
                  <Clock className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[#FFA000]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Consultando...
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Buscando informações da sua entrega
                </p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 backdrop-blur-sm shadow-lg"
            >
              <div className="flex items-center gap-4 p-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-300">
                    Erro na consulta
                  </h4>
                  <p className="text-red-700 dark:text-red-400 text-sm">
                    Não foi possível buscar as informações. Tente novamente.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {searchTerm && !isLoading && !error && !tracking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20 backdrop-blur-sm shadow-lg"
            >
              <div className="flex items-center gap-4 p-4">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center">
                  <Search className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300">
                    Pedido não encontrado
                  </h4>
                  <p className="text-orange-700 dark:text-orange-400 text-sm">
                    Verifique o número digitado e tente novamente.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {tracking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Resultado da Consulta
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Informações atualizadas da sua entrega
                </p>
              </div>
              <TrackingResult data={tracking} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-[#FFA000]" />
              <span className="font-semibold text-gray-900 dark:text-white">
                Rastreio Videosoft
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 · {' '}
              <a 
                href="https://linkedin.com/in/itsromulogarcia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#FFA000] hover:text-[#FDB913] transition-colors font-medium"
              >
                LinkedIn
              </a>
              {' '}·{' '}
              <a 
                href="https://github.com/itsromulogarcia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#FFA000] hover:text-[#FDB913] transition-colors font-medium"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
