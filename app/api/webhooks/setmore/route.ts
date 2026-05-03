import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface SetmoreWebhookPayload {
  event: string;
  appointment?: {
    key: string;
    staff_key: string;
    service_key: string;
    customer_key: string;
    start_time: string;
    end_time: string;
    comment?: string;
  };
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-setmore-secret');
  if (secret !== process.env.SETMORE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: SetmoreWebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const supabase = await createClient();

  if (payload.event === 'appointment.cancelled' && payload.appointment) {
    await supabase.from('bookings')
      .update({ status: 'cancelled' })
      .eq('setmore_booking_id', payload.appointment.key);
  }

  if (payload.event === 'appointment.updated' && payload.appointment) {
    await supabase.from('bookings')
      .update({
        scheduled_start: payload.appointment.start_time,
        scheduled_end: payload.appointment.end_time,
      })
      .eq('setmore_booking_id', payload.appointment.key);
  }

  if (payload.event === 'appointment.created' && payload.appointment) {
    const appt = payload.appointment;
    const { data: service } = await supabase.from('services').select('id').eq('setmore_service_id', appt.service_key).single<{ id: string }>();
    const { data: detailer } = await supabase.from('detailers').select('id').eq('setmore_staff_id', appt.staff_key).single<{ id: string }>();

    if (service && detailer) {
      await supabase.from('bookings').upsert({
        setmore_booking_id: appt.key,
        service_id: service.id,
        detailer_id: detailer.id,
        scheduled_start: appt.start_time,
        scheduled_end: appt.end_time,
        status: 'confirmed',
        customer_notes: appt.comment ?? null,
      }, { onConflict: 'setmore_booking_id' });
    }
  }

  return NextResponse.json({ received: true });
}
