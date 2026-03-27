'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { 
  AlertTriangle, 
  Activity, 
  Shield, 
  MapPin, 
  PhoneCall, 
  Users,
  Radio,
  ArrowRightCircle,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const piqueteStats = [
  {
    title: 'Ocorrências Hoje',
    value: '08',
    description: 'Novas comunicações',
    icon: AlertTriangle,
    color: 'bg-rose-50/50 text-rose-500 border-rose-100 dark:bg-rose-900/20 dark:border-rose-900/30',
  },
  {
    title: 'Equipas no Terreno',
    value: '03',
    description: 'Viaturas ativas',
    icon: Shield,
    color: 'bg-blue-50/50 text-blue-500 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/30',
  },
  {
    title: 'Resposta Média',
    value: '12m',
    description: 'Tempo de chegada',
    icon: Activity,
    color: 'bg-emerald-50/50 text-emerald-500 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30',
  },
  {
    title: 'Intervenções',
    value: '05',
    description: 'Em curso agora',
    icon: Radio,
    color: 'bg-amber-50/50 text-amber-500 border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30',
  },
]

const recentIncidents = [
  { id: 1, loc: 'Bairro Palanca', type: 'Assalto à Mão Armada', level: 'SOS', time: '10:45' },
  { id: 2, loc: 'Viana - Estrada Zango', type: 'Acidente de Viação', level: 'Alta', time: '12:20' },
  { id: 3, loc: 'Ilha de Luanda', type: 'Perturbação da Ordem', level: 'Normal', time: '13:55' },
]

export function PiqueteDashboard() {
  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {piqueteStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="shadow-sm border-muted/60 transition-transform hover:scale-[1.02] duration-200">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.title}</span>
                    <h3 className="text-3xl font-black mt-1 tracking-tighter">{stat.value}</h3>
                    <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{stat.description}</p>
                  </div>
                  <div className={`p-4 rounded-2xl border ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Incidents */}
        <Card className="lg:col-span-2 border-muted/60 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <Radio className="h-32 w-32 rotate-12" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="text-xl font-bold">Ocorrências Ativas</CardTitle>
                <CardDescription>Monitoramento em tempo real do piquete</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
                <span className="text-[10px] font-bold text-rose-500 uppercase">Live Feed</span>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-muted/50">
                  <TableHead className="font-bold uppercase text-[10px]">Localização</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Tipo de Incidente</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Prioridade</TableHead>
                  <TableHead className="font-bold uppercase text-[10px]">Hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentIncidents.map((inc) => (
                  <TableRow key={inc.id} className="border-muted/50 group cursor-pointer hover:bg-muted/30 transition-colors">
                    <TableCell className="font-bold text-sm">
                        <div className="flex items-center gap-2">
                           <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                           {inc.loc}
                        </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{inc.type}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={inc.level === 'SOS' ? 'destructive' : inc.level === 'Alta' ? 'default' : 'secondary'}
                        className="font-bold text-[10px] px-2"
                      >
                        {inc.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-bold text-muted-foreground">
                        <div className="flex items-center gap-1">
                           <Clock className="h-3 w-3" />
                           {inc.time}
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Operations */}
        <div className="space-y-4">
            <Card className="border-muted/60 shadow-sm bg-primary/5 dark:bg-primary/10">
                <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                        <ArrowRightCircle className="h-4 w-4" />
                        Operações Rápidas
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button className="w-full justify-between font-bold h-12" variant="default">
                        Comunicar Ocorrência
                        <PhoneCall className="h-4 w-4" />
                    </Button>
                    <Button className="w-full justify-between font-bold h-12 border-muted-foreground/20" variant="outline">
                        Solicitar Apoio
                        <Shield className="h-4 w-4" />
                    </Button>
                    <Button className="w-full justify-between font-bold h-12 border-muted-foreground/20" variant="outline">
                        Mapa de Viaturas
                        <MapPin className="h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>

            <Card className="border-muted/60 shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Equipa de Turno
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs">AS</div>
                            <span className="text-xs font-bold uppercase">Abel Suca</span>
                        </div>
                        <Badge variant="outline" className="text-[8px] uppercase">Chefe</Badge>
                    </div>
                     <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs text-muted-foreground">JD</div>
                            <span className="text-xs font-bold uppercase">Junior Dos Santos</span>
                        </div>
                        <Badge variant="outline" className="text-[8px] uppercase">Operador</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
