import { serialize, CookieSerializeOptions } from 'cookie';

/**
 * This sets `cookie` using the `res` object
 */
export const setCookie = (res: any, name: string, value: any, options: CookieSerializeOptions = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};