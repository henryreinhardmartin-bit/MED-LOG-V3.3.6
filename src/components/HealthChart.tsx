
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  AreaChart,
  Area
} from 'recharts';
import { HealthEntry, UserProfile, BzUnit, Language } from '../types';
import { uiTranslations } from '../translations';
import { mgToMmol } from '../utils/healthUtils';

interface HealthChartProps {
  entries: HealthEntry[];
  userProfile: UserProfile;
  bzUnit: BzUnit;
  language: Language;
  isExporting?: boolean;
}

const HealthChart: React.FC<HealthChartProps> = ({ entries, userProfile, bzUnit, language, isExporting }) => {
  const t = uiTranslations[language] || uiTranslations.de;

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-gray-400">
        <i className="fa-solid fa-chart-line text-4xl mb-2 opacity-20"></i>
        <p className="font-black uppercase italic tracking-widest text-[10px] opacity-60">{t.notifications.errorEmpty}</p>
      </div>
    );
  }

  // Daten für Chart aufbereiten
  const chartData = entries.map(e => ({
    ...e,
    displayBz: bzUnit === 'mmol/l' ? parseFloat(mgToMmol(e.bz).replace(',', '.')) : parseFloat(e.bz),
    sys: parseInt(e.rrSys),
    dia: parseInt(e.rrDia),
    puls: parseInt(e.puls),
    label: `${e.datum} (${t.times[e.zeitpunkt]?.charAt(0) || e.zeitpunkt.charAt(0)})`
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[10px] font-bold">
          <p className="border-b border-black/10 mb-1 pb-0.5">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} {entry.unit}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Berechnungen für Zusammenfassung
  const bzEntries = entries.filter(e => !e.bzAuto);
  const rrEntries = entries.filter(e => !e.rrAuto);

  const avgBzMg = bzEntries.length > 0 
    ? bzEntries.reduce((acc, e) => acc + parseFloat(e.bz), 0) / bzEntries.length 
    : 0;
  
  const avgSys = rrEntries.length > 0
    ? rrEntries.reduce((acc, e) => acc + parseInt(e.rrSys), 0) / rrEntries.length
    : 0;

  const avgDia = rrEntries.length > 0
    ? rrEntries.reduce((acc, e) => acc + parseInt(e.rrDia), 0) / rrEntries.length
    : 0;

  const eHbA1c = avgBzMg > 0 ? (avgBzMg + 46.7) / 28.7 : 0;
  const displayAvgBz = bzUnit === 'mmol/l' ? (avgBzMg / 18.0182).toFixed(1) : avgBzMg.toFixed(0);

  return (
    <div id="health-charts-container" className={`space-y-8 ${isExporting ? 'p-10 bg-white' : ''}`}>
      {isExporting && (
        <div className="border-b-4 border-black pb-4 mb-8">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">MED-LOG Vital-Report</h1>
          <div className="grid grid-cols-2 mt-4 text-sm font-bold">
            <div>Patient: <span className="font-black underline">{userProfile.name || '---'}</span></div>
            <div>Geburtsdatum: <span className="font-black underline">{userProfile.birthday || '---'}</span></div>
          </div>
        </div>
      )}

      {/* Zusammenfassung & Analyse */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border-2 border-black rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.stats.avgRR}</span>
          <div className="text-2xl font-black flex items-baseline gap-1">
            {avgSys > 0 ? Math.round(avgSys) : '--'}<span className="text-xs text-slate-400">/</span>{avgDia > 0 ? Math.round(avgDia) : '--'}
            <span className="text-[10px] text-slate-400 ml-1">mmHg</span>
          </div>
          <span className="text-[8px] font-bold text-slate-400 mt-1 italic">{t.stats.period}</span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.stats.avgBZ}</span>
          <div className="text-2xl font-black">
            {avgBzMg > 0 ? displayAvgBz : '--'}
            <span className="text-[10px] text-slate-400 ml-1 uppercase">{bzUnit}</span>
          </div>
          <span className="text-[8px] font-bold text-slate-400 mt-1 italic">{t.stats.period}</span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.stats.hba1c}</span>
          <div className="text-2xl font-black text-purple-600">
            {eHbA1c > 0 ? eHbA1c.toFixed(1) : '--'}
            <span className="text-[10px] text-slate-400 ml-1">%</span>
          </div>
          <span className="text-[8px] font-bold text-slate-400 mt-1 italic">ADAG-Formel</span>
        </div>
      </div>

      {/* Blutdruck & Puls Chart */}
      <div className="bg-white border-2 border-black rounded-xl p-4">
        <h3 className="font-black uppercase italic text-xs mb-4 flex items-center gap-2">
          <i className="fa-solid fa-heart-pulse text-red-600"></i> Blutdruck & Puls Verlauf
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="label" fontSize={8} fontStyle="italic" fontWeight="bold" />
              <YAxis fontSize={10} fontWeight="bold" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
              <ReferenceArea y1={60} y2={140} fill="#f0fdf4" fillOpacity={0.5} label={{ value: 'Normalbereich', position: 'insideLeft', fontSize: 8, fill: '#166534', fontWeight: 'bold' }} />
              <ReferenceLine y={140} label={{ value: 'Hypertonie', position: 'right', fontSize: 8, fill: 'red' }} stroke="red" strokeDasharray="3 3" />
              <Line name="Systolisch" type="monotone" dataKey="sys" stroke="#1d4ed8" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'white' }} unit=" mmHg" isAnimationActive={!isExporting} />
              <Line name="Diastolisch" type="monotone" dataKey="dia" stroke="#059669" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'white' }} unit=" mmHg" isAnimationActive={!isExporting} />
              <Line name="Puls" type="monotone" dataKey="puls" stroke="#dc2626" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} unit=" bpm" isAnimationActive={!isExporting} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Blutzucker Chart */}
      <div className="bg-white border-2 border-black rounded-xl p-4">
        <h3 className="font-black uppercase italic text-xs mb-4 flex items-center gap-2">
          <i className="fa-solid fa-droplet text-blue-600"></i> Blutzucker Verlauf ({bzUnit})
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorBz" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="label" fontSize={8} fontStyle="italic" fontWeight="bold" />
              <YAxis fontSize={10} fontWeight="bold" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }} />
              <ReferenceArea 
                y1={bzUnit === 'mg/dl' ? 70 : 3.9} 
                y2={bzUnit === 'mg/dl' ? 140 : 7.8} 
                fill="#f0fdf4" 
                fillOpacity={0.6} 
                label={{ value: 'Zielbereich', position: 'insideLeft', fontSize: 8, fill: '#166534', fontWeight: 'bold' }} 
              />
              <Area name="Blutzucker" type="monotone" dataKey="displayBz" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorBz)" unit={` ${bzUnit}`} isAnimationActive={!isExporting} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {isExporting && (
        <div className="mt-12 pt-4 border-t-2 border-black text-[10px] font-bold text-gray-400 italic flex justify-between">
          <span>Generiert mit MED-LOG Digital Health Tracker</span>
          <span>Datum: {new Date().toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
};

export default HealthChart;
