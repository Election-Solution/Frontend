'use client'

import { useState, useRef } from 'react'
import Navbar from '@/components/Navbar'
import { nigerianStates } from '@/lib/mockData'
import {
  AlertTriangle, Upload, CheckCircle, X, Shield, MapPin, ChevronDown
} from 'lucide-react'

const incidentTypes = [
  { id: 'missing-materials', label: 'Missing Materials', desc: 'Ballots, stamps, or electoral materials absent', icon: '📦', color: 'border-amber-400' },
  { id: 'delayed-staff', label: 'Delayed Staff', desc: 'INEC officials have not arrived or are missing', icon: '🕐', color: 'border-blue-400' },
  { id: 'security-threat', label: 'Security Threat', desc: 'Armed actors, ballot box snatching, violence', icon: '🚨', color: 'border-ng-red' },
  { id: 'voter-suppression', label: 'Voter Suppression', desc: 'Voters being turned away or intimidated', icon: '🚫', color: 'border-ng-red' },
]

const lgasByState: Record<string, string[]> = {
  'Lagos': ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'],
  'Kano': ['Dala', 'Fagge', 'Gwale', 'Kano Municipal', 'Nassarawa', 'Tarauni', 'Ungogo'],
  'Rivers': ['Bonny', 'Degema', 'Eleme', 'Ikwerre', 'Obio-Akpor', 'Port Harcourt'],
  'Abuja (FCT)': ['Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council'],
}

const defaultLGAs = ['Central LGA', 'North LGA', 'South LGA', 'East LGA', 'West LGA']

interface FormFile {
  name: string
  size: number
  type: string
  preview?: string
}

export default function ReportPage() {
  const [selectedType, setSelectedType] = useState('')
  const [state, setState] = useState('')
  const [lga, setLga] = useState('')
  const [ward, setWard] = useState('')
  const [pu, setPu] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<FormFile[]>([])
  const [dragging, setDragging] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const lgas = state && lgasByState[state] ? lgasByState[state] : defaultLGAs

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const dropped = Array.from(e.dataTransfer.files).slice(0, 5)
    const mapped: FormFile[] = dropped.map(f => ({ name: f.name, size: f.size, type: f.type }))
    setFiles(prev => [...prev, ...mapped].slice(0, 5))
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const picked = Array.from(e.target.files).slice(0, 5)
    const mapped: FormFile[] = picked.map(f => ({ name: f.name, size: f.size, type: f.type }))
    setFiles(prev => [...prev, ...mapped].slice(0, 5))
  }

  const removeFile = (i: number) => setFiles(prev => prev.filter((_, idx) => idx !== i))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1800))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-ng-green border-2 border-ng-dark shadow-brutal mx-auto mb-6 flex items-center justify-center">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h2 className="font-display text-3xl font-800 text-ng-dark mb-3">Report Submitted</h2>
            <p className="font-body text-gray-600 mb-2">Your report has been received and is being triaged.</p>
            <div className="bg-ng-green border-2 border-ng-dark shadow-brutal p-4 mb-8 text-white">
              <span className="font-display font-700 text-lg">Reference: WD-{String(Math.floor(Math.random() * 900) + 100)}</span>
              <p className="font-body text-xs mt-1 opacity-80">Save this for follow-up</p>
            </div>
            <p className="font-body text-sm text-gray-500 mb-6">
              Critical incidents are escalated to response teams within{' '}
              <strong className="text-ng-dark">5 minutes</strong>.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setSubmitted(false)}
                className="bg-white border-2 border-ng-dark shadow-brutal px-6 py-3 font-display font-700 text-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all"
              >
                Submit Another
              </button>
              <a
                href="/map"
                className="bg-ng-dark text-white border-2 border-ng-dark shadow-brutal px-6 py-3 font-display font-700 text-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all"
              >
                View Live Map
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 diagonal-bg">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-8 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-ng-red border-2 border-ng-dark px-3 py-1 mb-4 shadow-brutal-sm">
            <AlertTriangle size={14} className="text-white" />
            <span className="text-white font-display text-xs font-700 uppercase tracking-widest">Secure Report</span>
          </div>
          <h1 className="font-display text-4xl font-800 text-ng-dark leading-tight">
            Submit an<br />Incident Report.
          </h1>
          <p className="font-body text-gray-500 mt-3 text-sm">
            All reports are anonymised and encrypted. You can submit without creating an account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border-2 border-ng-dark shadow-brutal p-6 md:p-8 space-y-8 fade-in-up-delay-1">

          {/* STEP 1: Location */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 bg-ng-green border-2 border-ng-dark flex items-center justify-center">
                <span className="text-white font-display text-xs font-800">1</span>
              </div>
              <h2 className="font-display text-base font-700 text-ng-dark uppercase tracking-wider">Location</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* State */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-display font-700 uppercase tracking-wider text-ng-dark mb-1.5">State *</label>
                <div className="relative">
                  <select
                    required
                    value={state}
                    onChange={e => { setState(e.target.value); setLga('') }}
                    className="w-full border-2 border-ng-dark px-4 py-3 text-sm font-body appearance-none bg-white focus:outline-none focus:border-ng-green focus:shadow-brutal-green transition-all pr-10"
                  >
                    <option value="">Select State</option>
                    {nigerianStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* LGA */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-display font-700 uppercase tracking-wider text-ng-dark mb-1.5">LGA *</label>
                <div className="relative">
                  <select
                    required
                    value={lga}
                    onChange={e => setLga(e.target.value)}
                    className="w-full border-2 border-ng-dark px-4 py-3 text-sm font-body appearance-none bg-white focus:outline-none focus:border-ng-green focus:shadow-brutal-green transition-all pr-10"
                  >
                    <option value="">Select LGA</option>
                    {lgas.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Ward */}
              <div>
                <label className="block text-xs font-display font-700 uppercase tracking-wider text-ng-dark mb-1.5">Ward *</label>
                <div className="relative">
                  <select
                    required
                    value={ward}
                    onChange={e => setWard(e.target.value)}
                    className="w-full border-2 border-ng-dark px-4 py-3 text-sm font-body appearance-none bg-white focus:outline-none focus:border-ng-green focus:shadow-brutal-green transition-all pr-10"
                  >
                    <option value="">Select Ward</option>
                    {Array.from({ length: 12 }, (_, i) => `Ward ${i + 1}`).map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* PU */}
              <div>
                <label className="block text-xs font-display font-700 uppercase tracking-wider text-ng-dark mb-1.5">PU Number *</label>
                <div className="relative">
                  <select
                    required
                    value={pu}
                    onChange={e => setPu(e.target.value)}
                    className="w-full border-2 border-ng-dark px-4 py-3 text-sm font-body appearance-none bg-white focus:outline-none focus:border-ng-green focus:shadow-brutal-green transition-all pr-10"
                  >
                    <option value="">Select PU</option>
                    {Array.from({ length: 30 }, (_, i) => `PU-${String(i + 1).padStart(3, '0')}`).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {state && lga && (
              <div className="mt-3 flex items-center gap-2 text-xs font-body text-ng-green">
                <MapPin size={12} />
                <span>{ward || 'Select ward'}, {lga}, {state}</span>
              </div>
            )}
          </div>

          {/* STEP 2: Incident Type */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 bg-ng-green border-2 border-ng-dark flex items-center justify-center">
                <span className="text-white font-display text-xs font-800">2</span>
              </div>
              <h2 className="font-display text-base font-700 text-ng-dark uppercase tracking-wider">Incident Type *</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {incidentTypes.map(t => (
                <label
                  key={t.id}
                  className={`flex items-start gap-3 border-2 p-4 cursor-pointer transition-all duration-150
                    ${selectedType === t.id
                      ? 'border-ng-dark bg-ng-dark text-white shadow-brutal'
                      : `border-ng-dark bg-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-brutal`
                    }`}
                >
                  <input
                    type="radio"
                    name="incident-type"
                    value={t.id}
                    required
                    className="sr-only"
                    onChange={() => setSelectedType(t.id)}
                  />
                  <span className="text-2xl flex-shrink-0">{t.icon}</span>
                  <div>
                    <div className={`font-display text-sm font-700 ${selectedType === t.id ? 'text-white' : 'text-ng-dark'}`}>
                      {t.label}
                    </div>
                    <div className={`font-body text-xs mt-0.5 ${selectedType === t.id ? 'text-gray-300' : 'text-gray-500'}`}>
                      {t.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* STEP 3: Description */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 bg-ng-green border-2 border-ng-dark flex items-center justify-center">
                <span className="text-white font-display text-xs font-800">3</span>
              </div>
              <h2 className="font-display text-base font-700 text-ng-dark uppercase tracking-wider">Description *</h2>
            </div>

            <textarea
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the situation in detail. Include: What happened? When did it start? Who is involved? How many people are affected?"
              rows={5}
              className="w-full border-2 border-ng-dark px-4 py-3 text-sm font-body resize-none focus:outline-none focus:border-ng-green focus:shadow-brutal-green transition-all placeholder:text-gray-400"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs font-body text-gray-400">Minimum 50 characters recommended</span>
              <span className={`text-xs font-body ${description.length < 50 ? 'text-ng-red' : 'text-ng-green'}`}>
                {description.length} chars
              </span>
            </div>
          </div>

          {/* STEP 4: Evidence */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 bg-gray-200 border-2 border-ng-dark flex items-center justify-center">
                <span className="text-ng-dark font-display text-xs font-800">4</span>
              </div>
              <h2 className="font-display text-base font-700 text-ng-dark uppercase tracking-wider">
                Evidence
                <span className="ml-2 text-xs font-body font-400 text-gray-400 normal-case tracking-normal">Optional but recommended</span>
              </h2>
            </div>

            <div
              className={`border-2 border-dashed border-ng-dark p-8 text-center transition-colors cursor-pointer ${dragging ? 'dropzone-active' : 'hover:bg-gray-50'}`}
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={28} className="text-gray-400 mx-auto mb-3" />
              <p className="font-display text-sm font-700 text-ng-dark">Drag & drop files here</p>
              <p className="font-body text-xs text-gray-400 mt-1">or click to browse — Images & Videos (max 5 files)</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileInput}
              />
            </div>

            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 border border-ng-dark px-3 py-2">
                    <span className="font-body text-xs text-ng-dark truncate max-w-[70%]">{file.name}</span>
                    <button type="button" onClick={() => removeFile(i)}>
                      <X size={14} className="text-gray-500 hover:text-ng-red" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Security notice */}
          <div className="bg-gray-50 border-2 border-ng-dark p-4 flex items-start gap-3">
            <Shield size={16} className="text-ng-green flex-shrink-0 mt-0.5" />
            <p className="font-body text-xs text-gray-600 leading-relaxed">
              Your identity is protected. This report is encrypted and your IP address is not stored.
              Reports are reviewed by trained triage officers before any public action is taken.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-ng-green text-white font-display font-800 text-base py-5 border-2 border-ng-dark shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting Securely...
              </>
            ) : (
              <>
                <Shield size={20} />
                Submit Report Securely
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
