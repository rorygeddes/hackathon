// Quick test script to verify OpenAI API key is working
const fs = require('fs');
const path = require('path');

// Try to load .env.local first (Next.js preference), then .env
if (fs.existsSync('.env.local')) {
  require('dotenv').config({ path: '.env.local' });
  console.log('📁 Loading .env.local');
} else if (fs.existsSync('.env')) {
  require('dotenv').config({ path: '.env' });
  console.log('📁 Loading .env');
} else {
  require('dotenv').config(); // Try default
  console.log('⚠️  No .env.local or .env file found - checking environment variables');
}

const OpenAI = require('openai');

const apiKey = process.env.OPEN_AI_API_KEY || process.env.OPENAI_API_KEY;

console.log('\n🔍 Testing OpenAI API key...');
console.log('API Key present:', apiKey ? `${apiKey.substring(0, 10)}...` : '❌ NOT FOUND');

if (!apiKey) {
  console.error('\n❌ ERROR: OPEN_AI_API_KEY not found!');
  console.error('\n📝 Please create a .env.local file with:');
  console.error('   OPEN_AI_API_KEY=sk-your-actual-key-here');
  console.error('\n   Get your key from: https://platform.openai.com/account/api-keys');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: apiKey,
});

async function testOpenAI() {
  try {
    console.log('\nCalling OpenAI API...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Say "API test successful" if you can read this.' },
      ],
      max_tokens: 20,
    });

    const response = completion.choices[0]?.message?.content;
    console.log('\n✅ SUCCESS! OpenAI API is working!');
    console.log('Response:', response);
    console.log('\nYour API key is being used correctly.');
    return true;
  } catch (error) {
    console.error('\n❌ ERROR calling OpenAI API:');
    console.error('Message:', error.message);
    if (error.status) {
      console.error('Status:', error.status);
    }
    return false;
  }
}

testOpenAI().then(success => {
  process.exit(success ? 0 : 1);
});

