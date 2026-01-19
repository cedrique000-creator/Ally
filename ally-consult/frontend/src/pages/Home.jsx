import { Link } from 'react-router-dom'
import Credibility from '../components/Credibility'
import Industries from '../components/Industries'
import CaseStudies from '../components/CaseStudies'
import WhyAlly from '../components/WhyAlly'
import Engagement from '../components/Engagement'
import FAQ from '../components/FAQ'

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero gradient-bg">
        <div className="container">
          <h1>Grow Your Business with Marketing That Works</h1>
          <p>Proven strategies. Clear data. Real growth.</p>

          <div className="hero-actions">
            <Link to="/book-session" className="btn btn-primary magnetic">
              Get a Free Strategy Session
            </Link>
            <Link to="/how-it-works" className="btn btn-secondary">
              See How It Works
            </Link>
          </div>

          {/* Trust signals */}
          <div className="trust-bar">
            <span>✓ 200+ Businesses Scaled</span>
            <span>✓ $50M+ Revenue Generated</span>
            <span>✓ 4.9/5 Client Rating</span>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section>
        <div className="container">
          <h2>Why Most Businesses Struggle</h2>
          <p className="section-intro">
            You're not alone. These are the challenges we solve every day.
          </p>

          <div className="grid grid-2">
            <div className="service-card">
              <h3>❌ No Clear Strategy</h3>
              <p>Running campaigns without a roadmap leads to wasted effort and missed opportunities.</p>
              <div className="outcome">→ We build custom growth plans</div>
            </div>

            <div className="service-card">
              <h3>💸 Money Wasted on Ads</h3>
              <p>Poor targeting and weak creatives drain budgets with little return.</p>
              <div className="outcome">→ We optimize every dollar spent</div>
            </div>

            <div className="service-card">
              <h3>📉 Inconsistent Sales</h3>
              <p>Revenue fluctuates wildly without predictable systems in place.</p>
              <div className="outcome">→ We create repeatable pipelines</div>
            </div>

            <div className="service-card">
              <h3>🎯 Decisions Based on Assumptions</h3>
              <p>Guessing what works costs time and money you can't afford to lose.</p>
              <div className="outcome">→ We rely on data, not hunches</div>
            </div>
          </div>

          {/* Metrics */}
          <div className="metrics">
            <div className="metric">
              <strong>3.2x</strong>
              <span>Average ROI Increase</span>
            </div>
            <div className="metric">
              <strong>87%</strong>
              <span>Client Retention Rate</span>
            </div>
            <div className="metric">
              <strong>45 Days</strong>
              <span>Average Time to Results</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <Credibility />
      <Industries />

      {/* VALUE STRIP - Testimonial */}
      <div className="value-strip">
        <div className="container">
          <div className="testimonial">
            <p>
              "Ally Consult transformed our entire marketing approach. In 6 months, 
              we went from guessing to scaling predictably. Best investment we've made."
            </p>
            <strong>— Sarah Chen, CEO at TechFlow Solutions</strong>
          </div>
        </div>
      </div>

      <CaseStudies />
      <div className="section-divider"></div>
      <WhyAlly />
      <Engagement />
      <FAQ />
    </>
  )
}