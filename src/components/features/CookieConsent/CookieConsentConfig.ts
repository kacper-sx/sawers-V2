import Lenis from "lenis";
import {
  type CookieConsentConfig,
  acceptedService,
} from "vanilla-cookieconsent";
declare global {
  interface Window {
    lenis: Lenis;
  }
}
declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    dataLayer: Record<string, any>[];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    gtag: (...args: any[]) => void;
  }
}

export const CAT_NECESSARY = "necessary";
export const CAT_ANALYTICS = "analytics";
export const CAT_ADVERTISEMENT = "advertisement";
export const CAT_FUNCTIONALITY = "functionality";
export const CAT_SECURITY = "security";

export const SERVICE_AD_STORAGE = "ad_storage";
export const SERVICE_AD_USER_DATA = "ad_user_data";
export const SERVICE_AD_PERSONALIZATION = "ad_personalization";
export const SERVICE_ANALYTICS_STORAGE = "analytics_storage";
export const SERVICE_FUNCTIONALITY_STORAGE = "functionality_storage";
export const SERVICE_PERSONALIZATION_STORAGE = "personalization_storage";
export const SERVICE_SECURITY_STORAGE = "security_storage";

function updateGtagConsent() {
  window.gtag("consent", "update", {
    [SERVICE_ANALYTICS_STORAGE]: acceptedService(
      SERVICE_ANALYTICS_STORAGE,
      CAT_ANALYTICS,
    )
      ? "granted"
      : "denied",
    [SERVICE_AD_STORAGE]: acceptedService(SERVICE_AD_STORAGE, CAT_ADVERTISEMENT)
      ? "granted"
      : "denied",
    [SERVICE_AD_USER_DATA]: acceptedService(
      SERVICE_AD_USER_DATA,
      CAT_ADVERTISEMENT,
    )
      ? "granted"
      : "denied",
    [SERVICE_AD_PERSONALIZATION]: acceptedService(
      SERVICE_AD_PERSONALIZATION,
      CAT_ADVERTISEMENT,
    )
      ? "granted"
      : "denied",
    [SERVICE_FUNCTIONALITY_STORAGE]: acceptedService(
      SERVICE_FUNCTIONALITY_STORAGE,
      CAT_FUNCTIONALITY,
    )
      ? "granted"
      : "denied",
    [SERVICE_PERSONALIZATION_STORAGE]: acceptedService(
      SERVICE_PERSONALIZATION_STORAGE,
      CAT_FUNCTIONALITY,
    )
      ? "granted"
      : "denied",
    [SERVICE_SECURITY_STORAGE]: acceptedService(
      SERVICE_SECURITY_STORAGE,
      CAT_SECURITY,
    )
      ? "granted"
      : "denied",
  });
}

export const config: CookieConsentConfig = {
  root: "#cc-container",
  guiOptions: {
    consentModal: {
      layout: "box inline",
      position: "bottom left",
    },
    preferencesModal: {
      layout: "box",
      position: "left",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  onModalShow: () => {
    window.lenis.destroy();
  },
  onModalHide: () => {
    const lenis = new Lenis({ autoRaf: true });
    window.lenis = lenis;
  },
  onFirstConsent: () => {
    updateGtagConsent();
  },
  onConsent: () => {
    updateGtagConsent();
  },
  onChange: () => {
    updateGtagConsent();
  },
  categories: {
    [CAT_NECESSARY]: {
      enabled: true,
      readOnly: true,
    },
    [CAT_ANALYTICS]: {
      autoClear: {
        cookies: [{ name: /^_ga/ }, { name: "_gid" }],
      },
      services: {
        [SERVICE_ANALYTICS_STORAGE]: {
          label:
            "Umożliwia przechowywanie (np. ciasteczek) związanych z analizą, np. czas trwania wizyty.",
        },
      },
    },
    [CAT_ADVERTISEMENT]: {
      services: {
        [SERVICE_AD_STORAGE]: {
          label:
            "Umożliwia przechowywanie (np. ciasteczek) związanych z reklamą.",
        },
        [SERVICE_AD_USER_DATA]: {
          label:
            "Ustawia zgodę na wysyłanie danych użytkownika związanych z reklamą do Google.",
        },
        [SERVICE_AD_PERSONALIZATION]: {
          label: "Ustawia zgodę na personalizowaną reklamę.",
        },
      },
    },
    [CAT_FUNCTIONALITY]: {
      services: {
        [SERVICE_FUNCTIONALITY_STORAGE]: {
          label:
            "Umożliwia przechowywanie danych wspierających funkcjonalność strony, np. ustawienia języka.",
        },
        [SERVICE_PERSONALIZATION_STORAGE]: {
          label:
            "Umożliwia przechowywanie danych związanych z personalizacją, np. rekomendacje wideo.",
        },
      },
    },
    [CAT_SECURITY]: {
      services: {
        [SERVICE_SECURITY_STORAGE]: {
          label:
            "Umożliwia przechowywanie danych związanych z bezpieczeństwem, np. funkcje uwierzytelniania, zapobieganie oszustwom itp.",
        },
      },
    },
  },

  language: {
    default: "pl",
    translations: {
      pl: {
        consentModal: {
          title: "Używamy plików cookies",
          description:
            "Ta strona korzysta z niezbędnych plików cookies, aby zapewnić jej prawidłowe działanie oraz z cookies analitycznych, aby zrozumieć, jak z niej korzystasz. Te drugie będą używane tylko po wyrażeniu zgody.",
          acceptAllBtn: "Zaakceptuj wszystkie",
          acceptNecessaryBtn: "Odrzuć wszystkie",
          showPreferencesBtn: "Zarządzaj preferencjami",
        },
        preferencesModal: {
          title: "Zarządzaj preferencjami cookies",
          acceptAllBtn: "Zaakceptuj wszystkie",
          acceptNecessaryBtn: "Odrzuć wszystkie",
          savePreferencesBtn: "Zatwierdź wybór",
          closeIconLabel: "Zamknij okno",
          sections: [
            {
              title: "Użycie cookies",
              description:
                "Używamy plików cookies, aby zapewnić podstawowe funkcje strony oraz poprawić Twoje doświadczenie online.",
            },
            {
              title: "Ściśle niezbędne pliki cookies",
              description:
                "Te pliki cookies są niezbędne do prawidłowego działania strony, np. uwierzytelnianie użytkownika.",
              linkedCategory: CAT_NECESSARY,
            },
            {
              title: "Analityka",
              description:
                "Pliki cookies analityczne pomagają zbierać dane pozwalające zrozumieć, jak użytkownicy korzystają z usług. Te dane umożliwiają poprawę treści i rozwijanie funkcji serwisu.",
              linkedCategory: CAT_ANALYTICS,
              cookieTable: {
                headers: {
                  name: "Nazwa",
                  domain: "Usługa",
                  description: "Opis",
                  expiration: "Wygasa po",
                },
                body: [
                  {
                    name: "_ga",
                    domain: "Google Analytics",
                    description:
                      'Cookie ustawiany przez <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
                    expiration: "Wygasa po 12 dniach",
                  },
                  {
                    name: "_gid",
                    domain: "Google Analytics",
                    description:
                      'Cookie ustawiany przez <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
                    expiration: "Sesja",
                  },
                ],
              },
            },
            {
              title: "Reklama",
              description:
                'Google używa cookies do celów reklamowych, w tym wyświetlania i personalizacji reklam (zgodnie z ustawieniami na <a href="https://g.co/adsettings">g.co/adsettings</a>), ograniczania liczby ich wyświetleń, wyciszania reklam oraz mierzenia ich skuteczności.',
              linkedCategory: CAT_ADVERTISEMENT,
            },
            {
              title: "Funkcjonalność",
              description:
                "Pliki cookies używane do funkcjonalności pozwalają użytkownikowi na interakcję z usługą i korzystanie z podstawowych funkcji, takich jak wybór języka, optymalizacja produktu czy przechowywanie zawartości koszyka.",
              linkedCategory: CAT_FUNCTIONALITY,
            },
            {
              title: "Bezpieczeństwo",
              description:
                "Pliki cookies związane z bezpieczeństwem służą do uwierzytelniania użytkowników, zapobiegania oszustwom i ochrony użytkownika podczas korzystania z usług.",
              linkedCategory: CAT_SECURITY,
            },
            {
              title: "Więcej informacji",
              description:
                'W przypadku pytań dotyczących polityki cookies i Twoich wyborów prosimy o <a href="/kontakt">kontakt</a>.',
            },
          ],
        },
      },
    },
  },
};
