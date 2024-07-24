import cron from "node-cron";
import { saveExchangeRates } from "../currenciesUtils/currencyRatesSaver";

cron.schedule("0 0 * * *", async () => {
  console.log("Fetching and saving exchange rates...");
  await saveExchangeRates();
});
