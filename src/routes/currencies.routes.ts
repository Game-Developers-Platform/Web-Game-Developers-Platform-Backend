import { Router } from "express";
import currenciesController from "../controllers/currencies.controller";

const router = Router();

router.get("/", currenciesController.getAllCurrencies);
router.get("/ids", currenciesController.getCurrenciesByIds);
router.get("/currencyNames", currenciesController.getCurrenciesByNames);
router.post("/", currenciesController.createCurrency);
router.put("/:id", currenciesController.updateCurrency);
router.delete("/:id", currenciesController.deleteCurrency);

export default router;
