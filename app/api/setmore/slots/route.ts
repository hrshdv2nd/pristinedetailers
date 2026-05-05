import { NextRequest, NextResponse } from 'next/server';
import { getSlots } from '@/lib/setmore';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const staffKey = searchParams.get('staffKey');
  const serviceKey = searchParams.get('serviceKey');
  const date = searchParams.get('date'); // MM/dd/yyyy

  if (!staffKey || !serviceKey || !date) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  try {
    const slots = await getSlots(staffKey, serviceKey, date);
    return NextResponse.json({ slots });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
