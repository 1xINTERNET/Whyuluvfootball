import "@orestbida/iframemanager";
import { run, getUserPreferences, acceptService } from "vanilla-cookieconsent";

const im = iframemanager();

document.body.classList.add("cc--darkmode");

im.run({
  onChange: ({ changedServices, eventSource }) => {
    if (eventSource.type === "click") {
      const servicesToAccept = [
        ...getUserPreferences().acceptedServices["analytics"],
        ...changedServices,
      ];

      acceptService(servicesToAccept, "analytics");
    }
  },

  currLang: "en",

  services: {
    youtube: {
      embedUrl: "https://www.youtube-nocookie.com/embed/{data-id}",
      thumbnailUrl: "https://i3.ytimg.com/vi/{data-id}/hqdefault.jpg",

      iframe: {
        allow:
          "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen;",
      },

      languages: {
        en: {
          notice:
            'This content is hosted by a third party. By showing the external content you accept the <a rel="noreferrer noopener" href="https://www.youtube.com/t/terms" target="_blank">terms and conditions</a> of youtube.com.',
          loadAllBtn: "Accept and Load",
        },
      },
    },
  },
});

run({
  guiOptions: {
    consentModal: {
      layout: "box inline",
      position: "bottom right",
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  onConsent: () => {
    window.dispatchEvent(new CustomEvent("ptupdate"));
  },

  onChange: () => {
    window.dispatchEvent(new CustomEvent("ptupdate"));
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    analytics: {
      services: {
        youtube: {
          label: "Youtube Embed",
          onAccept: () => im.acceptService("youtube"),
          onReject: () => im.rejectService("youtube"),
        },
      },
    },
  },
  language: {
    default: "en",
    autoDetect: "browser",
    translations: {
      en: {
        consentModal: {
          title: "Hello football fans, it's cookie time!",
          description:
            "We use cookies and other tech to enhance your website experience. With your consent, we improve usability and may share data with partners. Details, revocation options, and data transfer info are in our privacy policy.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          footer: '<a href="/privacy-policy">Privacy Policy</a>',
        },
        preferencesModal: {
          title: "Consent Preferences Center",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close modal",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Analytics Cookies",
              description:
                "These services help us to improve our website by collecting and reporting information about its use.",
              linkedCategory: "analytics",
            },
          ],
        },
      },
    },
  },
});
