
import { Language } from './types';

export const uiTranslations: Record<Language, any> = {
  de: {
    header: { pat: 'PAT.', geb: 'GEB', akt: 'AKT', namePlaceholder: 'Name Vorname', datePlaceholder: 'TT.MM.JJJJ' },
    times: { Morgens: 'Früh', Mittags: 'Mittag', Abends: 'Abend', Nacht: 'Nacht' },
    actions: { save: 'SPEICHERN', quickExp: 'SCHNELL-EXP', table: 'TABELLE', list: 'LISTE', chart: 'GRAFIK', deleteAll: 'ALLES LÖSCHEN', export: 'EXPORT', waiting: 'Warten...', setToToday: 'Auf heute setzen' },
    export: { png: 'PNG Bild', odf: 'ODF (*.ods Format)', pdf: 'PDF (A4 Ausdruck)', title: 'Format wählen', pdfDesc: 'Als PDF speichern', pngDesc: 'Als Bild speichern', odfDesc: 'Für LibreOffice / Excel', filename: 'VitalReport', patient: 'Patient', shareText: 'Vital-Analyse von' },
    security: {
      title: 'DATEN & SICHERHEIT',
      infoTitle: 'Wichtiger Hinweis',
      infoText: 'Ihre Daten werden lokal gespeichert. Es findet keine Übertragung an Server statt. Ohne Backup gehen die Daten beim Löschen des Browser-Verlaufs verloren.',
      backup: 'DATEN SICHERN (BACKUP)',
      import: 'BACKUP LADEN (DATEI)',
      share: 'TEILEN',
      backupFilename: 'VitalLog_Backup'
    },
    stats: {
      title: 'ZUSAMMENFASSUNG & ANALYSE',
      avgRR: 'Ø Blutdruck',
      avgBZ: 'Ø Blutzucker',
      hba1c: 'Geschätzter HbA1c',
      period: 'Gesamter Zeitraum'
    },
    confirm: {
      deleteAllMsg: 'ACHTUNG: Hiermit werden ALLE gespeicherten Messwerte sowie Ihr Name und Geburtsdatum unwiderruflich von diesem Gerät gelöscht!',
      deleteDayTitle: 'Tag löschen',
      deleteDayMsg: 'Möchten Sie wirklich alle Daten für diesen Tag löschen?',
      deleteMultiTitle: 'Auswahl löschen',
      deleteMultiMsg: 'Möchten Sie wirklich alle Daten für die ausgewählten Tage löschen?',
      deleteEntryTitle: 'Eintrag löschen',
      deleteEntryMsg: 'Soll dieser Einzelmesswert wirklich entfernt werden?',
      deleteConfirmTitle: 'Löschen bestätigen',
      deleteConfirmMsg: 'Soll dieser Tabelleneintrag unwiderruflich gelöscht werden?',
      deleteBulkTitle: 'Massenlöschung',
      deleteBulkMsg: 'Möchten Sie wirklich die markierten Einträge löschen?'
    },
    manual: { title: 'Bedienungsanleitung', subtitle: 'Einfache Sprache' },
    notifications: { saved: 'Gespeichert', errorDate: 'Datum ungültig', errorEmpty: 'Keine Werte', importSuccess: 'Import erfolgreich', exportRunning: 'Export läuft...', resetSuccess: 'Alle Daten wurden zurückgesetzt.', exportError: 'Fehler: Grafik-Modul nicht bereit.', invalidFile: 'Datei ungültig', sysHigher: 'Sys muss höher als Dia sein.', copyError: 'Kopieren fehlgeschlagen.' },
    share: {
      title: 'Versandoption wählen',
      email: 'Standard E-Mail App',
      gmail: 'Gmail (Web)',
      outlook: 'Outlook (Web)',
      copy: 'In Zwischenablage kopieren',
      download: 'Nur Download',
      info: 'Hinweis: Bei Gmail/Outlook müssen Sie die heruntergeladene Datei manuell anhängen. Nutzen Sie "In Zwischenablage kopieren" für schnellen Textversand.',
      copySuccess: 'Backup-Daten in Zwischenablage kopiert!',
      preparing: 'Versand wird vorbereitet...',
      backupSubject: 'VitalLog Backup',
      backupBody: 'Anbei mein Backup. Bitte Datei manuell anhängen.'
    }
  },
  en: {
    header: { pat: 'NAME', geb: 'DOB', akt: 'DATE', namePlaceholder: 'Lastname Firstname', datePlaceholder: 'DD.MM.YYYY' },
    times: { Morgens: 'Morning', Mittags: 'Noon', Abends: 'Evening', Nacht: 'Night' },
    actions: { save: 'SAVE DATA', quickExp: 'QUICK EXP', table: 'TABLE', list: 'LIST', chart: 'CHART', deleteAll: 'DELETE ALL', export: 'EXPORT', waiting: 'Waiting...', setToToday: 'Set to today' },
    export: { png: 'PNG Image', odf: 'ODF (*.ods Format)', pdf: 'PDF (A4 Print)', title: 'Select Format', pdfDesc: 'Save as PDF', pngDesc: 'Save as Image', odfDesc: 'For LibreOffice / Excel', filename: 'VitalReport', patient: 'Patient', shareText: 'Vital Analysis of' },
    security: {
      title: 'DATA & SECURITY',
      infoTitle: 'Important Notice',
      infoText: 'Your data is stored locally. No data is sent to servers. If you clear your browser history without a backup, your data will be lost.',
      backup: 'SAVE BACKUP (EXPORT)',
      import: 'LOAD BACKUP (FILE)',
      share: 'SHARE',
      backupFilename: 'VitalLog_Backup'
    },
    stats: {
      title: 'SUMMARY & ANALYSIS',
      avgRR: 'Ø Blood Pressure',
      avgBZ: 'Ø Blood Glucose',
      hba1c: 'Estimated HbA1c',
      period: 'Total Period'
    },
    confirm: {
      deleteAllMsg: 'ATTENTION: This will irrevocably delete ALL saved measurements as well as your name and date of birth from this device!',
      deleteDayTitle: 'Delete Day',
      deleteDayMsg: 'Do you really want to delete all data for this day?',
      deleteMultiTitle: 'Delete Selection',
      deleteMultiMsg: 'Do you really want to delete all data for the selected days?',
      deleteEntryTitle: 'Delete Entry',
      deleteEntryMsg: 'Should this individual measurement really be removed?',
      deleteConfirmTitle: 'Confirm Deletion',
      deleteConfirmMsg: 'Should this table entry be irrevocably deleted?',
      deleteBulkTitle: 'Bulk Deletion',
      deleteBulkMsg: 'Do you really want to delete the marked entries?'
    },
    manual: { title: 'User Manual', subtitle: 'Simple Language' },
    notifications: { saved: 'Data saved', errorDate: 'Invalid date', errorEmpty: 'No values entered', importSuccess: 'Import successful', exportRunning: 'Exporting...', resetSuccess: 'All data has been reset.', exportError: 'Error: Graphics module not ready.', invalidFile: 'Invalid file', sysHigher: 'Sys must be higher than Dia.', copyError: 'Copy failed.' },
    share: {
      title: 'Choose sending option',
      email: 'Default Email App',
      gmail: 'Gmail (Web)',
      outlook: 'Outlook (Web)',
      copy: 'Copy to Clipboard',
      download: 'Download Only',
      info: 'Note: For Gmail/Outlook, you must attach the downloaded file manually. Use "Copy to Clipboard" for quick text sharing.',
      copySuccess: 'Backup data copied to clipboard!',
      preparing: 'Preparing for sending...',
      backupSubject: 'VitalLog Backup',
      backupBody: 'Attached is my backup. Please attach the file manually.'
    }
  },
  fr: {
    header: { pat: 'PAT.', geb: 'NÉ(E)', akt: 'DATE', namePlaceholder: 'Nom Prénom', datePlaceholder: 'JJ.MM.AAAA' },
    times: { Morgens: 'Matin', Mittags: 'Midi', Abends: 'Soir', Nacht: 'Nuit' },
    actions: { save: 'ENREGISTRER', quickExp: 'EXP RAPIDE', table: 'TABLEAU', list: 'LISTE', chart: 'GRAPHE', deleteAll: 'TOUT EFFACER', export: 'EXPORT', waiting: 'Attente...', setToToday: 'Régler à aujourd\'hui' },
    export: { png: 'Image PNG', odf: 'ODF (*.ods Format)', pdf: 'PDF (A4 Impression)', title: 'Choisir Format', pdfDesc: 'Enregistrer en PDF', pngDesc: 'Enregistrer en image', odfDesc: 'Pour LibreOffice / Excel', filename: 'RapportVital', patient: 'Patient', shareText: 'Analyse vitale de' },
    security: {
      title: 'DONNÉES & SÉCURITÉ',
      infoTitle: 'Avis important',
      infoText: 'Vos données sont stockées localement. Aucune donnée n\'est envoyée aux serveurs. Sans sauvegarde, les données seront perdues si vous effacez l\'historique.',
      backup: 'SAUVEGARDER (EXPORT)',
      import: 'CHARGER (FICHIER)',
      share: 'PARTAGER',
      backupFilename: 'VitalLog_Sauvegarde'
    },
    stats: {
      title: 'RÉSUMÉ & ANALYSE',
      avgRR: 'Ø Tension Artérielle',
      avgBZ: 'Ø Glycémie',
      hba1c: 'HbA1c estimée',
      period: 'Période Totale'
    },
    confirm: {
      deleteAllMsg: 'ATTENTION : Cela supprimera irrévocablement TOUTES les mesures enregistrées ainsi que votre nom et date de naissance de cet appareil !',
      deleteDayTitle: 'Supprimer le jour',
      deleteDayMsg: 'Voulez-vous vraiment supprimer toutes les données de ce jour ?',
      deleteMultiTitle: 'Supprimer la sélection',
      deleteMultiMsg: 'Voulez-vous vraiment supprimer toutes les données des jours sélectionnés ?',
      deleteEntryTitle: 'Supprimer l\'entrée',
      deleteEntryMsg: 'Voulez-vous vraiment supprimer cette mesure individuelle ?',
      deleteConfirmTitle: 'Confirmer la suppression',
      deleteConfirmMsg: 'Cette entrée de tableau doit-elle être supprimée irrévocablement ?',
      deleteBulkTitle: 'Suppression en masse',
      deleteBulkMsg: 'Voulez-vous vraiment supprimer les entrées marquées ?'
    },
    manual: { title: 'Mode d\'emploi', subtitle: 'Langage simple' },
    notifications: { saved: 'Enregistré', errorDate: 'Date invalide', errorEmpty: 'Aucune valeur', importSuccess: 'Import réussi', exportRunning: 'Export en cours...', resetSuccess: 'Toutes les données ont été réinitialisées.', exportError: 'Erreur : Module graphique non prêt.', invalidFile: 'Fichier invalide', sysHigher: 'La Sys doit être supérieure à la Dia.', copyError: 'Échec de la copie.' },
    share: {
      title: 'Choisir l\'option d\'envoi',
      email: 'App E-mail par défaut',
      gmail: 'Gmail (Web)',
      outlook: 'Outlook (Web)',
      copy: 'Copier dans le presse-papiers',
      download: 'Téléchargement uniquement',
      info: 'Note: Pour Gmail/Outlook, vous devez joindre le fichier manuellement. Utilisez "Copier dans le presse-papiers" pour un envoi rapide.',
      copySuccess: 'Données de sauvegarde copiées !',
      preparing: 'Préparation de l\'envoi...',
      backupSubject: 'Sauvegarde VitalLog',
      backupBody: 'Voici ma sauvegarde. Veuillez joindre le fichier manuellement.'
    }
  },
  es: {
    header: { pat: 'PAT.', geb: 'NAC.', akt: 'FECHA', namePlaceholder: 'Nombre Apellido', datePlaceholder: 'DD.MM.AAAA' },
    times: { Morgens: 'Mañana', Mittags: 'Mediodía', Abends: 'Tarde', Nacht: 'Noche' },
    actions: { save: 'GUARDAR', quickExp: 'EXP RÁPIDO', table: 'TABLA', list: 'LISTA', chart: 'GRÁFICO', deleteAll: 'BORRAR TODO', export: 'EXPORT', waiting: 'Esperando...', setToToday: 'Establecer a hoy' },
    export: { png: 'Imagen PNG', odf: 'ODF (*.ods Format)', pdf: 'PDF (A4 Impression)', title: 'Elegir Format', pdfDesc: 'Guardar como PDF', pngDesc: 'Guardar como imagen', odfDesc: 'Para LibreOffice / Excel', filename: 'InformeVital', patient: 'Paciente', shareText: 'Análisis vital de' },
    security: {
      title: 'DATOS Y SEGURIDAD',
      infoTitle: 'Aviso importante',
      infoText: 'Sus datos se guardan localmente. No se envían datos a servidores. Sin copia de seguridad, los datos se perderán si borra el historial.',
      backup: 'GUARDAR COPIA (EXPORT)',
      import: 'CARGAR COPIA (ARCHIVO)',
      share: 'COMPARTIR',
      backupFilename: 'VitalLog_Copia'
    },
    stats: {
      title: 'RESUMEN Y ANÁLISIS',
      avgRR: 'Ø Presión Arterial',
      avgBZ: 'Ø Glucosa en Sangre',
      hba1c: 'HbA1c estimada',
      period: 'Período Total'
    },
    confirm: {
      deleteAllMsg: 'ATENCIÓN: ¡Esto eliminará irrevocablemente TODAS las mediciones guardadas, así como su nombre y fecha de nacimiento de este dispositivo!',
      deleteDayTitle: 'Eliminar día',
      deleteDayMsg: '¿Realmente desea eliminar todos los datos de este día?',
      deleteMultiTitle: 'Eliminar selección',
      deleteMultiMsg: '¿Realmente desea eliminar todos los datos de los días seleccionados?',
      deleteEntryTitle: 'Eliminar entrada',
      deleteEntryMsg: '¿Realmente desea eliminar esta medición individual?',
      deleteConfirmTitle: 'Confirmar eliminación',
      deleteConfirmMsg: '¿Debe eliminarse irrevocablemente esta entrada de la tabla?',
      deleteBulkTitle: 'Eliminación masiva',
      deleteBulkMsg: '¿Realmente desea eliminar las entradas marcadas?'
    },
    manual: { title: 'Manual de usuario', subtitle: 'Lenguaje sencillo' },
    notifications: { saved: 'Guardado', errorDate: 'Fecha inválida', errorEmpty: 'Sin valores', importSuccess: 'Importación exitosa', exportRunning: 'Exportando...', resetSuccess: 'Todos los datos han sido restablecidos.', exportError: 'Error: Módulo de gráficos no listo.', invalidFile: 'Archivo inválido', sysHigher: 'La Sys debe ser mayor que la Dia.', copyError: 'Error al copiar.' },
    share: {
      title: 'Elegir opción de envío',
      email: 'App de Correo predeterminada',
      gmail: 'Gmail (Web)',
      outlook: 'Outlook (Web)',
      copy: 'Copiar al portapapeles',
      download: 'Solo Descargar',
      info: 'Nota: Para Gmail/Outlook, debe adjuntar el archivo manualmente. Use "Copiar al portapapeles" para envío rápido.',
      copySuccess: '¡Datos de copia de seguridad copiados!',
      preparing: 'Preparando envío...',
      backupSubject: 'Copia de seguridad VitalLog',
      backupBody: 'Adjunto mi copia de seguridad. Por favor, adjunte el archivo manualmente.'
    }
  },
  tr: {
    header: { pat: 'HASTA', geb: 'DOĞUM', akt: 'TARİH', namePlaceholder: 'Ad Soyad', datePlaceholder: 'GG.AA.YYYY' },
    times: { Morgens: 'Sabah', Mittags: 'Öğle', Abends: 'Akşam', Nacht: 'Gece' },
    actions: { save: 'KAYDET', quickExp: 'HIZLI-DIŞA', table: 'TABLO', list: 'LİSTE', chart: 'GRAFİK', deleteAll: 'HEPSİNİ SİL', export: 'EXPORT', waiting: 'Bekleniyor...', setToToday: 'Bugüne ayarla' },
    export: { png: 'PNG Resim', odf: 'ODF (*.ods Format)', pdf: 'PDF (A4 Baskı)', title: 'Format Seçin', pdfDesc: 'PDF olarak kaydet', pngDesc: 'Resim olarak kaydet', odfDesc: 'LibreOffice / Excel için', filename: 'VitalRapor', patient: 'Hasta', shareText: 'Vital analizi:' },
    security: {
      title: 'VERİ VE GÜVENLİK',
      infoTitle: 'Önemli Not',
      infoText: 'Verileriniz yerel olarak saklanır. Sunuculara veri gönderilmez. Yedekleme yapmazsanız, tarayıcı geçmişini sildiğinizde verileriniz kaybolur.',
      backup: 'VERİLERİ YEDEKLE',
      import: 'YEDEKLEME YÜKLE (DOSYA)',
      share: 'PAYLAŞ',
      backupFilename: 'VitalLog_Yedek'
    },
    stats: {
      title: 'ÖZET VE ANALİZ',
      avgRR: 'Ø Kan Basıncı',
      avgBZ: 'Ø Kan Şekeri',
      hba1c: 'Tahmini HbA1c',
      period: 'Tüm Dönem'
    },
    confirm: {
      deleteAllMsg: 'DİKKAT: Bu işlem, kaydedilen TÜM ölçümleri, adınızı ve doğum tarihinizi bu cihazdan geri dönülemez şekilde silecektir!',
      deleteDayTitle: 'Günü Sil',
      deleteDayMsg: 'Bu güne ait tüm verileri gerçekten silmek istiyor musunuz?',
      deleteMultiTitle: 'Seçimi Sil',
      deleteMultiMsg: 'Seçilen günlere ait tüm verileri gerçekten silmek istiyor musunuz?',
      deleteEntryTitle: 'Girdiyi Sil',
      deleteEntryMsg: 'Bu bireysel ölçüm gerçekten kaldırılsın mı?',
      deleteConfirmTitle: 'Silmeyi Onayla',
      deleteConfirmMsg: 'Bu tablo girişi geri dönülemez şekilde silinsin mi?',
      deleteBulkTitle: 'Toplu Silme',
      deleteBulkMsg: 'İşaretli girişleri gerçekten silmek istiyor musunuz?'
    },
    manual: { title: 'Kullanım Kılavuzu', subtitle: 'Kolay Anlatım' },
    notifications: { saved: 'Kaydedildi', errorDate: 'Geçersiz tarih', errorEmpty: 'Değer yok', importSuccess: 'İçe aktarma başarılı', exportRunning: 'Dışa aktarılıyor...', resetSuccess: 'Tüm veriler sıfırlandı.', exportError: 'Hata: Grafik modülü hazır değil.', invalidFile: 'Geçersiz dosya', sysHigher: 'Sistolik değer Diyastolik değerden yüksek olmalıdır.', copyError: 'Kopyalama başarısız.' },
    share: {
      title: 'Gönderim seçeneği seçin',
      email: 'Varsayılan E-posta Uygulaması',
      gmail: 'Gmail (Web)',
      outlook: 'Outlook (Web)',
      copy: 'Panoya Kopyala',
      download: 'Sadece İndir',
      info: 'Not: Gmail/Outlook için dosyayı manuel olarak eklemelisiniz. Hızlı metin gönderimi için "Panoya Kopyala"yı kullanın.',
      copySuccess: 'Yedekleme verileri panoya kopyalandı!',
      preparing: 'Gönderim hazırlanıyor...',
      backupSubject: 'VitalLog Yedeği',
      backupBody: 'Yedeğim ektedir. Lütfen dosyayı manuel olarak ekleyin.'
    }
  },
  ar: {
    header: { pat: 'المريض', geb: 'الميلاد', akt: 'التاريخ', namePlaceholder: 'الاسم الكامل', datePlaceholder: 'YYYY.MM.DD' },
    times: { Morgens: 'صباح', Mittags: 'ظهر', Abends: 'مساء', Nacht: 'ليل' },
    actions: { save: 'حفظ', quickExp: 'تصدير سريع', table: 'جدول', list: 'قائمة', chart: 'رسم بياني', deleteAll: 'حذف الكل', export: 'EXPORT', waiting: 'انتظار...', setToToday: 'الضبط على اليوم' },
    export: { png: 'صورة PNG', odf: 'ODF (*.ods Format)', pdf: 'PDF (A4 طباعة)', title: 'اختر التنسيق', pdfDesc: 'حفظ كـ PDF', pngDesc: 'حفظ كصورة', odfDesc: 'لـ LibreOffice / Excel', filename: 'تقرير_حيوي', patient: 'مريض', shareText: 'التحليل الحيوي لـ' },
    security: {
      title: 'البيانات والأمان',
      infoTitle: 'ملاحظة مهمة',
      infoText: 'يتم تخزين بياناتك محلياً. لا يتم إرسال أي بيانات إلى الخوادم. بدون نسخة احتياطية، ستفقد بياناتك عند مسح سجل المتصفح.',
      backup: 'نسخ احتياطي',
      import: 'تحميل نسخة (ملف)',
      share: 'مشاركة',
      backupFilename: 'نسخة_VitalLog'
    },
    stats: {
      title: 'الملخص والتحليل',
      avgRR: 'Ø ضغط الدم',
      avgBZ: 'Ø سكر الدم',
      hba1c: 'HbA1c التقديري',
      period: 'الفترة الإجمالية'
    },
    confirm: {
      deleteAllMsg: 'تنبيه: سيؤدي هذا إلى حذف جميع القياسات المحفوظة بالإضافة إلى اسمك وتاريخ ميلادك من هذا الجهاز بشكل نهائي!',
      deleteDayTitle: 'حذف اليوم',
      deleteDayMsg: 'هل تريد حقًا حذف جميع البيانات لهذا اليوم؟',
      deleteMultiTitle: 'حذف المحدد',
      deleteMultiMsg: 'هل تريد حقًا حذف جميع البيانات للأيام المختارة؟',
      deleteEntryTitle: 'حذف القيد',
      deleteEntryMsg: 'هل تريد حقًا إزالة هذا القياس الفردي؟',
      deleteConfirmTitle: 'تأكيد الحذف',
      deleteConfirmMsg: 'هل يجب حذف هذا القيد من الجدول بشكل نهائي؟',
      deleteBulkTitle: 'حذف جماعي',
      deleteBulkMsg: 'هل تريد حقًا حذف القيود المحددة؟'
    },
    manual: { title: 'دليل المستخدم', subtitle: 'لغة بسيطة' },
    notifications: { saved: 'تم الحفظ', errorDate: 'التاريخ غير صالح', errorEmpty: 'لا توجد قيم', importSuccess: 'تم التحميل بنجاح', exportRunning: 'جاري التصدير...', resetSuccess: 'تم إعادة تعيين جميع البيانات.', exportError: 'خطأ: وحدة الرسومات غير جاهزة.', invalidFile: 'ملف غير صالح', sysHigher: 'يجب أن يكون الضغط الانقباضي أعلى من الانبساطي.', copyError: 'فشل النسخ.' },
    share: {
      title: 'اختر خيار الإرسال',
      email: 'تطبيق البريد الافتراضي',
      gmail: 'Gmail (ويب)',
      outlook: 'Outlook (ويب)',
      copy: 'نسخ إلى الحافظة',
      download: 'تحميل فقط',
      info: 'ملاحظة: بالنسبة لـ Gmail/Outlook، يجب إرفاق الملف يدوياً. استخدم "نسخ إلى الحافظة" للإرسال السريع.',
      copySuccess: 'تم نسخ بيانات النسخ الاحتياطي!',
      preparing: 'جاري التحضير للإرسال...',
      backupSubject: 'نسخة احتياطية VitalLog',
      backupBody: 'مرفق نسختي الاحتياطية. يرجى إرفاق الملف يدوياً.'
    }
  }
};
