'use client'

import { Suspense, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'

import { motion } from 'framer-motion'
import { Upload, FileText, X, Shield, ArrowRight, Loader2, CheckCircle, Lock } from 'lucide-react'
import { getBrandConfig } from '@/config/brands'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

type UploadState = 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error' | 'no-access'

interface UploadedFile {
  file: File
  id: string
  label: string
}

const fileLabels: Record<string, string> = {
  planilla: 'PR Tax Return (Planilla/Form 482)',
  federal: 'Federal Return (Form 1040)',
  form8938: 'Form 8938 (FATCA)',
  fbar: 'FBAR Filing Confirmation',
  decree: 'Act 60 Decree',
  transfer_pricing: 'Transfer Pricing Documentation',
  other: 'Other Supporting Documents',
}

export default function UploadPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <UploadPageContent />
    </Suspense>
  )
}

function UploadPageContent() {
  const brand = getBrandConfig()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const tier = searchParams.get('tier') ?? 'basic'
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [state, setState] = useState<UploadState>('idle')
  const [dragOver, setDragOver] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [abortController, setAbortController] = useState<AbortController | null>(null)

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return

    const validTypes = ['application/pdf', 'image/png', 'image/jpeg']
    const added: UploadedFile[] = Array.from(newFiles)
      .filter((f) => validTypes.includes(f.type) && f.size <= 25 * 1024 * 1024)
      .map((file) => ({
        file,
        id: crypto.randomUUID(),
        label: 'other',
      }))

    setFiles((prev) => [...prev, ...added])
  }, [])

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const updateLabel = (id: string, label: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, label } : f))
    )
  }

  const handleCancel = () => {
    if (abortController) {
      abortController.abort()
      setAbortController(null)
    }
    setState('idle')
  }

  const handleSubmit = async () => {
    if (files.length === 0) return

    const controller = new AbortController()
    setAbortController(controller)
    setState('uploading')
    setError(null)
    setAnalysisResult(null)

    try {
      const formData = new FormData()
      files.forEach((f) => {
        formData.append('files', f.file)
        formData.append('labels', f.label)
      })
      formData.append('brandId', brand.id)
      if (sessionId) formData.append('sessionId', sessionId)
      formData.append('tier', tier)

      setState('analyzing')

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'Analysis failed')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()
      let reportText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n\n').filter(Boolean)

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = JSON.parse(line.slice(6))

          if (data.type === 'delta') {
            reportText += data.text
            setAnalysisResult(reportText)
          } else if (data.type === 'error') {
            throw new Error(data.error)
          }
        }
      }

      setState('complete')
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setState('idle')
        return
      }
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setState('error')
    } finally {
      setAbortController(null)
    }
  }

  return (
    <>
      <Navbar brand={brand} />
      <main className="min-h-screen bg-gray-950 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Upload Your Tax Return
            </h1>
            <p className="text-gray-400">
              Securely upload your documents for AI-powered review.
              All files are encrypted and deleted after analysis.
            </p>
          </motion.div>

          {/* Streaming analysis in progress */}
          {state === 'analyzing' && analysisResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                  <h2 className="text-xl font-bold text-white">Analyzing...</h2>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors px-3 py-1 border border-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                {analysisResult}
              </div>
            </motion.div>
          )}

          {state === 'complete' && analysisResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Review Complete</h2>
              </div>
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                {analysisResult}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragOver(false)
                  handleFiles(e.dataTransfer.files)
                }}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
                  dragOver
                    ? 'border-blue-500 bg-blue-950/20'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-900/30'
                }`}
                onClick={() => {
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.multiple = true
                  input.accept = '.pdf,.png,.jpg,.jpeg'
                  input.onchange = (e) => handleFiles((e.target as HTMLInputElement).files)
                  input.click()
                }}
              >
                <Upload className="w-10 h-10 text-gray-500 mx-auto mb-4" />
                <p className="text-white font-medium mb-1">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  PDF, PNG, or JPG &bull; Max 25MB per file
                </p>
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  {files.map((f) => (
                    <div
                      key={f.id}
                      className="flex items-center gap-4 bg-gray-900/50 border border-gray-800 rounded-xl p-4"
                    >
                      <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{f.file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(f.file.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                      <select
                        value={f.label}
                        onChange={(e) => updateLabel(f.id, e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-lg px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {Object.entries(fileLabels).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFile(f.id) }}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Error */}
             {error && (
           <div className="mt-4 bg-red-950/50 border border-red-900/50 rounded-xl p-4 overflow-hidden">
             <p className="text-sm text-red-400 break-words whitespace-pre-wrap">
                {error}
            </p>
           </div>
            )}

              {/* Submit */}
              <div className="mt-8 flex flex-col items-center gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={files.length === 0 || state === 'uploading' || state === 'analyzing'}
                  className="group flex items-center gap-2 bg-accent text-navy-900 font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 hover:bg-accent-light disabled:opacity-50 disabled:hover:scale-100"
                >
                  {state === 'uploading' || state === 'analyzing' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {state === 'uploading' ? 'Uploading...' : 'Analyzing...'}
                    </>
                  ) : (
                    <>
                      Start Analysis
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield className="w-3.5 h-3.5" />
                  <span>256-bit encrypted &bull; Files deleted after review</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer brand={brand} />
    </>
  )
}
