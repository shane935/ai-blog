import { Builder } from "selenium-webdriver";

export const driver = new Builder().forBrowser("safari").build();
