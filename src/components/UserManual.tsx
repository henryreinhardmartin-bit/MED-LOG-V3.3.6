
import React from 'react';
import { Language } from '../types';
import { X } from 'lucide-react';

interface UserManualProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const UserManual: React.FC<UserManualProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const content = {
    de: {
      title: 'Bedienungsanleitung',
      steps: [
        { t: '1. Daten eingeben', d: 'Tragen Sie Ihre Werte (Blutzucker, Blutdruck, Puls) in die Felder oben ein. Wählen Sie das passende Datum.' },
        { t: '2. Speichern', d: 'Klicken Sie auf "SPEICHERN". Die Werte werden sicher auf Ihrem Gerät gespeichert.' },
        { t: '3. Ansicht wählen', d: 'Wechseln Sie zwischen Tabelle, Liste oder Grafik, um Ihre Fortschritte zu sehen.' },
        { t: '4. Exportieren', d: 'Nutzen Sie die Exportfunktion, um Berichte als PDF oder Bild für Ihren Arzt zu erstellen.' },
        { t: '5. Backup', d: 'Sichern Sie Ihre Daten regelmäßig über die Backup-Funktion am Ende der Seite.' }
      ]
    },
    en: {
      title: 'User Manual',
      steps: [
        { t: '1. Enter Data', d: 'Enter your values (Blood Sugar, Blood Pressure, Pulse) in the fields above. Select the correct date.' },
        { t: '2. Save', d: 'Click "SAVE DATA". The values will be stored securely on your device.' },
        { t: '3. Choose View', d: 'Switch between Table, List, or Chart to see your progress.' },
        { t: '4. Export', d: 'Use the export function to create reports as PDF or image for your doctor.' },
        { t: '5. Backup', d: 'Back up your data regularly using the backup function at the bottom of the page.' }
      ]
    }
  };

  const activeContent = content[language as keyof typeof content] || content.de;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-blue-900 text-white p-6 flex justify-between items-center border-b-4 border-black">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
            <i className="fa-solid fa-book-open"></i> {activeContent.title}
          </h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform bg-white/10 p-2 rounded-full">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-6">
          {activeContent.steps.map((step, i) => (
            <div key={i} className="flex gap-4 group">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black shrink-0 group-hover:bg-blue-600 transition-colors">
                {i + 1}
              </div>
              <div>
                <h4 className="font-black uppercase text-sm mb-1">{step.t}</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">{step.d}</p>
              </div>
            </div>
          ))}

          <div className="mt-8 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
            <h5 className="font-black text-amber-900 uppercase text-xs mb-2 flex items-center gap-2">
              <i className="fa-solid fa-circle-info"></i> Wichtiger Hinweis
            </h5>
            <p className="text-amber-800 text-[11px] font-bold leading-relaxed italic">
              Diese App ersetzt keinen Arztbesuch. Bei akuten Beschwerden wenden Sie sich bitte sofort an einen Mediziner oder den Notruf.
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t-4 border-black flex justify-end">
          <button 
            onClick={onClose}
            className="bg-black text-white px-8 py-3 rounded-xl font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(59,130,246,1)] active:translate-y-1 active:shadow-none transition-all"
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManual;
