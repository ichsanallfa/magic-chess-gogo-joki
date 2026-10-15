import heroArtwork from '../assets/asset mcg.jpg'
import Services from './Services.jsx'
import Calculator from './Calculator.jsx'
import Proof from './Proof.jsx'

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
      <Services />
      <Calculator />
      <Proof />
      <section className="page" id="faq"><h1>FAQ</h1><p>FAQ akan ditambahkan di tahap berikutnya.</p></section>
    </>
  )
}
