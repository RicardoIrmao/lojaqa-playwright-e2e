import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// 1. Definição dos tipos das fixtures customizadas
type MyFixtures = {
  loginPage: LoginPage;
  authenticatedPage: LoginPage;
};

// 2. Extensão do 'test' base com as fixtures
export const test = base.extend<MyFixtures>({
  // Fixture 1: Entrega a instância de LoginPage pronta e navegada
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // Fixture 2: Entrega a página já autenticada no sistema
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@system.com', 'senha12345');
    await page.waitForURL(/.*painel.html/);
    await use(loginPage);
  },
});

// Re-exporta o expect para facilitar o import nos testes
export { expect };