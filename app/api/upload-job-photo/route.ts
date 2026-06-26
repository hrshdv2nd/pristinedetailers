import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { createClient } from '@/lib/supabase/server';

const MAX_BYTES = 15 * 1024 * 1024; // 15 MB
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Detect the real file type from its magic bytes — never trust the client's
// filename or Content-Type. Only raster images are accepted (SVG is excluded
// because it can carry executable JavaScript).
function detectImageType(bytes: Uint8Array): { ext: string; contentType: string } | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { ext: 'jpg', contentType: 'image/jpeg' };
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) {
    return { ext: 'png', contentType: 'image/png' };
  }
  // WebP: "RIFF" .... "WEBP"
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return { ext: 'webp', contentType: 'image/webp' };
  }
  return null;
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file');
  const bookingId = formData.get('bookingId');
  const type = formData.get('type');

  // Validate inputs strictly before they touch any path or query.
  if (!(file instanceof File) || typeof bookingId !== 'string' || typeof type !== 'string') {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  if (!UUID_RE.test(bookingId)) {
    return NextResponse.json({ error: 'Invalid bookingId' }, { status: 400 });
  }
  if (type !== 'before' && type !== 'after') {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  // Authorization: only an admin, or the detailer actually assigned to this
  // booking, may attach job photos. Customers cannot upload here.
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single<{ role: string }>();
  const role = profile?.role ?? 'customer';

  if (role !== 'admin' && role !== 'detailer') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (role === 'detailer') {
    const { data: detailer } = await supabase
      .from('detailers')
      .select('id')
      .eq('user_id', user.id)
      .single<{ id: string }>();
    const { data: booking } = await supabase
      .from('bookings')
      .select('id')
      .eq('id', bookingId)
      .eq('detailer_id', detailer?.id ?? '')
      .single<{ id: string }>();
    if (!booking) {
      // Don't reveal whether the booking exists — just deny.
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  // Size + content validation.
  if (file.size === 0 || file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File must be between 1 byte and 15 MB' }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const detected = detectImageType(buffer);
  if (!detected) {
    return NextResponse.json({ error: 'Only JPEG, PNG or WebP images are allowed' }, { status: 400 });
  }

  // Build the storage key from validated values only — extension comes from the
  // detected type, never the user-supplied filename, and a random component
  // prevents collisions/overwrites.
  const filename = `jobs/${bookingId}/${type}/${crypto.randomUUID()}.${detected.ext}`;

  const blob = await put(filename, buffer, {
    access: 'public',
    contentType: detected.contentType,
  });
  return NextResponse.json({ url: blob.url });
}
