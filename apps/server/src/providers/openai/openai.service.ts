import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as cleaner from 'clean-text-utils';

@Injectable()
export class OpenaiService {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  constructor() {}

  async validateMenfess(text: string): Promise<{ score: number }> {
    const systemPrompt =
      'Klasifikasikan semua kalimat apakah mengandung hal-hal negatif seperti kata kasar, perjudian, ujaran kebencian, rasis, dan SARA. Berikan skor dari 0 hingga 100, di mana 0 menunjukkan sangat positif dan 100 menunjukkan sangat negatif. hanya kembalikan respon dengan format JSON seperti berikut: { "score": 0-100 }';

    const gptResponse = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      temperature: 1,
      max_tokens: 1000,
      stream: false,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: this.cleanText(text),
        },
      ],
    });

    return JSON.parse(gptResponse.choices.at(0).message.content);
  }

  private cleanText(text: string): string {
    let cleaned = '';

    cleaned = cleaner.strip.emoji(text);

    cleaned = cleaner.strip.punctuation(cleaned);

    cleaned = cleaner.strip.extraSpace(cleaned);

    cleaned = cleaner.strip.nonASCII(cleaned);

    cleaned = cleaner.replace.exoticChars(cleaned);

    return cleaned;
  }
}
