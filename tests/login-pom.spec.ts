import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Autenticação de Usuários - LojaQA (POM)', () => {
  test('Cenário 1 (Caminho Feliz): Login de cliente válido com redirecionamento', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@system.com', 'senha12345');
    await expect(page).toHaveURL(/.*painel.html/);
    await expect(loginPage.statusMessage).toBeVisible();
  });

  test('Cenário 2 (Caminho Triste): Login com senha incorreta exibe mensagem de erro', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@system.com', 'senhaErrada123');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Credenciais inválidas');
  });

  test('Cenário 3 (Regra de Negócio): Validar que o botão inicia desabilitado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.loginButton).toBeDisabled();
  });
});