
import React, { useState, useEffect, useCallback, useRef } from 'react';
import TimeSlotCard from './src/components/TimeSlotCard';
import HistoryTable from './src/components/HistoryTable';
import DailySummaryTable from './src/components/DailySummaryTable';
import HealthChart from './src/components/HealthChart';
import UserManual from './src/components/UserManual';
import { HealthEntry, DailyInputs, TimeOfDay, UserProfile, BzUnit, Language } from './src/types';
import { formatDateToGerman, isValidGermanDate, parseGermanDate } from './src/utils/dateUtils';
import { mmolToMg } from './src/utils/healthUtils';
import { uiTranslations } from './src/translations';
import * as htmlToImage from 'html-to-image';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { Share2, Mail, Download, ExternalLink, X } from 'lucide-react';

const TIMES: TimeOfDay[] = ['Morgens', 'Mittags', 'Abends', 'Nacht'];
const HeaderInput: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  isMono?: boolean;
  onActionClick?: () => void;
  actionTitle?: string;
}> = ({ label, value, onChange, placeholder, className = '', isMono = false, onActionClick, actionTitle }) => (
  <div className={`flex items-stretch border-2 border-black rounded overflow-hidden bg-white min-h-[32px] ${className}`}>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-2 py-1 outline-none text-black text-[12px] sm:text-sm font-black bg-transparent placeholder:font-bold placeholder:text-black/30 ${isMono ? 'font-mono' : ''}`}
    />
    {onActionClick ? (
      <button
        type="button"
        onClick={onActionClick}
        title={actionTitle}
        className="bg-blue-100 hover:bg-blue-200 active:bg-blue-300 border-l-2 border-black px-2 flex items-center justify-center gap-1.5 min-w-[40px] sm:min-w-[48px] shrink-0 transition-colors cursor-pointer"
      >
        <span className="text-[9px] sm:text-[11px] font-black text-blue-950 uppercase leading-none tracking-tighter">{label}</span>
        <i className="fa-solid fa-rotate text-[8px] sm:text-[10px] text-blue-950"></i>
      </button>
    ) : (
      <div className="bg-gray-100 border-l-2 border-black px-1.5 flex items-center justify-center min-w-[32px] shrink-0">
        <span className="text-[8px] sm:text-[10px] font-black text-black uppercase leading-none tracking-tighter">{label}</span>
      </div>
    )}
  </div>
);

const ConfirmModal: React.FC<{
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full overflow-hidden text-black">
        <div className="bg-red-600 text-white p-3 border-b-4 border-black font-black uppercase text-sm italic tracking-tighter">
          <i className="fa-solid fa-triangle-exclamation mr-2"></i> {title}
        </div>
        <div className="p-4">
          <p className="font-bold text-gray-800 text-sm leading-relaxed">{message}</p>
        </div>
        <div className="p-4 bg-gray-50 flex gap-2 border-t-2 border-black">
          <button onClick={onCancel} className="flex-1 bg-white border-2 border-black py-2 rounded font-black text-xs uppercase hover:bg-gray-100 active:translate-y-0.5">Abbrechen</button>
          <button onClick={onConfirm} className="flex-1 bg-red-600 text-white border-2 border-black py-2 rounded font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-700 active:translate-y-0.5 active:shadow-none">Löschen</button>
        </div>
      </div>
    </div>
  );
};

const ShareModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: 'email' | 'gmail' | 'outlook' | 'whatsapp' | 'copy' | 'download') => void;
  t: any;
}> = ({ isOpen, onClose, onSelect, t }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full overflow-hidden text-black">
        <div className="bg-black text-white p-4 flex justify-between items-center border-b-4 border-black">
          <h3 className="font-black uppercase italic tracking-tighter flex items-center gap-2">
            <Share2 size={20} /> {t.share.title}
          </h3>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onSelect('email')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-black rounded-xl hover:bg-blue-50 transition-colors group active:translate-y-1"
            >
              <Mail size={24} className="text-blue-700" />
              <div className="font-black uppercase text-[10px] tracking-tight">{t.share.email}</div>
            </button>
            <button 
              onClick={() => onSelect('whatsapp')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-black rounded-xl hover:bg-green-50 transition-colors group active:translate-y-1"
            >
              <i className="fa-brands fa-whatsapp text-2xl text-green-600"></i>
              <div className="font-black uppercase text-[10px] tracking-tight">WhatsApp</div>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onSelect('gmail')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-black rounded-xl hover:bg-red-50 transition-colors group active:translate-y-1"
            >
              <ExternalLink size={20} className="text-red-600" />
              <div className="font-black uppercase text-[10px] tracking-tight">{t.share.gmail}</div>
            </button>
            <button 
              onClick={() => onSelect('outlook')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-black rounded-xl hover:bg-blue-50 transition-colors group active:translate-y-1"
            >
              <ExternalLink size={20} className="text-blue-600" />
              <div className="font-black uppercase text-[10px] tracking-tight">{t.share.outlook}</div>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => onSelect('copy')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-black rounded-xl hover:bg-purple-50 transition-colors group active:translate-y-1"
            >
              <i className="fa-solid fa-copy text-xl text-purple-600"></i>
              <div className="font-black uppercase text-[10px] tracking-tight">{t.share.copy}</div>
            </button>
            <button 
              onClick={() => onSelect('download')}
              className="flex flex-col items-center gap-2 p-4 border-2 border-black rounded-xl hover:bg-gray-50 transition-colors group active:translate-y-1"
            >
              <Download size={20} className="text-gray-700" />
              <div className="font-black uppercase text-[10px] tracking-tight">{t.share.download}</div>
            </button>
          </div>

          <div className="mt-4 p-3 bg-amber-50 border-2 border-amber-200 rounded-lg text-[9px] font-bold text-amber-900 leading-tight">
            <i className="fa-solid fa-circle-info mr-1"></i> {t.share.info}
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [datum, setDatum] = useState<string>(formatDateToGerman(new Date()));
  const [isDateManuallyChanged, setIsDateManuallyChanged] = useState<boolean>(false);
  const [entries, setEntries] = useState<HealthEntry[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'daily' | 'chart'>('daily');
  const [preExportViewMode, setPreExportViewMode] = useState<'list' | 'daily' | 'chart' | null>(null);
  const [exportStep, setExportStep] = useState<'idle' | 'switching' | 'capturing'>('idle');
  const [bzUnit, setBzUnit] = useState<BzUnit>('mg/dl');
  const [language, setLanguage] = useState<Language>('de');
  const [userProfile, setUserProfile] = useState<UserProfile>({ name: '', birthday: '' });
  const [inputs, setInputs] = useState<DailyInputs>(
    TIMES.reduce((acc, time) => ({ ...acc, [time]: { bz: '', rrSys: '', rrDia: '', puls: '' } }), {})
  );
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [showManual, setShowManual] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportType, setExportType] = useState<'png' | 'pdf'>('png');
  const [isSharing, setIsSharing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareFileData, setShareFileData] = useState<{ file: File; data: string } | null>(null);
  
  const [confirmData, setConfirmData] = useState<{ isOpen: boolean; title: string; message: string; action: () => void } | null>(null);

  const handleDateChange = (newVal: string) => {
    setDatum(newVal);
    setIsDateManuallyChanged(true);
  };

  const handleSetToToday = () => {
    setDatum(formatDateToGerman(new Date()));
    setIsDateManuallyChanged(false);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLoadedRef = useRef(false);
  const isExportingRef = useRef(false);
  const t = uiTranslations[language] || uiTranslations.de;

  const sortEntries = useCallback((data: HealthEntry[]) => {
    return [...data].sort((a, b) => {
      const timeA = parseGermanDate(a.datum).getTime();
      const timeB = parseGermanDate(b.datum).getTime();
      if (isNaN(timeA) || isNaN(timeB)) return isNaN(timeA) ? 1 : -1;
      if (timeA !== timeB) return timeA - timeB;
      const timeOrder = { 'Morgens': 1, 'Mittags': 2, 'Abends': 3, 'Nacht': 4 };
      return (timeOrder[a.zeitpunkt] || 0) - (timeOrder[b.zeitpunkt] || 0);
    });
  }, []);

  const requestDelete = (title: string, message: string, action: () => void) => {
    setConfirmData({ isOpen: true, title, message, action });
  };

  const handleDeleteAll = () => {
    const hasData = entries.length > 0 || userProfile.name !== '' || userProfile.birthday !== '';
    if (!hasData) return;

    requestDelete(
      t.actions.deleteAll, 
      t.confirm.deleteAllMsg, 
      () => {
        setEntries([]);
        setUserProfile({ name: '', birthday: '' });
        showNotification('success', t.notifications.resetSuccess);
      }
    );
  };

  useEffect(() => {
    const processExport = async () => {
      if (exportStep === 'switching' && viewMode === 'chart') {
        // Ensure the DOM has time to switch view
        setTimeout(() => setExportStep('capturing'), 500);
      } 
      else if (exportStep === 'capturing' && viewMode === 'chart') {
        if (isExportingRef.current) return;
        isExportingRef.current = true;
        
        showNotification('success', t.share.preparing || 'Export wird vorbereitet...');
        
        const node = document.getElementById('health-charts-container');
        if (!node) {
          showNotification('error', 'Fehler: Export-Bereich nicht gefunden.');
          setExportStep('idle');
          isExportingRef.current = false;
          return;
        }

        // Force the container to landscape width in the real DOM so Recharts resizes
        const originalWidth = node.style.width;
        const originalMaxWidth = node.style.maxWidth;
        node.style.width = '1200px';
        node.style.maxWidth = 'none';

        // Wait for Recharts to settle and ensure it's rendered at the new size
        await new Promise(r => setTimeout(r, 4000));
        
        try {
          // The most robust settings for html-to-image
          const dataUrl = await htmlToImage.toPng(node, {
            backgroundColor: '#ffffff',
            cacheBust: true,
            pixelRatio: 2, 
            skipFonts: true, 
            fontEmbedCSS: '', 
            canvasWidth: 1200,
            canvasHeight: 800,
            style: {
              visibility: 'visible',
              width: '1200px',
              height: '800px',
              padding: '40px',
              margin: '0',
            }
          });

          if (!dataUrl || dataUrl === 'data:,') {
            throw new Error("Empty image generated");
          }

          const baseFilename = `MedLog_Report_${userProfile.name || 'Patient'}_${datum}`.replace(/[^a-z0-9]/gi, '_');

          if (exportType === 'pdf') {
            const pdf = new jsPDF('l', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            // Calculate dimensions to fit the page while maintaining aspect ratio
            const ratio = imgProps.width / imgProps.height;
            let finalWidth = pdfWidth;
            let finalHeight = pdfWidth / ratio;
            
            if (finalHeight > pdfHeight) {
              finalHeight = pdfHeight;
              finalWidth = pdfHeight * ratio;
            }
            
            // Center the image on the page
            const x = (pdfWidth - finalWidth) / 2;
            const y = (pdfHeight - finalHeight) / 2;
            
            pdf.addImage(dataUrl, 'PNG', x, y, finalWidth, finalHeight);
            const filename = `${baseFilename}.pdf`;
            
            if (isSharing && navigator.share) {
              try {
                const pdfBlob = pdf.output('blob');
                const file = new File([pdfBlob], filename, { type: 'application/pdf' });
                await navigator.share({
                  files: [file],
                  title: 'MED-LOG Report',
                  text: 'Mein Gesundheitsbericht'
                });
                showNotification('success', 'Erfolgreich geteilt.');
              } catch {
                pdf.save(filename);
                showNotification('success', 'Gespeichert (Teilen nicht möglich).');
              }
            } else {
              pdf.save(filename);
              showNotification('success', 'PDF gespeichert.');
            }
          } else {
            const filename = `${baseFilename}.png`;
            const link = document.createElement('a');
            link.download = filename;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showNotification('success', 'Grafik gespeichert.');
          }
        } catch (err) {
          console.error("Export Error:", err);
          showNotification('error', 'Export fehlgeschlagen. Bitte Browser-Einstellungen prüfen.');
        } finally {
          // Restore original styles
          if (node) {
            node.style.width = originalWidth;
            node.style.maxWidth = originalMaxWidth;
          }
          const backMode = preExportViewMode || 'daily';
          setExportStep('idle');
          setPreExportViewMode(null);
          isExportingRef.current = false;
          setTimeout(() => setViewMode(backMode), 200);
        }
      }
    };
    processExport();
  }, [exportStep, viewMode, userProfile.name, datum, preExportViewMode, exportType, isSharing]);

  const triggerExport = (type: 'png' | 'pdf' = 'png', share: boolean = false) => {
    if (exportStep !== 'idle') return;
    if (entries.length === 0) {
      showNotification('error', t.notifications.errorEmpty);
      return;
    }
    setExportType(type);
    setIsSharing(share);
    setShowExportMenu(false);
    if (viewMode !== 'chart') {
      setPreExportViewMode(viewMode);
      setExportStep('switching');
      setViewMode('chart');
    } else {
      setExportStep('capturing');
    }
  };

  const handleExportODS = () => {
    if (entries.length === 0) {
      showNotification('error', t.notifications.errorEmpty);
      return;
    }
    setShowExportMenu(false);

    try {
      const exportDate = formatDateToGerman(new Date());
      const worksheetData = entries.map(e => ({
        Datum: e.datum,
        Zeitpunkt: t.times[e.zeitpunkt] || e.zeitpunkt,
        'Blutzucker (mg/dl)': e.bz,
        'Blutdruck Sys': e.rrSys,
        'Blutdruck Dia': e.rrDia,
        Puls: e.puls,
        Status: (e.bzAuto || e.rrAuto) ? 'Schätzung' : 'Manuell',
        'Exportiert am': exportDate
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Vitalwerte");
      
      XLSX.writeFile(workbook, `${t.export.filename}_${userProfile.name || t.export.patient}_${datum}.ods`);
      showNotification('success', 'ODF-Datei erfolgreich erstellt.');
    } catch (err) {
      console.error("ODS Export Error:", err);
      showNotification('error', 'ODF-Export fehlgeschlagen.');
    }
  };

  useEffect(() => {
    const savedEntries = localStorage.getItem('gesundheits_tracker_entries');
    if (savedEntries) {
      try {
        const parsed = JSON.parse(savedEntries);
        if (Array.isArray(parsed)) setEntries(sortEntries(parsed));
      } catch (e) { console.error("Load entries error", e); }
    }
    const savedProfile = localStorage.getItem('gesundheits_tracker_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setUserProfile({ name: parsed.name || '', birthday: parsed.birthday || '' });
        if (parsed.preferredBzUnit) setBzUnit(parsed.preferredBzUnit);
      } catch (e) { console.error("Load profile error", e); }
    }
    const savedLang = localStorage.getItem('gesundheits_tracker_lang');
    if (savedLang) setLanguage(savedLang as Language);
    setTimeout(() => { isLoadedRef.current = true; }, 100);
  }, [sortEntries]);

  useEffect(() => {
    if (!isLoadedRef.current) return;
    localStorage.setItem('gesundheits_tracker_entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    if (!isLoadedRef.current) return;
    localStorage.setItem('gesundheits_tracker_profile', JSON.stringify({ ...userProfile, preferredBzUnit: bzUnit }));
  }, [userProfile, bzUnit]);

  useEffect(() => {
    if (!isLoadedRef.current) return;
    localStorage.setItem('gesundheits_tracker_lang', language);
  }, [language]);

  useEffect(() => {
    const checkAndResetDate = () => {
      const todayStr = formatDateToGerman(new Date());
      if (datum !== todayStr && !isDateManuallyChanged) {
        setDatum(todayStr);
      }
    };

    window.addEventListener('focus', checkAndResetDate);
    document.addEventListener('visibilitychange', checkAndResetDate);

    const interval = setInterval(checkAndResetDate, 15000);

    return () => {
      window.removeEventListener('focus', checkAndResetDate);
      document.removeEventListener('visibilitychange', checkAndResetDate);
      clearInterval(interval);
    };
  }, [datum, isDateManuallyChanged]);

  const showNotification = useCallback((type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const handleInputChange = (time: TimeOfDay, field: 'bz' | 'rrSys' | 'rrDia' | 'puls', value: string) => {
    // Nur Zahlen und Dezimaltrenner erlauben
    let cleanValue = value.replace(/[^0-9,.]/g, '');
    if (field !== 'bz') {
      cleanValue = cleanValue.replace(/[,.]/g, '');
    }
    
    setInputs(prev => ({
      ...prev,
      [time]: {
        ...prev[time],
        [field]: cleanValue
      }
    }));
  };

  const handleSave = useCallback(() => {
    if (!isValidGermanDate(datum)) {
      showNotification('error', t.notifications.errorDate);
      return;
    }

    // Validierung der Eingabeformate
    for (const time of TIMES) {
      const data = inputs[time];
      const timeLabel = t.times[time];

      if (data.bz.trim()) {
        const bzVal = parseFloat(data.bz.replace(',', '.'));
        if (bzUnit === 'mg/dl') {
          if (isNaN(bzVal) || bzVal < 20 || bzVal > 1000) {
            showNotification('error', `${timeLabel}: BZ muss zwischen 20 und 1000 liegen.`);
            return;
          }
        } else {
          if (isNaN(bzVal) || bzVal < 1.1 || bzVal > 55.5) {
            showNotification('error', `${timeLabel}: BZ muss zwischen 1.1 und 55.5 liegen.`);
            return;
          }
        }
      }

      if (data.rrSys.trim()) {
        const sysVal = parseInt(data.rrSys);
        if (isNaN(sysVal) || sysVal < 40 || sysVal > 300) {
          showNotification('error', `${timeLabel}: Sys muss zwischen 40 und 300 liegen.`);
          return;
        }
      }

      if (data.rrDia.trim()) {
        const diaVal = parseInt(data.rrDia);
        if (isNaN(diaVal) || diaVal < 30 || diaVal > 200) {
          showNotification('error', `${timeLabel}: Dia muss zwischen 30 und 200 liegen.`);
          return;
        }
      }

      if (data.puls.trim()) {
        const pulsVal = parseInt(data.puls);
        if (isNaN(pulsVal) || pulsVal < 20 || pulsVal > 300) {
          showNotification('error', `${timeLabel}: Puls muss zwischen 20 und 300 liegen.`);
          return;
        }
      }

      // Logik-Check: Sys muss höher als Dia sein
      if (data.rrSys.trim() && data.rrDia.trim()) {
        if (parseInt(data.rrSys) <= parseInt(data.rrDia)) {
          showNotification('error', `${timeLabel}: ${t.notifications.sysHigher}`);
          return;
        }
      }
    }

    const hasAnyInput = TIMES.some(t => 
      inputs[t].bz.trim() || inputs[t].rrSys.trim() || inputs[t].rrDia.trim() || inputs[t].puls.trim()
    );
    if (!hasAnyInput) {
      showNotification('error', t.notifications.errorEmpty);
      return;
    }

    setEntries(prev => {
      const newEntries = [...prev];
      const timestamp = Date.now();
      TIMES.forEach(time => {
        const data = inputs[time];
        const trimmedBz = data.bz.trim();
        const trimmedSys = data.rrSys.trim();
        const trimmedDia = data.rrDia.trim();
        const trimmedPuls = data.puls.trim();

        // Zeitblock nur speichern, wenn mindestens ein Feld ausgefüllt wurde
        if (!trimmedBz && !trimmedSys && !trimmedDia && !trimmedPuls) return;

        let finalBz = trimmedBz;
        if (bzUnit === 'mmol/l' && finalBz) finalBz = mmolToMg(finalBz);

        const existingIndex = newEntries.findIndex(e => e.datum === datum && e.zeitpunkt === time);
        
        // Standwerte definieren (Defaults)
        const defBz = "100";
        const defSys = "120";
        const defDia = "80";
        const defPuls = "72";

        if (existingIndex > -1) {
          newEntries[existingIndex] = { 
            ...newEntries[existingIndex], 
            bz: finalBz || newEntries[existingIndex].bz || defBz,
            rrSys: trimmedSys || newEntries[existingIndex].rrSys || defSys,
            rrDia: trimmedDia || newEntries[existingIndex].rrDia || defDia,
            puls: trimmedPuls || newEntries[existingIndex].puls || defPuls,
            bzAuto: finalBz ? false : newEntries[existingIndex].bzAuto,
            rrAuto: (trimmedSys || trimmedDia) ? false : newEntries[existingIndex].rrAuto
          };
        } else {
          newEntries.push({
            id: `E-${timestamp}-${Math.random().toString(36).substr(2, 4)}`,
            datum, 
            zeitpunkt: time, 
            bz: finalBz || defBz,
            rrSys: trimmedSys || defSys, 
            rrDia: trimmedDia || defDia, 
            puls: trimmedPuls || defPuls,
            createdAt: timestamp, 
            bzAuto: !finalBz,
            rrAuto: (!trimmedSys && !trimmedDia)
          });
        }
      });
      return sortEntries(newEntries);
    });
    // Reset Inputs nach dem Speichern
    setInputs(TIMES.reduce((acc, time) => ({ ...acc, [time]: { bz: '', rrSys: '', rrDia: '', puls: '' } }), {}));
    showNotification('success', t.notifications.saved);
  }, [datum, inputs, bzUnit, showNotification, sortEntries, t]);

  const handleExportJSON = () => {
    if (entries.length === 0) { showNotification('error', t.notifications.errorEmpty); return; }
    const data = JSON.stringify({ entries, userProfile, bzUnit, date: new Date().toISOString() }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${t.security.backupFilename}_${formatDateToGerman(new Date())}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShareBackup = async () => {
    if (entries.length === 0) { showNotification('error', t.notifications.errorEmpty); return; }
    const data = JSON.stringify({ entries, userProfile, bzUnit, date: new Date().toISOString() }, null, 2);
    const filename = `${t.security.backupFilename}_${formatDateToGerman(new Date())}.json`;
    const blob = new Blob([data], { type: 'text/plain' });
    const file = new File([blob], filename, { type: 'text/plain' });

    setShareFileData({ file, data });
    setShowShareModal(true);
  };

  const executeShare = async (option: 'email' | 'gmail' | 'outlook' | 'whatsapp' | 'copy' | 'download') => {
    if (!shareFileData) return;
    const { data } = shareFileData;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(t.share.backupSubject)}&body=${encodeURIComponent(t.share.backupBody)}`;
    
    setShowShareModal(false);

    if (option === 'email') {
      showNotification('success', t.share.preparing);
      const mailLink = document.createElement('a');
      mailLink.href = mailtoUrl;
      mailLink.target = '_blank';
      document.body.appendChild(mailLink);
      mailLink.click();
      document.body.removeChild(mailLink);
      setTimeout(() => handleExportJSON(), 1500);
    }
    else if (option === 'gmail') {
      showNotification('success', t.share.preparing);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${encodeURIComponent(t.share.backupSubject)}&body=${encodeURIComponent(t.share.backupBody)}`;
      window.open(gmailUrl, '_blank');
      setTimeout(() => handleExportJSON(), 1500);
    }
    else if (option === 'outlook') {
      showNotification('success', t.share.preparing);
      const outlookUrl = `https://outlook.live.com/default.aspx?rru=compose&subject=${encodeURIComponent(t.share.backupSubject)}&body=${encodeURIComponent(t.share.backupBody)}`;
      window.open(outlookUrl, '_blank');
      setTimeout(() => handleExportJSON(), 1500);
    }
    else if (option === 'whatsapp') {
      showNotification('success', t.share.preparing);
      const waUrl = `https://wa.me/?text=${encodeURIComponent(t.share.backupBody)}`;
      window.open(waUrl, '_blank');
      setTimeout(() => handleExportJSON(), 1500);
    }
    else if (option === 'copy') {
      try {
        await navigator.clipboard.writeText(data);
        showNotification('success', t.share.copySuccess);
      } catch (err) {
        showNotification('error', t.notifications.copyError);
      }
    }
    else if (option === 'download') {
      handleExportJSON();
    }
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (imported.entries) {
          setEntries(sortEntries(imported.entries));
          if (imported.userProfile) setUserProfile(imported.userProfile);
          showNotification('success', t.notifications.importSuccess);
        }
      } catch (err) { showNotification('error', t.notifications.invalidFile); }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const hasAnyDataForDeletion = entries.length > 0 || userProfile.name !== '' || userProfile.birthday !== '';

  return (
    <div className="min-h-screen pb-4 bg-[#f0f2f5] text-black font-sans selection:bg-blue-200">
      <header className="bg-[#1e3a8a] text-white py-2 sm:py-3 px-4 border-b-4 border-black print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-black italic tracking-tighter flex items-center gap-2 shrink-0">
            <i className="fa-solid fa-heart-pulse text-red-500"></i> MED-LOG
          </h1>
          
          <div className="flex flex-col items-stretch gap-2 w-full lg:max-w-4xl">
            <div className="flex flex-row gap-2">
              <HeaderInput 
                label={t.header.pat} 
                placeholder={t.header.namePlaceholder} 
                value={userProfile.name} 
                onChange={(v) => setUserProfile(p => ({ ...p, name: v }))} 
                className="flex-[2]" 
              />
              <HeaderInput 
                label={t.header.geb} 
                placeholder="TT.MM.JJJJ" 
                value={userProfile.birthday} 
                onChange={(v) => setUserProfile(p => ({ ...p, birthday: v }))} 
                className="flex-1" 
                isMono 
              />
            </div>
            <HeaderInput 
              label={t.header.akt} 
              value={datum} 
              onChange={handleDateChange} 
              className="w-full" 
              isMono 
              onActionClick={handleSetToToday}
              actionTitle={t.actions.setToToday || 'Auf heute setzen'}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-4 space-y-4 sm:space-y-6 mt-2 sm:mt-6 relative print:mt-0">
        <style>{`
          @media print {
            body { background: white !important; padding: 0 !important; margin: 0 !important; }
            .print\\:hidden { display: none !important; }
            main { max-width: none !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
            section { border: none !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; }
            .daily-summary-container, .history-table-container { display: none !important; }
            #health-charts-container { 
              display: block !important;
              width: 100% !important; 
              padding: 0 !important; 
              margin: 0 !important;
              border: none !important;
              box-shadow: none !important;
              overflow: visible !important;
            }
            @page {
              size: A4 landscape;
              margin: 1cm;
            }
          }
        `}</style>
        {notification && (
          <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded border-4 border-black font-black text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${notification.type === 'success' ? 'bg-green-400' : 'bg-red-500 text-white'} print:hidden animate-bounce`}>
            {notification.message}
          </div>
        )}

        <ConfirmModal 
          isOpen={confirmData?.isOpen || false} 
          title={confirmData?.title || ""} 
          message={confirmData?.message || ""} 
          onCancel={() => setConfirmData(null)}
          onConfirm={() => {
            confirmData?.action();
            setConfirmData(null);
          }}
        />

        <ShareModal 
          isOpen={showShareModal} 
          onClose={() => setShowShareModal(false)} 
          onSelect={executeShare} 
          t={t} 
        />

        <section className="bg-white p-1.5 sm:p-3 rounded-2xl border-2 sm:border-4 border-black print:hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-1.5">
            {TIMES.map(time => (
              <TimeSlotCard key={time} label={time} translatedLabel={t.times[time]} values={inputs[time]} bzUnit={bzUnit} onChange={(f: string, v: string) => handleInputChange(time, f as 'bz' | 'rrSys' | 'rrDia' | 'puls', v)} />
            ))}
          </div>
          <div className="mt-3 sm:mt-4 flex gap-1.5 sm:gap-2 items-stretch">
            <button onClick={handleSave} className="flex-grow bg-[#2563eb] hover:bg-blue-700 text-white font-black py-2 rounded-xl border-2 sm:border-4 border-black active:translate-y-0.5 uppercase text-xs flex items-center justify-center gap-2 sm:gap-3 transition-all">
              <i className="fa-solid fa-floppy-disk text-sm sm:text-base"></i> {t.actions.save}
            </button>
            <div className="flex flex-col border-2 sm:border-4 border-black rounded-xl overflow-hidden shrink-0 min-w-[80px] sm:min-w-[90px] bg-white">
              <button onClick={() => setBzUnit('mg/dl')} className={`flex-1 text-[9px] px-2 sm:px-3 font-black transition-colors ${bzUnit === 'mg/dl' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 border-b-[1.5px] sm:border-b-2 border-black'}`}>MG/DL</button>
              <button onClick={() => setBzUnit('mmol/l')} className={`flex-1 text-[9px] px-2 sm:px-3 font-black transition-colors ${bzUnit === 'mmol/l' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}>MMOL/L</button>
            </div>
          </div>
        </section>

        <section className={`bg-white p-2.5 sm:p-4 rounded-2xl border-2 sm:border-4 border-black ${entries.length > 0 ? 'min-h-[300px]' : 'min-h-0'} print:p-0 print:border-none print:shadow-none transition-all duration-300`}>
          <div className="flex mb-4 border-2 sm:border-4 border-black rounded-xl print:hidden bg-white">
            <div className="flex items-center w-full">
              <button onClick={() => setViewMode('daily')} className={`flex-1 px-2 sm:px-4 py-2 sm:py-3 font-black text-[10px] sm:text-[11px] uppercase transition-all rounded-l-lg ${viewMode === 'daily' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 border-r-2 sm:border-r-4 border-black'}`}>{t.actions.table}</button>
              <button onClick={() => setViewMode('list')} className={`flex-1 px-2 sm:px-4 py-2 sm:py-3 font-black text-[10px] sm:text-[11px] uppercase transition-all ${viewMode === 'list' ? 'bg-black text-white' : 'text-black hover:bg-gray-100 border-r-2 sm:border-r-4 border-black'}`}>{t.actions.list}</button>
              <button onClick={() => setViewMode('chart')} className={`flex-1 px-2 sm:px-4 py-2 sm:py-3 font-black text-[10px] sm:text-[11px] uppercase transition-all ${viewMode === 'chart' ? 'bg-black text-white' : 'text-black hover:bg-gray-100'}`}>{t.actions.chart}</button>
              
              <div className="w-px h-8 bg-black/10 mx-1 sm:mx-2"></div>

              <div className="relative flex items-stretch">
                <button 
                  id="export-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowExportMenu(!showExportMenu);
                  }} 
                  disabled={exportStep !== 'idle'}
                  className={`px-4 sm:px-6 py-2 sm:py-3 font-black text-[10px] sm:text-[11px] uppercase flex items-center justify-center gap-2 transition-all rounded-r-lg ${showExportMenu ? 'bg-indigo-600 text-white' : 'text-indigo-700 hover:bg-indigo-50'}`}
                >
                  <i className={`fa-solid ${exportStep !== 'idle' ? 'fa-spinner fa-spin' : 'fa-file-export'} text-xs sm:text-sm`}></i> 
                  <span className="hidden xs:inline">{exportStep !== 'idle' ? t.actions.waiting : t.actions.export}</span>
                  <i className={`fa-solid fa-chevron-${showExportMenu ? 'up' : 'down'} text-[8px]`}></i>
                </button>

                {showExportMenu && (
                  <>
                    <div className="fixed inset-0 z-[190] print:hidden" onClick={() => setShowExportMenu(false)}></div>
                    <div className="absolute bottom-full sm:top-full right-0 mb-2 sm:mb-0 sm:mt-2 w-64 bg-white border-4 border-black rounded-xl z-[200] overflow-hidden shadow-lg">
                      <div className="bg-gray-100 p-2 border-b-2 border-black font-black text-[9px] uppercase text-gray-500 flex justify-between items-center">
                        <span>{t.export.title}</span>
                        <button onClick={() => setShowExportMenu(false)} className="text-gray-400 hover:text-black">
                          <X size={14} />
                        </button>
                      </div>
                      <div className="max-h-[60vh] overflow-y-auto">
                        <button 
                          onClick={() => triggerExport('pdf')}
                          className="w-full text-left px-3 py-3 hover:bg-red-50 flex items-center gap-3 border-b-2 border-black/5 transition-colors"
                        >
                          <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-file-pdf"></i>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-black text-[11px] uppercase leading-none">{t.export.pdf}</span>
                            <span className="text-[9px] text-gray-400 font-bold mt-1">{t.export.pdfDesc}</span>
                          </div>
                        </button>
                        <button 
                          onClick={() => triggerExport('png')}
                          className="w-full text-left px-3 py-3 hover:bg-blue-50 flex items-center gap-3 border-b-2 border-black/5 transition-colors"
                        >
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-file-image"></i>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-black text-[11px] uppercase leading-none">{t.export.png}</span>
                            <span className="text-[9px] text-gray-400 font-bold mt-1">{t.export.pngDesc}</span>
                          </div>
                        </button>
                        <button 
                          onClick={handleExportODS}
                          className="w-full text-left px-3 py-3 hover:bg-green-50 flex items-center gap-3 transition-colors"
                        >
                          <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0">
                            <i className="fa-solid fa-file-excel"></i>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-black text-[11px] uppercase leading-none">{t.export.odf}</span>
                            <span className="text-[9px] text-gray-400 font-bold mt-1">{t.export.odfDesc}</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-visible">
            <div className={`${viewMode === 'daily' ? 'block' : 'hidden print:block'} daily-summary-container`}>
              <DailySummaryTable 
                entries={entries} 
                bzUnit={bzUnit} 
                language={language} 
                onDeleteDay={(d: string) => requestDelete(t.confirm.deleteDayTitle, t.confirm.deleteDayMsg, () => setEntries(p => p.filter(e => e.datum !== d)))} 
                onDeleteMultipleDays={(dates: string[]) => requestDelete(t.confirm.deleteMultiTitle, t.confirm.deleteMultiMsg, () => setEntries(p => p.filter(e => !dates.includes(e.datum))))}
              />
            </div>
            <div className={`${viewMode === 'chart' ? 'block' : 'hidden print:block'}`}>
              <HealthChart entries={entries} userProfile={userProfile} bzUnit={bzUnit} language={language} isExporting={exportStep !== 'idle'} />
            </div>
            {viewMode === 'list' && (
              <div className="history-table-container">
                <HistoryTable 
                  entries={entries} 
                  bzUnit={bzUnit} 
                  language={language} 
                  onDelete={(id: string) => requestDelete(t.confirm.deleteConfirmTitle, t.confirm.deleteConfirmMsg, () => setEntries(p => p.filter(e => e.id !== id)))} 
                  onDeleteMultiple={(ids: string[]) => requestDelete(t.confirm.deleteBulkTitle, t.confirm.deleteBulkMsg, () => setEntries(p => p.filter(e => !ids.includes(e.id))))} 
                />
              </div>
            )}
          </div>
        </section>

        <section className="bg-[#0f172a] text-white py-3 sm:py-4 px-4 sm:px-5 rounded-2xl border-2 sm:border-4 border-black print:hidden">
          <h3 className="font-black text-sm sm:text-base uppercase mb-2 flex items-center gap-2 text-blue-400 underline decoration-2 sm:decoration-4 underline-offset-8 decoration-blue-400/30">
            <i className="fa-solid fa-shield-halved"></i> {t.security.title}
          </h3>
          <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 mb-4 leading-relaxed italic">{t.security.infoText}</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <button onClick={handleExportJSON} className="bg-white text-black border-2 sm:border-4 border-black py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl font-black text-[7px] sm:text-[8px] uppercase hover:translate-y-0.5 flex flex-col items-center justify-center gap-1 transition-all min-w-[70px] sm:min-w-[90px]">
              <i className="fa-solid fa-download text-xs sm:text-sm text-blue-600"></i>
              <span className="leading-tight text-center">{t.security.backup.split(' ')[0]}<br/>{t.security.backup.split(' ').slice(1).join(' ')}</span>
            </button>
            <button onClick={handleShareBackup} className="bg-white text-black border-2 sm:border-4 border-black py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl font-black text-[7px] sm:text-[8px] uppercase hover:translate-y-0.5 flex flex-col items-center justify-center gap-1 transition-all border-green-500/20 min-w-[70px] sm:min-w-[90px]">
              <Share2 size={14} className="text-green-600" />
              <span className="leading-tight">{t.security.share}</span>
            </button>
            <button onClick={() => fileInputRef.current?.click()} className="bg-white text-black border-2 sm:border-4 border-black py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl font-black text-[7px] sm:text-[8px] uppercase hover:translate-y-0.5 flex flex-col items-center justify-center gap-1 transition-all min-w-[70px] sm:min-w-[90px]">
              <i className="fa-solid fa-upload text-xs sm:text-sm text-blue-600"></i>
              <span className="leading-tight text-center">{t.security.import.split(' ')[0]}<br/>{t.security.import.split(' ').slice(1).join(' ')}</span>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
          </div>
        </section>

        <footer className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 pb-4 print:hidden border-t-2 border-black/10">
          <button onClick={() => setShowManual(true)} className="text-xs font-black text-blue-900 border-b-2 border-blue-900 uppercase py-1 hover:text-red-600 hover:border-red-600 transition-colors">
            <i className="fa-solid fa-circle-info mr-1"></i> {t.manual.title}
          </button>
          <div className="flex gap-2 flex-wrap justify-center items-center">
            {[ 
              { id: 'de', code: 'de', label: 'Deutsch' }, 
              { id: 'en', code: 'gb', label: 'English' }, 
              { id: 'fr', code: 'fr', label: 'Français' }, 
              { id: 'es', code: 'es', label: 'Español' }, 
              { id: 'tr', code: 'tr', label: 'Türkçe' }, 
              { id: 'ar', code: 'sa', label: 'العربية' } 
            ].map(l => (
              <button 
                key={l.id} 
                onClick={() => setLanguage(l.id as Language)} 
                className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center overflow-hidden active:scale-95 transition-transform ${language === l.id ? 'bg-blue-600 scale-110' : 'bg-white'}`}
                title={l.label}
              >
                <img 
                  src={`https://flagcdn.com/w40/${l.code}.png`} 
                  alt={l.label}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </footer>

        <div className="pt-6 pb-2 flex justify-center print:hidden border-t-2 border-black/5">
          <button 
            onClick={handleDeleteAll}
            className={`flex items-center gap-3 px-6 py-2.5 bg-white text-red-600 border-4 border-red-600 rounded-2xl font-black uppercase text-[10px] sm:text-xs hover:translate-y-0.5 active:translate-y-1 transition-all ${!hasAnyDataForDeletion ? 'opacity-20 grayscale pointer-events-none' : ''}`}
          >
            <i className="fa-solid fa-radiation text-base"></i>
            {t.actions.deleteAll}
          </button>
        </div>

        {/* Versions-Anzeige am unteren Ende */}
        <div className="pb-8 text-center print:hidden">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Version v3.3.6 • MED-LOG Digital
          </span>
        </div>

        <UserManual isOpen={showManual} onClose={() => setShowManual(false)} language={language} />
      </main>
    </div>
  );
};

export default App;
