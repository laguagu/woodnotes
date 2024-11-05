import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const langCookie = cookieStore.get("NEXT_LOCALE");
  const locale = langCookie?.value || "en";

  try {
    const messages = (await import(`../../lib/messages/${locale}.json`))
      .default;
    return {
      locale,
      messages,
      timeZone: "Europe/Helsinki",
    };
  } catch (error) {
    console.error("Error loading messages:", error);
    // Fallback englantiin jos tulee virhe
    const messages = (await import("../../lib/messages/en.json")).default;
    return {
      locale: "en",
      messages,
      timeZone: "Europe/Helsinki",
    };
  }
});
