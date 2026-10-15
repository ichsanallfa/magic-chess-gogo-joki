import { useState } from 'react'
import { whatsappNumber } from '../contact.js'

const rankLevels = [
  ...['II', 'I'].map((division, index) => ({
    label: `Warrior ${division}`,
    start: index * 9,
    minStars: 0,
    maxStars: 8,
  })),
  ...['III', 'II', 'I'].map((division, index) => ({
    label: `Elite ${division}`,
    start: 18 + index * 9,
    minStars: 0,
    maxStars: 8,
  })),
  ...['IV', 'III', 'II', 'I'].map((division, index) => ({
    label: `Master ${division}`,
    start: 45 + index * 9,
    minStars: 0,
    maxStars: 8,
  })),
  ...['VII', 'VI', 'V', 'IV', 'III', 'II', 'I'].map((division, index) => ({
    label: `Grandmaster ${division}`,
    start: 81 + index * 9,
    minStars: 0,
    maxStars: 8,
  })),
  ...['IX', 'VIII', 'VII', 'VI', 'V', 'IV', 'III', 'II', 'I'].map(
    (division, index) => ({
      label: `Epic ${division}`,
      start: 144 + index * 9,
      minStars: 0,
      maxStars: 8,
    }),
  ),
  ...['X', 'IX', 'VIII', 'VII', 'VI', 'V', 'IV', 'III', 'II', 'I'].map(
    (division, index) => ({
      label: `Legend ${division}`,
      start: 225 + index * 9,
      minStars: 0,
      maxStars: 8,
    }),
  ),
  { label: 'Mythic', start: 315, minStars: 0, maxStars: 99 },
  { label: 'Honor', start: 315, minStars: 100, maxStars: 199 },
  { label: 'Glory', start: 315, minStars: 200, maxStars: 399 },
  { label: 'Immortal', start: 315, minStars: 400, maxStars: 10000 },
]

const services = [
  {
    id: 'rank',
    title: 'Joki',
    description: 'Pilih rank dan bintang saat ini, lalu tentukan target kenaikan.',
  },
  {
    id: 'full-grading',
    title: 'Grading Mythic',
    description: 'Paket 10 game untuk membantu membuka bintang Mythic.',
  },
]

const tierRates = [
  { start: 0, rate: 1000 },
  { start: 18, rate: 1000 },
  { start: 45, rate: 1000 },
  { start: 81, rate: 1000 },
  { start: 144, rate: 1000 },
  { start: 225, rate: 1500 },
  { start: 315, rate: 2000 },
  { start: 415, rate: 2500 },
  { start: 515, rate: 3000 },
  { start: 715, rate: 3500 },
]

const formatRupiah = (amount) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)

const getRank = (label) => rankLevels.find((rank) => rank.label === label)

const getProgress = (rank, stars) => rank.start + stars

const getJokiCost = (start, end) =>
  tierRates.reduce((total, tier, index) => {
    const nextTierStart = tierRates[index + 1]?.start ?? Infinity
    const starsInTier = Math.max(
      0,
      Math.min(end, nextTierStart) - Math.max(start, tier.start),
    )
    return total + starsInTier * tier.rate
  }, 0)

const getStarHelp = (rank) =>
  rank.minStars === 0 && rank.maxStars === 8
    ? '0–8 bintang pada tahap ini; 9 bintang untuk naik tahap.'
    : `Masukkan jumlah bintang total (${rank.minStars}–${rank.maxStars}).`

export default function Calculator() {
  const [service, setService] = useState('rank')
  const [startRankLabel, setStartRankLabel] = useState('Warrior II')
  const [startStars, setStartStars] = useState('0')
  const [targetRankLabel, setTargetRankLabel] = useState('Warrior I')
  const [targetStars, setTargetStars] = useState('0')

  const startRank = getRank(startRankLabel)
  const targetRank = getRank(targetRankLabel)
  const currentStars = Number(startStars)
  const desiredStars = Number(targetStars)
  const isFullGrading = service === 'full-grading'
  const validStart =
    startStars.trim() !== '' &&
    Number.isSafeInteger(currentStars) &&
    currentStars >= startRank.minStars &&
    currentStars <= startRank.maxStars
  const validTarget =
    targetStars.trim() !== '' &&
    Number.isSafeInteger(desiredStars) &&
    desiredStars >= targetRank.minStars &&
    desiredStars <= targetRank.maxStars
  const startProgress = validStart ? getProgress(startRank, currentStars) : null
  const targetProgress = validTarget ? getProgress(targetRank, desiredStars) : null
  const isForwardTarget =
    startProgress !== null &&
    targetProgress !== null &&
    targetProgress > startProgress
  const total = isFullGrading
    ? 100000
    : isForwardTarget
      ? getJokiCost(startProgress, targetProgress)
      : null
  const message = isFullGrading
    ? `Halo, saya ingin tanya Grading Mythic (10 game). Estimasi: ${formatRupiah(total)}.`
    : `Halo, saya ingin tanya Joki dari ${startRankLabel} ${startStars} bintang ke ${targetRankLabel} ${targetStars} bintang. Estimasi: ${formatRupiah(total)}.`
  const updateRank = (rankLabel, setRankLabel, setStars) => {
    const nextRank = getRank(rankLabel)
    setRankLabel(rankLabel)
    setStars(String(nextRank.minStars))
  }

  return (
    <section className="calculator-section" id="calculator">
      <header className="calculator-heading">
        <p className="eyebrow">KALKULATOR / MAGIC CHESS GOGO</p>
        <h1>Rencanakan<br />target joki.</h1>
        <p>
          Masukkan posisi akunmu sekarang dan tujuan yang ingin dicapai. Estimasi
          biaya akan menyesuaikan tier serta jumlah bintang yang perlu ditempuh.
        </p>
      </header>
      <div className="calculator-panel">
        <div className="calculator-panel-heading">
          <span className="calculator-step">01</span>
          <div>
            <h2>Pilih layanan</h2>
            <p>Tentukan jenis bantuan yang paling sesuai dengan targetmu.</p>
          </div>
        </div>
        <div className="calculator-service-options" role="group" aria-label="Pilih layanan">
          {services.map((option) => (
            <button
              className={`calculator-service-option${service === option.id ? ' selected' : ''}`}
              type="button"
              key={option.id}
              aria-pressed={service === option.id}
              onClick={() => setService(option.id)}
            >
              <span className="calculator-option-title">{option.title}</span>
              <span className="calculator-option-description">{option.description}</span>
            </button>
          ))}
        </div>

        {isFullGrading ? (
          <div className="calculator-note">
            <strong>Termasuk dalam paket</strong>
            <span>10 game untuk membantu membuka bintang Mythic. Harga paket tetap Rp100.000.</span>
          </div>
        ) : (
          <>
            <div className="calculator-panel-heading calculator-target-heading">
              <span className="calculator-step">02</span>
              <div>
                <h2>Tentukan perjalanan rank</h2>
                <p>Masukkan rank dan bintang awal serta target yang ingin dicapai.</p>
              </div>
            </div>
            <div className="calculator-rank-row">
              <label className="calculator-field">
                <span>Rank sekarang</span>
                <select
                  value={startRankLabel}
                  onChange={(event) =>
                    updateRank(event.target.value, setStartRankLabel, setStartStars)
                  }
                >
                  {rankLevels.map(({ label }) => (
                    <option key={label} value={label}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="calculator-field">
                <span>Bintang sekarang</span>
                <input
                  type="number"
                  min={startRank.minStars}
                  max={startRank.maxStars}
                  step="1"
                  inputMode="numeric"
                  value={startStars}
                  onChange={(event) => setStartStars(event.target.value)}
                />
                <small>{getStarHelp(startRank)}</small>
              </label>
            </div>
            <div className="calculator-rank-row">
              <label className="calculator-field">
                <span>Target rank</span>
                <select
                  value={targetRankLabel}
                  onChange={(event) =>
                    updateRank(event.target.value, setTargetRankLabel, setTargetStars)
                  }
                >
                  {rankLevels.map(({ label }) => (
                    <option key={label} value={label}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="calculator-field">
                <span>Bintang target</span>
                <input
                  type="number"
                  min={targetRank.minStars}
                  max={targetRank.maxStars}
                  step="1"
                  inputMode="numeric"
                  value={targetStars}
                  onChange={(event) => setTargetStars(event.target.value)}
                />
                <small>{getStarHelp(targetRank)}</small>
              </label>
            </div>
            <p className="calculator-pricing-info">
              Tarif dihitung berdasarkan setiap bintang yang ditempuh di tier terkait.
              Kenaikan tahap Warrior hingga Legend membutuhkan 9 bintang.
            </p>
            {!isForwardTarget && validStart && validTarget && (
              <p className="calculator-error">
                Target harus lebih tinggi dari rank dan bintang saat ini.
              </p>
            )}
          </>
        )}

        <div className="calculator-total" aria-live="polite">
          <span>Estimasi biaya</span>
          <strong>{total === null ? 'Periksa rank dan bintang' : formatRupiah(total)}</strong>
        </div>
        <a
          className={`calculator-contact${total === null ? ' disabled' : ''}`}
          href={total === null ? undefined : `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noreferrer"
          aria-disabled={total === null}
          onClick={(event) => {
            if (total === null) event.preventDefault()
          }}
        >
          Konfirmasi via WhatsApp
        </a>
        <p className="calculator-disclaimer">
          Estimasi dapat berubah setelah tier, target, dan kondisi akun dikonfirmasi.
        </p>
      </div>
    </section>
  )
}
