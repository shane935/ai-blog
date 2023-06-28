import { Builder } from "selenium-webdriver";

export const getDriver = () => new Builder().forBrowser("safari").build();
