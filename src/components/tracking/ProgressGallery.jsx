import { useState, useRef } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const STORAGE_KEY = 'nutrivie_progress_gallery';

function loadPhotos() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}
function savePhotos(photos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
}

export default function ProgressGallery() {
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState(loadPhotos);
  const [lightbox, setLightbox] = useState(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const newPhoto = {
        id: Date.now(),
        url: file_url,
        date: new Date().toLocaleDateString('fr-FR'),
        label: `Photo du ${new Date().toLocaleDateString('fr-FR')}`,
      };
      const updated = [...photos, newPhoto];
      setPhotos(updated);
      savePhotos(updated);
    } catch {
      // fallback: use local object URL (works offline)
      const url = URL.createObjectURL(file);
      const newPhoto = {
        id: Date.now(),
        url,
        date: new Date().toLocaleDateString('fr-FR'),
        label: `Photo du ${new Date().toLocaleDateString('fr-FR')}`,
      };
      const updated = [...photos, newPhoto];
      setPhotos(updated);
      savePhotos(updated);
    }
    setUploading(false);
    e.target.value = '';
  };

  const deletePhoto = (id) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    savePhotos(updated);
    if (lightbox?.id === id) setLightbox(null);
  };

  const lightboxIdx = lightbox ? photos.findIndex(p => p.id === lightbox.id) : -1;
  const prevPhoto = () => lightboxIdx > 0 && setLightbox(photos[lightboxIdx - 1]);
  const nextPhoto = () => lightboxIdx < photos.length - 1 && setLightbox(photos[lightboxIdx + 1]);

  return (
    <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
            <Camera className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <p className="font-semibold text-sm">Galerie avant / après</p>
            <p className="text-xs text-muted-foreground">Optionnel — photos de progression ({photos.length} photo{photos.length !== 1 ? 's' : ''})</p>
          </div>
        </div>
        <span className="text-muted-foreground text-lg leading-none">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-border/30 pt-4 space-y-4">
          {/* Upload */}
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full py-3 rounded-2xl border-2 border-dashed border-border hover:border-primary/40 text-sm text-muted-foreground hover:text-primary transition-all flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            {uploading ? 'Chargement...' : 'Ajouter une photo (visage, corps, bras…)'}
          </button>

          {/* Grid */}
          {photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo) => (
                <div key={photo.id} className="relative group aspect-square rounded-xl overflow-hidden bg-muted">
                  <img
                    src={photo.url}
                    alt={photo.label}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setLightbox(photo)}
                  />
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-foreground/70 text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-1.5">
                    <p className="text-xs text-primary-foreground">{photo.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-4">
              Ajoutez votre première photo pour commencer à suivre votre progression visuellement.
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            📱 Vos photos sont stockées localement sur votre appareil uniquement.
          </p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.label} className="w-full rounded-2xl max-h-[80vh] object-contain" />
            <p className="text-center text-sm text-primary-foreground mt-2">{lightbox.label}</p>
            {lightboxIdx > 0 && (
              <button onClick={prevPhoto} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {lightboxIdx < photos.length - 1 && (
              <button onClick={nextPhoto} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <button onClick={() => setLightbox(null)} className="absolute top-2 right-2 w-9 h-9 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
