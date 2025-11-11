import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { zodiac, mealType, language } = body;

    if (!zodiac || !mealType || !language) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const prompt = `Generate a ${mealType} recipe in ${language} for someone born under the zodiac sign ${zodiac}. Include a title, ingredients, and instructions.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content;

    const [titleLine, ...rest] = content.split('\n');
    const title = titleLine.replace(/^Title:\s*/i, '').trim();
    const ingredients = rest.slice(0, rest.findIndex(line => line.toLowerCase().includes('instructions'))).join('\n').trim();
    const instructions = rest.slice(rest.findIndex(line => line.toLowerCase().includes('instructions'))).join('\n').trim();

    const recipe = await prisma.recipe.create({
      data: {
        zodiac,
        mealType,
        language,
        title,
        ingredients,
        instructions,
      },
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Error generating recipe:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
