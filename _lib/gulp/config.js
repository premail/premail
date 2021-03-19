import path from 'path';

export const paths = {
  dist: path.resolve('/dist/'),
  srcMJML: path.resolve('./', '**/index.mjml'),
  destMJML: path.resolve('.'),
  srcPrettier: path.resolve('./', '**/*.mjml'),
  destPrettier: path.resolve('.')
}
