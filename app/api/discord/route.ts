import { NextResponse } from 'next/server';

const DISCORD_ID = '605732226201550892';

export async function GET() {
 try {
   const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
   if (!response.ok) throw new Error('Failed to fetch');
   const data = await response.json();
   
   return NextResponse.json({
     status: data.data.discord_status || 'offline'
   });
 } catch (error) {
   console.error('Discord status error:', error);
   return NextResponse.json({ status: 'offline' });
 }
}