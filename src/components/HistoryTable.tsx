
import React, { useState } from 'react';
import { HealthEntry, BzUnit, Language } from '../types';
import { uiTranslations } from '../translations';
import { mgToMmol } from '../utils/healthUtils';
import { Trash2, CheckSquare, Square } from 'lucide-react';

interface HistoryTableProps {
  entries: HealthEntry[];
  bzUnit: BzUnit;
  language: Language;
  onDelete: (id: string) => void;
  onDeleteMultiple: (ids: string[]) => void;
}

const HistoryTable: React.FC<HistoryTableProps> = ({
  entries,
  bzUnit,
  language,
  onDelete,
  onDeleteMultiple
}) => {
  const t = uiTranslations[language] || uiTranslations.de;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === entries.length) setSelectedIds([]);
    else setSelectedIds(entries.map(e => e.id));
  };

  if (entries.length === 0) {
    return (
      <div className="border-4 border-dashed border-gray-200 rounded-2xl p-3 flex flex-col items-center justify-center text-gray-300">
        <div className="w-12 h-12 flex items-center justify-center mb-1">
          <i className="fa-solid fa-list-check text-4xl opacity-20"></i>
        </div>
        <p className="font-black text-[10px] uppercase tracking-widest opacity-60">{t.notifications.errorEmpty}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {selectedIds.length > 0 && (
        <div className="flex justify-between items-center bg-red-50 p-2 border-2 border-red-200 rounded-lg">
          <span className="text-[10px] font-black text-red-700 uppercase">{selectedIds.length} {t.confirm.deleteBulkTitle}</span>
          <button 
            onClick={() => {
              onDeleteMultiple(selectedIds);
              setSelectedIds([]);
            }}
            className="bg-red-600 text-white px-3 py-1 rounded font-black text-[9px] uppercase active:translate-y-0.5"
          >
            {t.actions.deleteAll}
          </button>
        </div>
      )}

      <div className="border-2 border-black rounded-xl overflow-hidden bg-white">
        <table className="w-full text-[10px] sm:text-xs">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-2 py-2 text-left">
                <button onClick={toggleSelectAll}>
                  {selectedIds.length === entries.length ? <CheckSquare size={16} /> : <Square size={16} />}
                </button>
              </th>
              <th className="px-2 py-2 text-left font-black uppercase italic tracking-tighter">Datum</th>
              <th className="px-2 py-2 text-left font-black uppercase italic tracking-tighter">Zeit</th>
              <th className="px-2 py-2 text-center font-black uppercase italic tracking-tighter">BZ</th>
              <th className="px-2 py-2 text-center font-black uppercase italic tracking-tighter">RR</th>
              <th className="px-2 py-2 text-center font-black uppercase italic tracking-tighter">Puls</th>
              <th className="px-2 py-2 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id} className={`border-b border-black/5 hover:bg-blue-50 transition-colors ${selectedIds.includes(entry.id) ? 'bg-red-50' : ''}`}>
                <td className="px-2 py-2">
                  <button onClick={() => toggleSelect(entry.id)} className="text-gray-400 hover:text-black">
                    {selectedIds.includes(entry.id) ? <CheckSquare size={16} className="text-red-600" /> : <Square size={16} />}
                  </button>
                </td>
                <td className="px-2 py-2 font-bold">{entry.datum}</td>
                <td className="px-2 py-2 font-bold text-gray-500">{t.times[entry.zeitpunkt] || entry.zeitpunkt}</td>
                <td className="px-2 py-2 text-center">
                  <span className={`font-mono font-black ${entry.bzAuto ? 'text-gray-300 italic' : 'text-blue-700'}`}>
                    {bzUnit === 'mmol/l' ? mgToMmol(entry.bz) : entry.bz}
                  </span>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className={`font-mono font-black ${entry.rrAuto ? 'text-gray-300 italic' : 'text-green-700'}`}>
                    {entry.rrSys}/{entry.rrDia}
                  </span>
                </td>
                <td className="px-2 py-2 text-center font-mono font-black text-red-600">{entry.puls}</td>
                <td className="px-2 py-2 text-right">
                  <button onClick={() => onDelete(entry.id)} className="text-gray-300 hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
