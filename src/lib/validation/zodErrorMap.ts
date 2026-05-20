import { z } from 'zod';

type TranslationFunction = (key: string, values?: Record<string, any>) => string;

export function createZodErrorMap(t: TranslationFunction): any {
  return (issue: any, ctx: any) => {
    let message: string;

    switch (issue.code) {
      case 'invalid_type':
        if (issue.received === 'undefined') {
          message = t('validation.common.required');
        } else {
          message = t('validation.type.invalidType', {
            expected: issue.expected,
            received: issue.received,
          });
        }
        break;

      case 'invalid_format':
        if (issue.validation === 'email') {
          message = t('validation.email.invalid');
        } else if (issue.validation === 'url') {
          message = t('validation.url.invalid');
        } else if (issue.validation === 'uuid') {
          message = t('validation.string.invalidUuid');
        } else {
          message = t('validation.common.invalid');
        }
        break;

      case 'too_small':
        if (issue.type === 'string') {
          message = t('validation.string.tooShort', {
            minimum: issue.minimum,
          });
        } else if (issue.type === 'number') {
          message = t('validation.number.tooSmall', {
            minimum: issue.minimum,
          });
        } else if (issue.type === 'date') {
          message = t('validation.date.tooEarly', {
            minimum: issue.minimum,
          });
        } else {
          message = t('validation.common.tooShort', {
            minimum: issue.minimum,
          });
        }
        break;

      case 'too_big':
        if (issue.type === 'string') {
          message = t('validation.string.tooLong', {
            maximum: issue.maximum,
          });
        } else if (issue.type === 'number') {
          message = t('validation.number.tooBig', {
            maximum: issue.maximum,
          });
        } else if (issue.type === 'date') {
          message = t('validation.date.tooLate', {
            maximum: issue.maximum,
          });
        } else {
          message = t('validation.common.tooLong', {
            maximum: issue.maximum,
          });
        }
        break;

      case 'custom':
        message = issue.message || t('validation.common.invalid');
        break;

      case 'invalid_value':
        message = t('validation.common.invalid');
        break;

      case 'invalid_union':
        message = t('validation.common.invalid');
        break;

      case 'not_multiple_of':
        message = t('validation.common.invalid');
        break;

      default:
        message = ctx.defaultError;
    }

    return { message };
  };
}
