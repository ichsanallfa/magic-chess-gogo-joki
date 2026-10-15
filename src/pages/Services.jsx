import { whatsappNumber } from '../contact.js'

const services = [
  {
    number: '01',
    title: 'Joki Rank',
    description: 'Serahkan progres akunmu kepada joki untuk mengejar rank tujuan dengan alur pengerjaan yang disesuaikan dari posisi akun saat ini.',
    detail: 'Sertakan rank sekarang, bintang, dan target rank saat menghubungi kami.',
    message: 'Halo, saya tertarik dengan layanan Joki Rank. Rank saat ini: ... Target rank: ...',
  },
  {
    number: '02',
    title: 'Joki Bintang',
    description: 'Tambah progres bintang secara bertahap sesuai target yang kamu tentukan, baik untuk melanjutkan progres maupun mengejar batas tertentu.',
    detail: 'Sampaikan tier, jumlah bintang sekarang, dan target bintangmu.',
    message: 'Halo, saya tertarik dengan layanan Joki Bintang. Bintang saat ini: ... Target bintang: ...',
  },
  {
    number: '03',
    title: 'Joki + Request Hero',
    description: 'Ajukan hero pilihan saat proses joki berlangsung. Request akan diupayakan sesuai ketersediaan hero dan kondisi permainan.',
    detail: 'Tuliskan hero pilihanmu saat menghubungi kami; request mengikuti ketersediaan di game.',
    message: 'Halo, saya tertarik dengan layanan Joki + Request Hero. Hero yang saya request: ...',
  },
]

export default function Services() {
  return (
    <section className="page services-section" id="services">
      <div className="services-heading">
        <p className="eyebrow">LAYANAN / MAGIC CHESS GOGO</p>
        <h1>Bermain untuk<br />target berikutnya.</h1>
        <p className="services-intro">
          Pilih jenis bantuan yang kamu butuhkan. Detail target bisa dibicarakan
          sebelum joki dimulai.
        </p>
        <span className="services-count">03 LAYANAN TERSEDIA</span>
      </div>
      <div className="service-list">
        {services.map((service) => (
          <a
            className="service-item"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(service.message)}`}
            key={service.number}
            target="_blank"
            rel="noreferrer"
            aria-label={`Hubungi WhatsApp untuk ${service.title}`}
          >
            <span className="service-number">{service.number}</span>
            <div className="service-copy">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <span className="service-detail">{service.detail}</span>
            </div>
            <span className="service-mark" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}
