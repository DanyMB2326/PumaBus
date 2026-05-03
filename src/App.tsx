/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map as MapIcon, 
  Bus, 
  Info, 
  Menu, 
  User, 
  Search, 
  ChevronRight, 
  MapPin, 
  Navigation,
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  BadgeInfo,
  Ban,
  VolumeX,
  Footprints,
  Cigarette,
  PawPrint
} from 'lucide-react';
import { TabKind, Route as RouteType } from './types';

// Mock Data
const ROUTES: RouteType[] = [
  { id: '1', name: 'Circuito Exterior', color: 'bg-green-500', waitingTime: '~5 min', status: 'normal', number: 1 },
  { id: '2', name: 'Circuito Escolar', color: 'bg-red-500', waitingTime: '~8 min', status: 'normal', number: 2 },
  { id: '3', name: 'Metro CU - Metrobús CU', color: 'bg-purple-500', status: 'low', number: 3 },
  { id: '4', name: 'Estadio Olímpico', color: 'bg-orange-500', waitingTime: '~2 min', status: 'normal', number: 4 },
  { id: '5', name: 'Ciencias y Humanidades', color: 'bg-cyan-600', waitingTime: '~12 min', status: 'normal', number: 5 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKind>('routes');
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);

  const handleRouteClick = (route: RouteType) => {
    setSelectedRoute(route);
    setActiveTab('map');
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md border-b border-surface-container-highest z-50 flex items-center justify-between px-4">
        {selectedRoute && activeTab === 'map' ? (
          <button 
            onClick={() => {
              setSelectedRoute(null);
              setActiveTab('routes');
            }}
            className="p-2 -ml-2 rounded-full hover:bg-surface-container transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
        ) : (
          <button className="p-2 -ml-2 rounded-full hover:bg-surface-container transition-colors">
            <Menu className="w-6 h-6 text-primary" />
          </button>
        )}
        
        <h1 className="text-xl font-black text-primary tracking-tight">RUTA PUMA</h1>
        
        <button className="p-2 -mr-2 rounded-full hover:bg-surface-container transition-colors bg-surface-container-high">
          <User className="w-5 h-5 text-primary" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-16 pb-20 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'routes' && (
            <motion.div
              key="routes"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-6 max-w-3xl mx-auto space-y-6"
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input 
                  type="text" 
                  placeholder="Buscar ruta, parada o destino..."
                  className="w-full h-12 pl-12 pr-4 bg-surface-container-highest rounded-full border-none focus:ring-2 focus:ring-primary outline-none text-on-surface"
                />
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl font-bold text-on-surface">Rutas Disponibles</h2>
                <p className="text-on-surface-variant mt-1">Selecciona una ruta para ver el mapa en vivo y horarios.</p>
              </div>

              {/* Routes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ROUTES.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => handleRouteClick(route)}
                    className="group bg-surface-container-lowest border-2 border-surface-container-highest rounded-2xl p-4 flex items-center gap-4 hover:bg-surface-container transition-all text-left shadow-sm active:scale-98"
                  >
                    <div className={`w-12 h-12 flex-shrink-0 rounded-full ${route.color} text-white flex items-center justify-center text-xl font-bold shadow-sm`}>
                      {route.number}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{route.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`w-2 h-2 rounded-full ${route.status === 'low' ? 'bg-surface-container-highest' : route.color} ${route.status !== 'low' && 'animate-pulse'}`} />
                        <span className="text-sm text-on-surface-variant font-medium">
                          {route.waitingTime ? `Esperando: ${route.waitingTime}` : 'Baja demanda'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pt-16 pb-20 pointer-events-none"
            >
              {/* Simple Map Background Representation */}
              <div className="absolute inset-0 bg-surface-container-highest opacity-50 z-0">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'radial-gradient(circle, #c3c6d2 1px, transparent 1px)', 
                  backgroundSize: '30px 30px' 
                }} />
                {/* Simulated Route Path */}
                {selectedRoute && (
                  <svg className="absolute inset-0 w-full h-full opacity-60">
                    <path 
                      d="M 100 200 Q 200 150 250 300 T 400 450" 
                      fill="none" 
                      stroke={selectedRoute.color.replace('bg-', '')} 
                      strokeWidth="6" 
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>

              {/* Interaction Overlay */}
              <div className="absolute inset-0 z-10 pointer-events-auto">
                {/* Map Controls */}
                <div className="absolute right-4 bottom-80 space-y-3">
                  <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary border border-surface-container-highest active:scale-95 transition-transform">
                    <Navigation className="w-6 h-6" />
                  </button>
                  <button className="w-12 h-12 bg-secondary-container rounded-2xl shadow-lg flex items-center justify-center text-primary active:scale-95 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </button>
                </div>

                {/* Bottom Sheet - Route Info */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  className="absolute bottom-0 left-0 w-full bg-white rounded-t-[32px] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] border-t border-surface-container-highest px-6 pb-6"
                >
                  <div className="w-10 h-1.5 bg-surface-container-highest rounded-full mx-auto my-4" />
                  
                  {selectedRoute ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl ${selectedRoute.color} flex items-center justify-center text-white text-xl font-bold shadow-sm`}>
                            {selectedRoute.number}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-on-surface">{selectedRoute.name}</h2>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
                              <span className="text-sm text-on-surface-variant font-medium">En ruta</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">3 <span className="text-lg">min</span></div>
                          <div className="text-xs text-on-surface-variant font-medium">Próxima llegada</div>
                        </div>
                      </div>

                      {/* Stops Timeline */}
                      <div className="relative pl-6 space-y-6">
                        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-surface-container-highest" />
                        
                        <div className="relative flex items-center gap-4">
                          <div className="absolute -left-[1.35rem] w-6 h-6 rounded-full bg-white border-4 border-secondary-container flex items-center justify-center z-10" />
                          <div className="flex-1 p-3 bg-primary-container/10 border border-primary/10 rounded-xl">
                            <p className="font-bold text-on-surface">Estadio Olímpico</p>
                            <p className="text-xs text-on-surface-variant mt-0.5">Llegando en</p>
                          </div>
                          <div className="bg-secondary-container px-2 py-1 rounded-md text-xs font-bold text-on-secondary-container">14:05</div>
                        </div>

                        <div className="relative flex items-center gap-4">
                          <div className="absolute -left-[1.35rem] w-6 h-6 rounded-full bg-white border-4 border-surface-container-highest z-10" />
                          <div className="flex-1 pl-4">
                            <p className="font-medium text-on-surface-variant">Rectoría</p>
                          </div>
                          <div className="text-sm text-on-surface-variant">14:12</div>
                        </div>

                        <div className="relative flex items-center gap-4">
                          <div className="absolute -left-[1.35rem] w-6 h-6 rounded-full bg-white border-4 border-surface-container-highest z-10" />
                          <div className="flex-1 pl-4">
                            <p className="font-medium text-on-surface-variant">Facultad de Arquitectura</p>
                          </div>
                          <div className="text-sm text-on-surface-variant">14:18</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Bus className="w-12 h-12 text-surface-container-highest mx-auto mb-3" />
                      <p className="text-on-surface-variant">Selecciona una ruta para ver detalles</p>
                      <button 
                        onClick={() => setActiveTab('routes')}
                        className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-bold shadow-md"
                      >
                        Ver Rutas
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'info' && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="px-4 py-6 max-w-3xl mx-auto space-y-6"
            >
              <div>
                <h2 className="text-3xl font-black text-primary tracking-tight">Información de Servicio</h2>
                <p className="text-on-surface-variant mt-1">Todo lo que necesitas saber para moverte por el campus.</p>
              </div>

              {/* Free Service Banner */}
              <div className="bg-secondary-container rounded-2xl p-6 relative overflow-hidden shadow-md">
                <div className="relative z-10 flex gap-4">
                  <div className="p-3 bg-on-secondary-container/10 rounded-full h-fit">
                    <CheckCircle2 className="w-8 h-8 text-on-secondary-container" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-secondary-container">Servicio Gratuito</h3>
                    <p className="text-on-secondary-container opacity-80 mt-1">
                      El sistema de transporte RUTA PUMA es de uso libre y exclusivo para la comunidad universitaria de la UNAM.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Hours */}
                <section className="bg-surface-container rounded-2xl p-6 border-2 border-surface-container-highest shadow-sm">
                  <div className="flex items-center gap-3 text-primary mb-4">
                    <Clock className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Horarios</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                      <span className="font-medium">Lunes a Viernes</span>
                      <span className="bg-white px-2 py-1 rounded-lg text-sm font-bold">6:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                      <span className="font-medium">Sábados</span>
                      <span className="bg-white px-2 py-1 rounded-lg text-sm font-bold">6:00 - 15:00</span>
                    </div>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-4 flex items-center gap-1.5 font-medium">
                    <AlertCircle className="w-4 h-4" /> Domingos y días festivos sin servicio.
                  </p>
                </section>

                {/* Contact */}
                <section className="bg-primary text-white rounded-2xl p-6 shadow-lg overflow-hidden relative">
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-6 h-6 text-on-primary-container" />
                      <h3 className="text-xl font-bold">Contacto</h3>
                    </div>
                    <p className="text-on-primary-container font-medium">Tu opinión nos ayuda a mejorar el servicio.</p>
                    <div className="space-y-2">
                      <a href="mailto:rutapuma@unam.mx" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors">
                        <Mail className="w-5 h-5" />
                        <span className="font-bold">rutapuma@unam.mx</span>
                      </a>
                      <a href="tel:5556221234" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors">
                        <Phone className="w-5 h-5" />
                        <span className="font-bold">55 5622 1234</span>
                      </a>
                    </div>
                  </div>
                </section>
              </div>

              {/* Rules */}
              <section className="bg-surface-container rounded-2xl p-6 border-2 border-surface-container-highest shadow-sm">
                <div className="flex items-center gap-3 text-primary mb-6">
                  <BadgeInfo className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Reglamento</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: <User className="w-5 h-5" />, text: "Mantén tu credencial UNAM a la mano." },
                    { icon: <Ban className="w-5 h-5" />, text: "Prohibido consumir alimentos o bebidas." },
                    { icon: <VolumeX className="w-5 h-5" />, text: "Usa audífonos para música o videos." },
                    { icon: <Footprints className="w-5 h-5" />, text: "Permite el descenso antes de abordar." },
                    { icon: <Cigarette className="w-5 h-5" />, text: "Prohibido fumar y vapear." },
                    { icon: <PawPrint className="w-5 h-5" />, text: "Solo animales de servicio identificados." }
                  ].map((rule, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="text-on-surface-variant p-1">{rule.icon}</div>
                      <p className="text-on-surface-variant font-medium leading-tight">{rule.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 w-full h-20 bg-white border-t border-surface-container-highest z-50 flex justify-around items-center px-6 pb-2">
        <TabButton 
          active={activeTab === 'map'} 
          onClick={() => setActiveTab('map')} 
          icon={<MapIcon className="w-6 h-6" />}
          label="Mapa" 
        />
        <TabButton 
          active={activeTab === 'routes'} 
          onClick={() => setActiveTab('routes')} 
          icon={<Bus className="w-6 h-6" />}
          label="Rutas" 
        />
        <TabButton 
          active={activeTab === 'info'} 
          onClick={() => setActiveTab('info')} 
          icon={<Info className="w-6 h-6" />}
          label="Info" 
        />
      </nav>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'scale-110' : 'scale-100 opacity-60'}`}
    >
      <div className={`p-2 rounded-2xl transition-colors ${active ? 'bg-primary-container/10 text-primary' : 'text-on-surface-variant'}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold tracking-wide uppercase transition-colors ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
        {label}
      </span>
    </button>
  );
}

