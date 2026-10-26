import { Page, Locator } from '@playwright/test';
import * as path from 'path';

export class LoginPage {
  private readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly statusMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginBtn');
    this.errorMessage = page.locator('#errorMessage');
    this.statusMessage = page.locator('#statusMessage');
  }

  async goto(): Promise<void> {
    const filePath = path.resolve(__dirname, '../login.html').replace(/\\/g, '/');
    await this.page.goto(`file:///${filePath}`);
  }

  async login(email: string, password?: string): Promise<void> {
    if (email) {
      await this.emailInput.fill(email);
    }
    if (password) {
      await this.passwordInput.fill(password);
    }
    await this.loginButton.click();
  }
}