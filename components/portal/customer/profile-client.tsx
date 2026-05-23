'use client';

import { useState, useTransition } from 'react';
import { updateProfile, addVehicle, deleteVehicle, setPrimaryVehicle } from '@/actions/profile';
import type { Profile, Vehicle } from '@/lib/types/database';

interface Props {
  profile: Profile;
  vehicles: Vehicle[];
}

const field: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: 8,
  border: '1px solid #E5E0D8', background: '#fff',
  fontSize: 14, color: '#0A0A0A', boxSizing: 'border-box',
};

const label: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 500,
  color: '#6B6B6B', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em',
};

const card: React.CSSProperties = {
  background: '#fff', borderRadius: 12, border: '1px solid #F0EDE8', padding: '24px',
};

const btn = (variant: 'primary' | 'ghost' | 'danger' = 'primary'): React.CSSProperties => ({
  padding: variant === 'ghost' ? '8px 16px' : '10px 20px',
  borderRadius: 8, border: variant === 'ghost' ? '1px solid #E5E0D8' : variant === 'danger' ? '1px solid #FCA5A5' : 'none',
  background: variant === 'primary' ? '#C89B37' : variant === 'danger' ? '#FEF2F2' : '#fff',
  color: variant === 'primary' ? '#fff' : variant === 'danger' ? '#DC2626' : '#0A0A0A',
  fontSize: 13, fontWeight: 500, cursor: 'pointer',
});

export default function ProfileClient({ profile, vehicles: initialVehicles }: Props) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [profileMsg, setProfileMsg] = useState('');
  const [vehicleMsg, setVehicleMsg] = useState('');
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [newVehicle, setNewVehicle] = useState({ make: '', model: '', year: '', color: '', license_plate: '' });

  function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateProfile(fd);
      setProfileMsg(res.error ?? 'Saved');
      setTimeout(() => setProfileMsg(''), 3000);
    });
  }

  function handleAddVehicle(e: React.FormEvent) {
    e.preventDefault();
    if (!newVehicle.make || !newVehicle.model) return;
    startTransition(async () => {
      const res = await addVehicle({
        make: newVehicle.make,
        model: newVehicle.model,
        year: newVehicle.year ? parseInt(newVehicle.year) : undefined,
        color: newVehicle.color || undefined,
        license_plate: newVehicle.license_plate || undefined,
      });
      if (res.error) { setVehicleMsg(res.error); return; }
      // Refetch via page reload to get updated list
      window.location.reload();
    });
  }

  function handleDelete(vehicleId: string) {
    startTransition(async () => {
      await deleteVehicle(vehicleId);
      setVehicles(v => v.filter(x => x.id !== vehicleId));
    });
  }

  function handleSetPrimary(vehicleId: string) {
    startTransition(async () => {
      await setPrimaryVehicle(vehicleId);
      setVehicles(v => v.map(x => ({ ...x, is_primary: x.id === vehicleId })));
    });
  }

  const nameParts = profile.full_name?.split(' ') ?? [];
  const defaultFirst = nameParts.slice(0, -1).join(' ') || profile.full_name || '';
  const defaultLast  = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Profile form */}
      <div style={card}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: '#0A0A0A', margin: '0 0 20px' }}>Personal Details</h2>
        <form onSubmit={handleProfileSubmit}>
          <input type="hidden" name="full_name" value={`${defaultFirst} ${defaultLast}`.trim()} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={label}>First Name</label>
              <input
                name="full_name"
                defaultValue={defaultFirst}
                style={field}
                onChange={e => {
                  const form = e.currentTarget.form!;
                  (form.elements.namedItem('full_name') as HTMLInputElement).value =
                    `${e.target.value} ${defaultLast}`.trim();
                }}
                placeholder="First name"
              />
            </div>
            <div>
              <label style={label}>Last Name</label>
              <input
                defaultValue={defaultLast}
                style={field}
                onChange={e => {
                  const form = e.currentTarget.form!;
                  (form.elements.namedItem('full_name') as HTMLInputElement).value =
                    `${defaultFirst} ${e.target.value}`.trim();
                }}
                placeholder="Last name"
              />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={label}>Email</label>
            <input value={profile.email} disabled style={{ ...field, background: '#FAFAF8', color: '#9CA3AF' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={label}>Phone</label>
            <input name="phone" defaultValue={profile.phone ?? ''} style={field} placeholder="+61 4xx xxx xxx" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button type="submit" style={btn('primary')} disabled={isPending}>
              {isPending ? 'Saving…' : 'Save Changes'}
            </button>
            {profileMsg && (
              <span style={{ fontSize: 13, color: profileMsg === 'Saved' ? '#16A34A' : '#DC2626' }}>
                {profileMsg}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Vehicles */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#0A0A0A', margin: 0 }}>My Vehicles</h2>
          <button style={btn('ghost')} onClick={() => setShowAddVehicle(s => !s)}>
            {showAddVehicle ? 'Cancel' : '+ Add Vehicle'}
          </button>
        </div>

        {showAddVehicle && (
          <form onSubmit={handleAddVehicle} style={{ background: '#FAFAF8', borderRadius: 10, padding: 16, marginBottom: 20, border: '1px solid #F0EDE8' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={label}>Make *</label>
                <input value={newVehicle.make} onChange={e => setNewVehicle(v => ({ ...v, make: e.target.value }))} style={field} placeholder="Toyota" required />
              </div>
              <div>
                <label style={label}>Model *</label>
                <input value={newVehicle.model} onChange={e => setNewVehicle(v => ({ ...v, model: e.target.value }))} style={field} placeholder="Camry" required />
              </div>
              <div>
                <label style={label}>Year</label>
                <input type="number" value={newVehicle.year} onChange={e => setNewVehicle(v => ({ ...v, year: e.target.value }))} style={field} placeholder="2021" min="1980" max="2030" />
              </div>
              <div>
                <label style={label}>Color</label>
                <input value={newVehicle.color} onChange={e => setNewVehicle(v => ({ ...v, color: e.target.value }))} style={field} placeholder="White" />
              </div>
              <div>
                <label style={label}>Plate</label>
                <input value={newVehicle.license_plate} onChange={e => setNewVehicle(v => ({ ...v, license_plate: e.target.value }))} style={field} placeholder="ABC123" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" style={btn('primary')} disabled={isPending}>Add Vehicle</button>
              {vehicleMsg && <span style={{ fontSize: 13, color: '#DC2626', alignSelf: 'center' }}>{vehicleMsg}</span>}
            </div>
          </form>
        )}

        {vehicles.length === 0 ? (
          <p style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', padding: '24px 0' }}>No vehicles added yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {vehicles.map(v => (
              <div key={v.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 10, border: `1px solid ${v.is_primary ? '#C89B37' : '#F0EDE8'}`, background: v.is_primary ? 'rgba(200,155,55,0.04)' : '#fff' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#0A0A0A' }}>
                    {v.year && `${v.year} `}{v.make} {v.model}
                    {v.is_primary && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 500, color: '#C89B37', background: 'rgba(200,155,55,0.12)', padding: '2px 7px', borderRadius: 4 }}>Primary</span>}
                  </div>
                  <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 3 }}>
                    {[v.color, v.license_plate].filter(Boolean).join(' · ') || 'No details'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {!v.is_primary && (
                    <button style={btn('ghost')} onClick={() => handleSetPrimary(v.id)} disabled={isPending}>
                      Set Primary
                    </button>
                  )}
                  <button style={btn('danger')} onClick={() => handleDelete(v.id)} disabled={isPending}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
