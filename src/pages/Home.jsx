import heroArtwork from '../assets/asset mcg.jpg'

export default function Home() {
  return (
    <>
      <section className="hero-section" id="home">
        <img className="hero-artwork" src={heroArtwork} alt="Magic Chess GoGo" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">MAGIC CHESS GOGO</p>
          <h1>Naik Rank.<br /><span>Menang Lebih Cepat.</span></h1>
          <p className="hero-description">Jasa joki Magic Chess GoGo dengan proses aman, cepat, dan transparan.</p>
          <a className="hero-cta" href="#services">Lihat Layanan</a>
        </div>
      </section>
      <section className="page" id="services"><h1>Services</h1><p>Layanan joki akan ditambahkan di tahap berikutnya.</p></section>
      <section className="page" id="proof"><h1>Proof</h1><p>Gallery bukti akan ditambahkan di tahap berikutnya.</p></section>
      <section className="page" id="faq"><h1>FAQ</h1><p>FAQ akan ditambahkan di tahap berikutnya.</p></section>
    </>
  )
}
