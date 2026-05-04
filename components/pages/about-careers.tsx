'use client';

import { useState } from 'react';
import { Nav } from '@/components/shared/nav';
import { Footer } from '@/components/shared/footer';
import { Arrow, Eyebrow } from '@/components/shared/atoms';

const ROLES = [
  {
    title: 'Senior Detailer',
    type: 'Full-time',
    location: 'Mobile · Melbourne',
    salary: '$75,000 – $90,000',
    desc: 'Lead full-detail and ceramic coating jobs across greater Melbourne. You\'ll be our clients\' primary point of contact on the day — so professionalism matters as much as technique.',
    requirements: [
      '3+ years professional detailing experience',
      'Paint correction and polishing proficiency',
      'Clean driver\'s licence',
      'Excellent client communication skills',
    ],
  },
  {
    title: 'PPF & Ceramic Specialist',
    type: 'Full-time',
    location: 'Mobile · Melbourne',
    salary: '$85,000 – $100,000',
    desc: 'Install paint protection film and apply ceramic coatings to a fleet of Melbourne\'s most valuable vehicles. XPEL or equivalent accreditation preferred.',
    requirements: [
      'Certified PPF installation experience (XPEL, LLumar, or equivalent)',
      'Ceramic coating certification (Gtechniq, CarPro, or similar)',
      'Meticulous attention to panel alignment and edge sealing',
      'Experience with high-value and exotic vehicles',
    ],
  },
  {
    title: 'Customer Experience Coordinator',
    type: 'Part-time',
    location: 'Remote · Melbourne',
    salary: '$32 – $38/hr',
    desc: 'Own the booking experience and member communications. You\'ll handle enquiries, coordinate scheduling, and make sure every client feels cared for before a detailer arrives.',
    requirements: [
      'Strong written and verbal communication',
      'Experience with booking or CRM software',
      'Passion for cars and customer service',
      'Availability across weekday business hours',
    ],
  },
];

const PERKS = [
  { title: 'Vehicle access', body: 'Use a company-branded van for commuting to and from jobs.' },
  { title: 'Ongoing training', body: 'Fully funded certification upgrades — ceramic, PPF, detailing courses.' },
  { title: 'Member events', body: 'Access to our exclusive car showcases and collection days.' },
  { title: 'Flexible scheduling', body: 'No two weeks are the same. We work around your life, not against it.' },
  { title: 'Product supply', body: 'All professional-grade products, tools, and PPE supplied by us.' },
  { title: 'Performance bonus', body: 'Quarterly bonuses tied to customer satisfaction scores.' },
];

export function AboutCareers() {
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F2' }}>
      <Nav active="about" />

      {/* Hero */}
      <section className="pd-sect-hero">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Join the Team</Eyebrow>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 'clamp(48px, 6.5vw, 96px)',
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              marginTop: 20,
              maxWidth: 820,
            }}
          >
            Passionate about cars?<br />
            <span style={{ background: 'linear-gradient(135deg, #C89B37, #A07A21)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              We&#8217;re growing.
            </span>
          </h1>
          <p style={{ fontSize: 18, color: '#3A3A38', marginTop: 28, maxWidth: 580, lineHeight: 1.6 }}>
            Pristine Detailers is Melbourne&#8217;s highest-rated mobile detailing crew. We&#8217;re always looking for people who care as much as we do — about cars, craft, and the people who own them.
          </p>
        </div>
      </section>

      {/* Open roles */}
      <section className="pd-sect">
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Open positions</Eyebrow>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, marginTop: 16, marginBottom: 48 }}>
            Current openings.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {ROLES.map(role => (
              <div
                key={role.title}
                style={{
                  background: '#fff',
                  border: '1px solid #E1DFD8',
                  borderRadius: 20,
                  padding: 32,
                }}
              >
                <div className="pd-two-col" style={{ gap: 40, alignItems: 'start' }}>
                  <div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                      <span style={{ padding: '4px 10px', borderRadius: 999, background: '#F3E8CD', color: '#A07A21', fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {role.type}
                      </span>
                      <span style={{ padding: '4px 10px', borderRadius: 999, background: '#EBEAE5', color: '#3A3A38', fontSize: 11, fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>
                        {role.location}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 500, marginBottom: 12 }}>
                      {role.title}
                    </h3>
                    <p style={{ fontSize: 15, color: '#3A3A38', lineHeight: 1.65, marginBottom: 20 }}>{role.desc}</p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {role.requirements.map(req => (
                        <li key={req} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#3A3A38' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C89B37" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}>
                            <path d="M5 12l5 5L20 7" />
                          </svg>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#7A7A76', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                      Salary
                    </div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 500, marginBottom: 20 }}>
                      {role.salary}
                    </div>
                    <a
                      href="#apply"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 6, background: '#0A0A0A', color: '#fff', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}
                    >
                      Apply now <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="pd-sect-sm" style={{ background: '#EBEAE5' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Why join us</Eyebrow>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, marginTop: 16, marginBottom: 48 }}>
            What you get.
          </h2>
          <div className="pd-three-col" style={{ gap: 20 }}>
            {PERKS.map(p => (
              <div key={p.title} style={{ background: '#fff', border: '1px solid #E1DFD8', borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 500, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: '#3A3A38', lineHeight: 1.6 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="pd-sect">
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 32px' }}>
          <Eyebrow>Apply</Eyebrow>
          <h2 className="pd-h-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, marginTop: 16, marginBottom: 40 }}>
            Get in touch.
          </h2>

          {sent ? (
            <div style={{ background: '#F3E8CD', border: '1px solid #C89B37', borderRadius: 16, padding: 32, textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 500, marginBottom: 8 }}>
                Application received ✓
              </div>
              <p style={{ color: '#3A3A38', fontSize: 15 }}>
                We&#8217;ll review your message and get back to you within 2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Full name', key: 'name', type: 'text', placeholder: 'Your name' },
                { label: 'Email address', key: 'email', type: 'email', placeholder: 'you@email.com' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#0A0A0A' }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: '1.5px solid #E1DFD8',
                      fontSize: 15,
                      background: '#fff',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#0A0A0A' }}>Role you&#8217;re interested in</label>
                <select
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: '1.5px solid #E1DFD8',
                    fontSize: 15,
                    background: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box',
                    appearance: 'none',
                  }}
                >
                  <option value="">Select a role…</option>
                  {ROLES.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                  <option value="other">Other / General enquiry</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#0A0A0A' }}>Tell us about yourself</label>
                <textarea
                  placeholder="Your experience, what draws you to Pristine, and why you&#8217;d be a great fit…"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: '1.5px solid #E1DFD8',
                    fontSize: 15,
                    background: '#fff',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  borderRadius: 8,
                  background: '#0A0A0A',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Send application <Arrow />
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
