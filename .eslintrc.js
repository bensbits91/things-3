module.exports = {
   extends: [
      'next/core-web-vitals', // Vercel's recommended ESLint config for Next.js
      'plugin:@typescript-eslint/recommended', // TypeScript rules
      'plugin:react/recommended', // React rules
      'plugin:jsx-a11y/recommended', // Accessibility rules
      'plugin:import/recommended', // Import/export rules
      'plugin:prettier/recommended' // Add Prettier integration
   ],
   parser: '@typescript-eslint/parser',
   plugins: ['@typescript-eslint', 'react', 'jsx-a11y', 'import'],
   rules: {
      '@typescript-eslint/no-explicit-any': 'error', // Match Vercel's rule
      '@typescript-eslint/no-unused-vars': [
         'error',
         { argsIgnorePattern: '^_' }
      ],
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'import/no-unresolved': 'error'
   }
};
