"use client";
import { Button } from "@nextui-org/button";
import { setCookie, hasCookie, getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/checkbox";

type CookieType = "necessary" | "analytics" | "marketing" | "preferences";

interface CookieConsents {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const isBot = (userAgent: string): boolean => {
  const botPatterns = [
    /bot/i,
    /spider/i,
    /crawl/i,
    /APIs-Google/i,
    /AdsBot/i,
    /Googlebot/i,
    /mediapartners/i,
    /Google Favicon/i,
    /FeedFetcher/i,
    /Google-Read-Aloud/i,
    /DuplexWeb-Google/i,
    /googleweblight/i,
    /bing/i,
    /yandex/i,
    /baidu/i,
    /duckduck/i,
    /yahoo/i,
    /ecosia/i,
    /ia_archiver/i,
    /facebook/i,
    /instagram/i,
    /pinterest/i,
    /reddit/i,
    /slack/i,
    /twitter/i,
    /whatsapp/i,
    /youtube/i,
    /semrush/i,
  ];
  
  return botPatterns.some(regex => regex.test(userAgent));
};

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consents, setConsents] = useState<CookieConsents>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      if (!isBot(userAgent) && !hasCookie("cookieConsent")) {
        setShowConsent(true);
      } else if (hasCookie("cookieConsent")) {
        const savedConsents = getCookie("cookieConsent");
        if (savedConsents) {
          setConsents(JSON.parse(savedConsents as string));
        }
      }
    }
  }, []);

  const handleConsentChange = (type: CookieType) => {
    setConsents((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const acceptAll = () => {
    const allConsents = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setConsents(allConsents);
    saveConsents(allConsents);
  };

  const saveConsents = (consentsToSave: CookieConsents = consents) => {
    setShowConsent(false);
    setCookie("cookieConsent", JSON.stringify(consentsToSave));

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("updateCookieConsent", { detail: consentsToSave })
      );
    }
  };

  const declineAll = () => {
    const declinedConsents = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setConsents(declinedConsents);
    saveConsents(declinedConsents);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center bottom-0 justify-center p-8 w-fit h-fit animate-appearance-in duration-500 ease-soft-spring shadow-2xl bg-background/90 backdrop-blur-lg mx-auto rounded-md border border-foreground/10">
      <div className="mb-4 max-w-sm">
        <p>
          We use cookies to enhance your browsing experience and provide
          personalized content. Would you like to accept all cookies or
          customize your preferences?
        </p>
      </div>
      {!showDetails ? (
        <div className="flex gap-4 mt-2 w-full justify-center items-center flex-wrap">
          <Button color="success" onClick={acceptAll}>
            Accept All
          </Button>
          <Button color="primary" onClick={() => setShowDetails(true)}>
            Customize
          </Button>
          <Button className="bg-red-600 text-white" onClick={declineAll}>
            Decline All
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 mb-4">
            <Checkbox isSelected={consents.necessary} isDisabled>
              Necessary (Always active)
            </Checkbox>
            <Checkbox
              isSelected={consents.analytics}
              onChange={() => handleConsentChange("analytics")}
            >
              Analytics
            </Checkbox>
            <Checkbox
              isSelected={consents.marketing}
              onChange={() => handleConsentChange("marketing")}
            >
              Marketing
            </Checkbox>
            <Checkbox
              isSelected={consents.preferences}
              onChange={() => handleConsentChange("preferences")}
            >
              Preferences
            </Checkbox>
          </div>
          <div className="flex gap-4 mt-2 w-full justify-end items-center">
            <Button color="success" onClick={() => saveConsents()}>
              Save Preferences
            </Button>
            <Button className="bg-red-600 text-white" onClick={declineAll}>
              Decline All
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
