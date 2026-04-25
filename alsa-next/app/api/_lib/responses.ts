import {NextResponse} from 'next/server';

export function ok<T>(data: T) {
  return NextResponse.json({success: true, data}, {status: 200});
}

export function fail(error: unknown) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  return NextResponse.json({success: false, message}, {status: 500});
}
