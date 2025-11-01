import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Get API key from environment
function getOpenAIKey(): string | undefined {
  return process.env.OPEN_AI_API_KEY || process.env.OPENAI_API_KEY;
}

// System prompt to prevent hallucination
const SYSTEM_PROMPT = `You are a helpful financial assistant. Your role is to provide accurate, fact-based financial guidance.

IMPORTANT RULES:
1. NEVER make up or invent financial data (balances, transactions, spending amounts, etc.)
2. NEVER provide specific dollar amounts unless the user explicitly provides them or asks for calculations
3. If you don't have access to the user's actual financial data, acknowledge this clearly
4. Only provide general financial advice and guidance, not specific numbers from accounts you can't see
5. If asked about specific transactions or balances you don't have access to, say: "I don't have access to your account data. Please provide the information or check your dashboard."
6. Be helpful but honest about data limitations
7. Focus on providing financial education and general advice

You can help with:
- General financial planning advice
- Budgeting strategies
- Savings tips
- Financial education
- Answering questions about financial concepts

Remember: Accuracy and honesty are more important than appearing helpful. Never hallucinate financial data.`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = getOpenAIKey();
    
    // Log API call attempt (for debugging)
    console.log('[OpenAI API] Request received at:', new Date().toISOString());
    console.log('[OpenAI API] API key present:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT FOUND');
    
    if (!apiKey) {
      console.error('[OpenAI API] ERROR: API key not configured');
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured',
          details: 'Please set OPEN_AI_API_KEY in your .env.local file'
        },
        { status: 500 }
      );
    }

    // Initialize OpenAI client with the API key
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const body = await request.json();
    const { messages, mode } = body;
    
    console.log('[OpenAI API] Calling OpenAI with', messages.length, 'message(s)');

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array required' },
        { status: 400 }
      );
    }

    // Format messages for OpenAI
    const formattedMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    // Call OpenAI API
    console.log('[OpenAI API] Making API call to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using cheaper model, can upgrade to gpt-4 if needed
      messages: formattedMessages,
      temperature: 0.7, // Lower temperature for more consistent responses
      max_tokens: 500, // Limit response length
    });

    const response = completion.choices[0]?.message?.content || 
      "I'm sorry, I couldn't generate a response. Please try again.";

    console.log('[OpenAI API] ✅ Success! Response received');
    console.log('[OpenAI API] Response length:', response.length, 'characters');

    return NextResponse.json({ 
      content: response,
      role: 'assistant'
    });

  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to get AI response';
    let errorDetails = error.message || 'Unknown error';
    
    if (error.message?.includes('API key')) {
      errorMessage = 'Invalid API key';
      errorDetails = 'Please check your OPEN_AI_API_KEY in .env';
    } else if (error.message?.includes('rate limit')) {
      errorMessage = 'Rate limit exceeded';
      errorDetails = 'Please try again in a moment';
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  }
}

