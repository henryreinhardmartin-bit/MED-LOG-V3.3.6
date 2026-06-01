
import React from 'react';
import { BzUnit } from '../types';

interface TimeSlotCardProps {
  label: string;
  translatedLabel: string;
  values: {
    bz: string;
    rrSys: string;
    rrDia: string;
    puls: string;
  };
  bzUnit: BzUnit;
  onChange: (field: string, value: string) => void;
}

const InputWithLabel = ({ id, value, onChange, label, placeholder, bgColor, textColor, errorMsg }: any) => {
  return (
    <div 
      className={`flex items-stretch border-2 border-black rounded-lg overflow-hidden ${bgColor} ${errorMsg ? 'ring-2 ring-red-500 bg-red-50' : ''}`}
      title={errorMsg}
    >
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-1 py-0.5 sm:py-1 outline-none text-center text-xs sm:text-sm font-black placeholder:font-black placeholder:text-black/30 bg-transparent ${textColor}`}
        placeholder={placeholder}
      />
      <div className="bg-white border-l-2 border-black px-1 sm:px-1.5 flex items-center justify-center min-w-[20px] sm:min-w-[26px] shrink-0 select-none">
        <span className="text-[9px] sm:text-[11px] font-black text-black uppercase tracking-tight">{label}</span>
      </div>
    </div>
  );
};

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({ label, translatedLabel, values, bzUnit, onChange }) => {
  const getIcon = (l: string) => {
    switch (l) {
      case 'Morgens': return 'fa-sun text-amber-500';
      case 'Mittags': return 'fa-cloud-sun text-orange-400';
      case 'Abends': return 'fa-moon text-indigo-400';
      case 'Nacht': return 'fa-star text-amber-400';
      default: return 'fa-clock';
    }
  };

  const getValidationMessage = (field: string, value: string) => {
    if (!value.trim()) return '';
    const num = parseFloat(value.replace(',', '.'));
    if (isNaN(num)) return 'Nur Zahlen';
    
    switch (field) {
      case 'rrSys': if (num < 40 || num > 300) return 'Sys: 40-300'; break;
      case 'rrDia': if (num < 30 || num > 200) return 'Dia: 30-200'; break;
      case 'puls': if (num < 20 || num > 300) return 'Puls: 20-300'; break;
      case 'bz': 
        if (bzUnit === 'mg/dl') {
          if (num < 20 || num > 1000) return 'BZ: 20-1000';
        } else {
          if (num < 1.1 || num > 55.5) return 'BZ: 1.1-55.5';
        }
        break;
    }
    return '';
  };

  return (
    <div className="bg-white border-2 border-black rounded-xl p-1.5 sm:p-2 sm:p-2.5 flex flex-col gap-1.5">
      <div className="flex items-center gap-1 border-b-2 border-black/5 pb-1">
        <i className={`fa-solid ${getIcon(label)} text-xs sm:text-sm`}></i>
        <span className="font-black uppercase text-[10px] sm:text-[12px] tracking-wide text-black">{translatedLabel}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
        <InputWithLabel 
          id={`input-${label}-rrSys`}
          value={values.rrSys}
          onChange={(v: string) => onChange('rrSys', v)}
          label="S"
          placeholder="Sys"
          bgColor="bg-[#e0f2fe]"
          textColor="text-blue-900 font-bold"
          errorMsg={getValidationMessage('rrSys', values.rrSys)}
        />
        <InputWithLabel 
          id={`input-${label}-rrDia`}
          value={values.rrDia}
          onChange={(v: string) => onChange('rrDia', v)}
          label="D"
          placeholder="Dia"
          bgColor="bg-[#ccfbf1]"
          textColor="text-teal-900 font-bold"
          errorMsg={getValidationMessage('rrDia', values.rrDia)}
        />
        <InputWithLabel 
          id={`input-${label}-puls`}
          value={values.puls}
          onChange={(v: string) => onChange('puls', v)}
          label="P"
          placeholder="Puls"
          bgColor="bg-[#fee2e2]"
          textColor="text-red-900 font-bold"
          errorMsg={getValidationMessage('puls', values.puls)}
        />
        <InputWithLabel 
          id={`input-${label}-bz`}
          value={values.bz}
          onChange={(v: string) => onChange('bz', v)}
          label={bzUnit === 'mg/dl' ? 'MG' : 'MM'}
          placeholder="BZ"
          bgColor="bg-[#fef3c7]"
          textColor="text-amber-900 font-bold"
          errorMsg={getValidationMessage('bz', values.bz)}
        />
      </div>
    </div>
  );
};

export default TimeSlotCard;
