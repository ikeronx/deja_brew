import legacy from '@vitejs/plugin-legacy';

export default {
  base: '/deja_brew/',
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
};
