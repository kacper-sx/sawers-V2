// @ts-check
import tailwindcss from '@tailwindcss/vite';
import icon from "astro-icon";
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://sawers.pl',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [icon({
      include: {
        lucide: [
          "arrow-up-right",
          "phone",
          "menu",
          "scroll",
          "mail",
          "hand-heart",
          "hammer",
          "truck",
          "badge-check",
          "map-pin",
          "calendar-clock",
          "facebook",
          "instagram",
          "drum",
          "server",
        ],
      },
    }), react()]
});
