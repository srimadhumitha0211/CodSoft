import { format } from 'date-fns';

interface Pattern {
  pattern: RegExp;
  response: (matches: RegExpMatchArray) => string;
}

const patterns: Pattern[] = [
  {
    pattern: /(?:hi|hello|hey)(?:\s|$)/i,
    response: () => "Hello! How can I help you today?",
  },
  {
    pattern: /(?:how are you|how're you)/i,
    response: () => "I'm doing well, thank you for asking! How about you?",
  },
  {
    pattern: /what(?:'s| is) your name/i,
    response: () => "I'm ChatBot, nice to meet you!",
  },
  {
    pattern: /what time is it|what's the time/i,
    response: () => `It's ${format(new Date(), 'h:mm a')}`,
  },
  {
    pattern: /what(?:'s| is) the date|what day is it/i,
    response: () => `Today is ${format(new Date(), 'MMMM do, yyyy')}`,
  },
  {
    pattern: /weather|temperature/i,
    response: () => "I'm sorry, I don't have access to weather information. You might want to check a weather service for that.",
  },
  {
    pattern: /thank(?:s| you)/i,
    response: () => "You're welcome! Is there anything else I can help you with?",
  },
  {
    pattern: /bye|goodbye|see you/i,
    response: () => "Goodbye! Have a great day!",
  },
  {
    pattern: /help|commands|what can you do/i,
    response: () => "I can help with basic conversation, tell you the time and date, and respond to greetings and farewells. Just chat with me naturally!",
  }
];

export function generateResponse(input: string): string {
  // Remove extra whitespace and trim
  const cleanInput = input.trim().replace(/\s+/g, ' ');
  
  if (!cleanInput) {
    return "I didn't catch that. Could you please say something?";
  }

  // Find the first matching pattern
  const matchingPattern = patterns.find(p => p.pattern.test(cleanInput));
  
  if (matchingPattern) {
    const matches = cleanInput.match(matchingPattern.pattern);
    return matchingPattern.response(matches || []);
  }

  // Default response if no pattern matches
  return "I'm not sure how to respond to that. Try asking me about the time, date, or just say hello!";
}