import AnimateIn from '../components/AnimateIn'
import shimo from '../assets/team/Shimo.png'
import karangwa from '../assets/team/karangwa.png'
import fiston from '../assets/team/Fiston.png'

export default function Team() {
  return (
    <section>
      <AnimateIn>
        <h1>Leadership Team</h1>
        <p className="section-intro">
          Experienced professionals leading strategy and innovation
        </p>
      </AnimateIn>

      <div className="team-grid">
        {[ 
          { img: shimo, name: 'SHIMO Yvan Parfait', role: 'CEO' },
          { img: karangwa, name: 'KARANGWA Cedrique', role: 'CTO' },
          { img: fiston, name: 'NISHIMWE Fiston', role: 'Chief Investment & Procurement Officer' }
        ].map((member, i) => (
          <AnimateIn key={i} delay={0.15 * i}>
            <div className="team-card">
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
