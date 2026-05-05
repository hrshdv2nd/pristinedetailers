import { NextResponse } from 'next/server';
import { getServices, getStaff } from '@/lib/setmore';

export async function GET() {
  try {
    const [services, staff] = await Promise.all([getServices(), getStaff()]);
    return NextResponse.json({ services, staff });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
