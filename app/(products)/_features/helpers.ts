import { WebDriver } from "selenium-webdriver";

export const waitForURL = async (url: string, driver: WebDriver) => {
  const urlCheck = async () => {
    return (await driver.getCurrentUrl()) === url;
  };
  await driver.wait(urlCheck, 5000);
};
