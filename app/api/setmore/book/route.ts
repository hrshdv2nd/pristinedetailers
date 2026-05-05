import { NextRequest, NextResponse } from 'next/server';
import { createCustomer, createAppointment } from '@/lib/setmore';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, serviceKey, staffKey, startTime, endTime, comment } =
      await request.json();

    if (!firstName || !email || !serviceKey || !staffKey || !startTime || !endTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const customer = await createCustomer({ first_name: firstName, last_name: lastName, email, cell_phone: phone });
    const appointment = await createAppointment({
      staff_key: staffKey,
      service_key: serviceKey,
      customer_key: customer.key,
      start_time: startTime,
      end_time: endTime,
      comment,
    });

    return NextResponse.json({ appointment });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
