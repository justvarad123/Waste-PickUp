import React, { useState, useRef } from 'react';
import { Upload, Camera, Sparkles, Image as ImageIcon, CheckCircle2, ArrowRight } from 'lucide-react';
import { SAMPLE_ITEMS, SampleItemPreset } from '../data/sampleItems';

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
  const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      setSelectedFilePreview(result);
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
    <div className="w-full">
      {/* Hero Headline & Value Proposition */}
      <div className="text-center max-w-3xl mx-auto pt-6 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Jath (जत), Sangli • Doorstep Waste & Kabaad Pickup Platform</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Sell / Dispose Anything
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Got old appliances, electronics, newspaper (raddi), scrap metal, mattresses, or renovation rubble in Jath?
          <span className="font-semibold text-slate-800"> Snap a photo</span> — our AI appraiser identifies the item and offers 4 instant routes: <span className="text-emerald-700 font-semibold">Sell</span>, <span className="text-teal-700 font-semibold">Recycle</span>, <span className="text-blue-700 font-semibold">Donate</span>, or <span className="text-slate-700 font-semibold">Dispose</span> with doorstep collection in Sangli district.
        </p>

        {/* Workflow Diagram Banner */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1 font-semibold text-slate-900">
            📷 1. Upload Photo
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="flex items-center gap-1 font-semibold text-slate-900">
            ⚡ 2. AI Identification
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="flex items-center gap-1 font-semibold text-emerald-700">
            Choose Route (Sell / Recycle / Donate / Dispose)
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="flex items-center gap-1 font-semibold text-slate-900">
            🚛 3. Doorstep Pickup & Payout
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
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-10 transition-all text-center bg-white ${
            dragActive
              ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
              : 'border-slate-300 hover:border-slate-400'
          } ${isAnalyzing ? 'pointer-events-none opacity-80' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            id="file-upload-input"
            onChange={handleFileInputChange}
          />

          {isAnalyzing ? (
            <div className="py-8 flex flex-col items-center justify-center">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping opacity-25" />
                <div className="w-16 h-16 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                AI Appraiser Analyzing Item...
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm">
                Identifying materials, evaluating condition, calculating scrap/resale value, and matching certified collectors.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Powered by Gemini Multimodal Vision</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-16 h-16 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-200">
                <Upload className="w-8 h-8 text-slate-700" />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Upload or Take a Photo of Any Item
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                Drag and drop your photo here, take a quick snapshot with your camera, or browse your files.
              </p>

              {/* Upload Buttons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  id="browse-file-btn"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-xs transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                  Browse Photo
                </button>

                <button
                  id="open-camera-btn"
                  type="button"
                  onClick={onOpenCamera}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  Use Camera
                </button>
              </div>

              {/* Optional details input */}
              <div className="mt-6 pt-5 border-t border-slate-100 max-w-md mx-auto text-left">
                <label
                  htmlFor="item-hint-input"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Optional Details or Brand / Condition Note
                </label>
                <div className="flex gap-2">
                  <input
                    id="item-hint-input"
                    type="text"
                    value={itemHint}
                    onChange={(e) => setItemHint(e.target.value)}
                    placeholder="e.g. Whirlpool 2019, motor hums, queen size, clean"
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Test Samples */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Or Test With Realistic Sample Items:
            </span>
            <span className="text-xs text-slate-400">Click to instantly classify</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {SAMPLE_ITEMS.map((sample) => (
              <button
                key={sample.id}
                id={`sample-preset-${sample.id}-btn`}
                type="button"
                onClick={() => onSelectPreset(sample)}
                className="group p-2.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-xs text-left transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-slate-100">
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 text-base">
                    {sample.emoji}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-700">
                    {sample.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {sample.tag}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
