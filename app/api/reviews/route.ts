import { NextResponse } from 'next/server';

export const revalidate = 21600; // re-fetch every 6 hours

export interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface ReviewsPayload {
  rating: number;
  total: number;
  reviews: GoogleReview[];
}

async function fetchPlaceId(apiKey: string): Promise<string> {
  const url = new URL('https://maps.googleapis.com/maps/api/place/findplacefromtext/json');
  url.searchParams.set('input', 'Pristine Detailers Melbourne');
  url.searchParams.set('inputtype', 'textquery');
  url.searchParams.set('locationbias', 'point:-37.8136,144.9631');
  url.searchParams.set('fields', 'place_id');
  url.searchParams.set('key', apiKey);

  const res = await fetch(url.toString(), { next: { revalidate: 86400 } });
  const data = await res.json();
  const placeId = data.candidates?.[0]?.place_id as string | undefined;
  if (!placeId) throw new Error('Pristine Detailers not found in Places API');
  return placeId;
}

async function fetchPlaceDetails(apiKey: string, placeId: string): Promise<ReviewsPayload> {
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'rating,user_ratings_total,reviews');
  url.searchParams.set('reviews_sort', 'newest');
  url.searchParams.set('key', apiKey);

  const res = await fetch(url.toString(), { next: { revalidate: 21600 } });
  const data = await res.json();
  const result = data.result ?? {};

  return {
    rating: result.rating ?? 0,
    total: result.user_ratings_total ?? 0,
    reviews: result.reviews ?? [],
  };
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'GOOGLE_PLACES_API_KEY is not configured' }, { status: 500 });
  }

  try {
    const placeId = process.env.GOOGLE_PLACE_ID ?? (await fetchPlaceId(apiKey));
    const payload = await fetchPlaceDetails(apiKey, placeId);
    return NextResponse.json(payload);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
