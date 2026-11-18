import type { ModerationResult } from '../types/dream.ts';

const UNSAFE_PATTERNS: RegExp[] = [
  /\b(kill|murder|blood|gore|weapon|gun|rifle|knife|swordfight|stab|shoot|bomb|terror|torture|suicide|self[- ]?harm|dead body|corpse)\b/i,
  /\b(sex|nude|naked|porn|erotic|explicit|nsfw|drugs|cocaine|heroin|meth|alcohol|drunk|beer|wine|cigarette|vape)\b/i,
  /\b(damn|hell|shit|fuck|bitch|bastard|asshole|crap|idiot|stupid|hate speech|racist)\b/i,
  /\b(horror|nightmare|demon|cursed|possessed|haunted blood|slasher)\b/i,
];

const PERSONAL_INFO_PATTERNS: RegExp[] = [
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/,
  /\b\d{1,5}\s+[A-Za-z0-9.\s]{2,25}\s+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln)\b/i,
];

export function moderateKidInput(rawText: string): ModerationResult {
  const text = rawText.trim();

  if (text.length < 3) {
    return {
      safe: false,
      reason: 'Tell us a little more about your idea first.',
      gentleSuggestion:
        'Try at least a few words, like "a friendly dragon who runs a cloud bakery."',
    };
  }

  if (text.length > 320) {
    return {
      safe: false,
      reason: 'That idea is a bit too long for one prompt.',
      gentleSuggestion:
        'Keep your imagination spark under 320 characters so we can weave it into a bright story.',
    };
  }

  for (const pattern of PERSONAL_INFO_PATTERNS) {
    if (pattern.test(text)) {
      return {
        safe: false,
        reason: 'Please keep personal details private.',
        gentleSuggestion:
          'Dream Builder never collects emails, phone numbers, or addresses. Use pretend character names instead!',
      };
    }
  }

  for (const pattern of UNSAFE_PATTERNS) {
    if (pattern.test(text)) {
      return {
        safe: false,
        reason: "Let's keep Dream Builder bright, kind, and family-friendly.",
        gentleSuggestion:
          'Try imagining silly adventures, gentle magic, teamwork, or curious creatures instead!',
      };
    }
  }

  return { safe: true };
}
