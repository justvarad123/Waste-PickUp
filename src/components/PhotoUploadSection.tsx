import React, { useState, useRef } from 'react';
import { Upload, Camera, Sparkles, Image as ImageIcon, CheckCircle2, ArrowRight } from 'lucide-react';
import { SAMPLE_ITEMS, SampleItemPreset } from '../data/sampleItems';
import { Button } from './ui/Button';

interface PhotoUploadSectionProps {
  onAnalyze: (imageData: string, hint?: string) => void;
  onSelectPreset: (preset: SampleItemPreset) => void;
  isAnalyzing: boolean;
  onOpenCamera: () => void;
}

export const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({
  onAnalyze,
  onSelectPreset,
  isAnalyzing,
  onOpenCamera,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [itemHint, setItemHint] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mobileCameraInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onAnalyze(result, itemHint);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <section aria-labelledby="hero-title" className="w-full">
      {/* Hero Headline & Value Proposition */}
      <div className="text-center max-w-3xl mx-auto pt-4 sm:pt-6 pb-6 sm:pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
          <span>Jath (जत), Sangli • Doorstep Waste & Kabaad Pickup Platform</span>
        </div>
        <h1
          id="hero-title"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
        >
          Sell / Dispose Anything
        </h1>
        <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl mx-auto">
          Got old appliances, electronics, newspaper (raddi), scrap metal, mattresses, or renovation rubble in Jath?
          <span className="font-semibold text-slate-900"> Snap a photo</span> — our AI appraiser identifies the item and offers 4 instant routes:{' '}
          <strong className="text-emerald-800 font-bold">Sell</strong>,{' '}
          <strong className="text-teal-800 font-bold">Recycle</strong>,{' '}
          <strong className="text-blue-800 font-bold">Donate</strong>, or{' '}
          <strong className="text-slate-900 font-bold">Dispose</strong> with doorstep collection in Sangli district.
        </p>

        {/* Workflow Diagram Banner */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-700">
          <span className="flex items-center gap-1 font-bold text-slate-900">
            📷 1. Upload Photo
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span className="flex items-center gap-1 font-bold text-slate-900">
            ⚡ 2. AI Identification
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span className="flex items-center gap-1 font-bold text-emerald-800">
            3. Choose Route (₹ Payout)
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span className="flex items-center gap-1 font-bold text-slate-900">
            🚛 4. Doorstep Collection
          </span>
        </div>
      </div>

      {/* Main Upload Box */}
      <div className="max-w-2xl mx-auto">
        <div
          id="dropzone-area"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          aria-live="polite"
          className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-10 transition-all text-center bg-white ${
            dragActive
              ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
              : 'border-slate-300 hover:border-slate-400'
          } ${isAnalyzing ? 'pointer-events-none opacity-90' : ''}`}
        >
          {/* Hidden File Inputs */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            id="file-upload-input"
            onChange={handleFileInputChange}
          />
          {/* Mobile Camera Direct Capture Input */}
          <input
            ref={mobileCameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            id="mobile-camera-input"
            onChange={handleFileInputChange}
          />

          {isAnalyzing ? (
            <div className="py-8 flex flex-col items-center justify-center">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping opacity-25" />
                <div className="w-16 h-16 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                AI Appraiser Analyzing Item...
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-sm">
                Identifying materials, evaluating condition, calculating scrap/resale value, and matching certified collectors in Jath.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                <span>Powered by Gemini Multimodal Vision</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-16 h-16 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-slate-800" aria-hidden="true" />
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Upload or Take a Photo of Any Item
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                Drag and drop your photo here, snap a live photo with your camera, or browse your files.
              </p>

              {/* Upload Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button
                  id="browse-file-btn"
                  variant="secondary"
                  size="md"
                  onClick={() => fileInputRef.current?.click()}
                  leftIcon={<ImageIcon className="w-4 h-4" />}
                >
                  Browse Photo
                </Button>

                <Button
                  id="open-camera-btn"
                  variant="primary"
                  size="md"
                  onClick={() => {
                    // If on mobile browser with touch, invoke native camera capture or web camera modal
                    if ('ontouchstart' in window && window.innerWidth < 640) {
                      mobileCameraInputRef.current?.click();
                    } else {
                      onOpenCamera();
                    }
                  }}
                  leftIcon={<Camera className="w-4 h-4" />}
                >
                  Use Camera
                </Button>
              </div>

              {/* Optional details input */}
              <div className="mt-6 pt-5 border-t border-slate-100 max-w-md mx-auto text-left">
                <label
                  htmlFor="item-hint-input"
                  className="block text-xs font-bold text-slate-800 mb-1"
                >
                  Optional Details, Brand, or Condition Note
                </label>
                <input
                  id="item-hint-input"
                  type="text"
                  value={itemHint}
                  onChange={(e) => setItemHint(e.target.value)}
                  placeholder="e.g. Whirlpool 2019, motor hums, clean, 10kg raddi"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-white text-slate-900 placeholder:text-slate-400 min-h-[44px]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Test Samples */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Or Test With Realistic Sample Items:
            </h2>
            <span className="text-xs text-slate-500">Click to instantly classify</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {SAMPLE_ITEMS.map((sample) => (
              <button
                key={sample.id}
                id={`sample-preset-${sample.id}-btn`}
                type="button"
                onClick={() => onSelectPreset(sample)}
                aria-label={`Select sample: ${sample.name}, ${sample.tag}`}
                className="group p-2.5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-xs text-left transition-all flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden min-h-[44px]"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-2 bg-slate-100 border border-slate-100">
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 text-base" aria-hidden="true">
                    {sample.emoji}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-800">
                    {sample.name}
                  </h3>
                  <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                    {sample.tag}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
