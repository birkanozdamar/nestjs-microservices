import { createHash } from 'crypto';

export const getSHA512Hash = (value: string): string => {
  return createHash('sha512').update(value).digest('hex');
};
