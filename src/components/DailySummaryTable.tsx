
import React, { useState } from 'react';
import { HealthEntry, BzUnit, Language } from '../types';
import { uiTranslations } from '../translations';
import { mgToMmol } from '../utils/healthUtils';
import { Trash2, CheckSquare, Square } from 'lucide-react';

interface DailySummaryTableProps {
  entries: HealthEntry[];
  bzUnit: BzUnit;
  language: Language;
  onDeleteDay: (date: string) => void;
  onDeleteMultipleDays: (dates: string[]) => void;
}

const DailySummaryTable: React.FC<DailySummaryTableProps> = ({
  entries,
  bzUnit,
  language,
  onDeleteDay,
  onDeleteMultipleDays
}) => {
  const t = uiTranslations[language] || uiTranslations.de;
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleSelectDay = (date: string) => {
    setSelectedDays(prev => prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]);
  };

  const grouped = entries.reduce((acc, entry) => {
    if (!acc[entry.datum]) acc[entry.datum] = {};
    acc[entry.datum][entry.zeitpunkt] = entry;
    return acc;
  }, {} as Record<string, Record<string, HealthEntry>>);

  const sortedDates = Object.keys(grouped).sort((a, b) => {
    const [da, ma, ya] = a.split('.').map(Number);
    const [db, mb, yb] = b.split('.').map(Number);
    return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
  });

  if (entries.length === 0) {
    return (
      <div className="border-4 border-dashed border-gray-200 rounded-2xl p-3 flex flex-col items-center justify-center text-gray-300">
        <div className="w-12 h-12 flex items-center justify-center mb-1">
          <i className="fa-solid fa-folder-open text-4xl opacity-20"></i>
        </div>
        <p className="font-black text-[10px] uppercase tracking-widest opacity-60">{t.notifications.errorEmpty || 'KEINE WERTE'}</p>
      </div>
    );
  }

  const getDayName = (dateStr: string) => {
    const [d, m, y] = dateStr.split('.').map(Number);
    const date = new Date(y, m - 1, d);
    const days = ['SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA'];
    return days[date.getDay()];
  };

  const ValueCell = ({ entry }: { entry?: HealthEntry }) => {
    if (!entry) return <div className="text-gray-200 font-black">-</div>;
    
    const bzVal = bzUnit === 'mmol/l' ? mgToMmol(entry.bz) : entry.bz;
    const isHighBz = parseFloat(entry.bz) > 140;
    const isHighSys = parseInt(entry.rrSys) > 140;

    return (
      <div className="flex flex-col items-center justify-center py-1">
        <div className={`text-[12px] font-black leading-none ${isHighBz ? 'text-red-600' : 'text-blue-700'}`}>
          {bzVal}
        </div>
        <div className={`text-[9px] font-bold leading-tight mt-0.5 ${isHighSys ? 'text-red-600' : 'text-gray-600'}`}>
          {entry.rrSys}/{entry.rrDia}
        </div>
        <div className="text-[8px] font-bold text-gray-400 leading-none">
          P:{entry.puls}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {selectedDays.length > 0 && (
        <div className="flex justify-between items-center bg-red-50 p-2 border-2 border-red-200 rounded-lg">
          <span className="text-[10px] font-black text-red-700 uppercase">{selectedDays.length} {t.confirm.deleteMultiTitle}</span>
          <button 
            onClick={() => {
              onDeleteMultipleDays(selectedDays);
              setSelectedDays([]);
            }}
            className="bg-red-600 text-white px-3 py-1 rounded font-black text-[9px] uppercase active:translate-y-0.5"
          >
            {t.actions.deleteAll}
          </button>
        </div>
      )}

      <div className="border-4 border-black rounded-xl overflow-hidden bg-white">
        <div className="bg-[#2563eb] text-white py-1.5 text-center font-black text-[10px] uppercase tracking-widest border-b-4 border-black">
          VERLAUF
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#1e3a8a] text-white">
              <tr className="border-b-4 border-black">
                <th className="p-2 border-r-2 border-black/20">
                  <Square size={16} className="mx-auto opacity-50" />
                </th>
                <th className="p-2 text-[9px] font-black uppercase tracking-tighter border-r-2 border-black/20">DATUM</th>
                <th className="p-2 text-[9px] font-black uppercase tracking-tighter border-r-2 border-black/20">FRÜH</th>
                <th className="p-2 text-[9px] font-black uppercase tracking-tighter border-r-2 border-black/20">MITTAG</th>
                <th className="p-2 text-[9px] font-black uppercase tracking-tighter border-r-2 border-black/20">ABEND</th>
                <th className="p-2 text-[9px] font-black uppercase tracking-tighter border-r-2 border-black/20">NACHT</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {sortedDates.map(date => {
                const daySlots = grouped[date];
                const isSelected = selectedDays.includes(date);
                const [d, m] = date.split('.');

                return (
                  <tr key={date} className={`border-b-2 border-black/10 hover:bg-blue-50 transition-colors ${isSelected ? 'bg-red-50' : ''}`}>
                    <td className="p-2 text-center border-r-2 border-black/10">
                      <button onClick={() => toggleSelectDay(date)} className="text-gray-400 hover:text-black">
                        {isSelected ? <CheckSquare size={18} className="text-red-600" /> : <Square size={18} />}
                      </button>
                    </td>
                    <td className="p-2 border-r-2 border-black/10">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black leading-none">{getDayName(date)}</span>
                        <span className="text-[8px] font-bold text-gray-400 mt-1">{d}.{m}</span>
                      </div>
                    </td>
                    <td className="p-1 text-center border-r-2 border-black/10">
                      <ValueCell entry={daySlots['Morgens']} />
                    </td>
                    <td className="p-1 text-center border-r-2 border-black/10">
                      <ValueCell entry={daySlots['Mittags']} />
                    </td>
                    <td className="p-1 text-center border-r-2 border-black/10">
                      <ValueCell entry={daySlots['Abends']} />
                    </td>
                    <td className="p-1 text-center border-r-2 border-black/10">
                      <ValueCell entry={daySlots['Nacht']} />
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={() => onDeleteDay(date)} className="text-gray-300 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailySummaryTable;
