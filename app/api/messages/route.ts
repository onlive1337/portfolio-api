// app/api/messages/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import type { CreateMessageRequest, CreateMessageResponse, Message } from '../../types/messages';

export const runtime = 'edge';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    return NextResponse.json(data as Message[], {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Failed to get messages:', error);
    return NextResponse.json(
      { error: 'Failed to get messages' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateMessageRequest;
    
    if (!body.content?.trim()) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (body.content.length > 500) {
      return NextResponse.json(
        { error: 'Message is too long' },
        { status: 400, headers: corsHeaders }
      );
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([{ content: body.content.trim() }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data as Message, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Failed to create message:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500, headers: corsHeaders }
    );
  }
}