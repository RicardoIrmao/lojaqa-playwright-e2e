import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const cenarios = [
  {
    descricao: 'Cliente válido',
    email: 'user@system.com',
    senha: 'senha12345',
    sucesso: true,
    urlEsperada: '/painel.html',
    mensagemErroEsperada: '',
  },
  {
    descricao: 'Administrador válido',
    email: 'admin@system.com',
    senha: 'adminSenha123',
    sucesso: true,
    urlEsperada: '/painel.html',
    mensagemErroEsperada: '',
  },
  {
    descricao: 'Senha incorreta',
    email: 'user@system.com',
    senha: 'senhaIncorreta123',
    sucesso: false,
    urlEsperada: '',
    mensagemErroEsperada: 'Credenciais inválidas',
  },
];

test.describe('Autenticação Data-Driven - LojaQA', () => {
  for (const cenario of cenarios) {
    test(`Login com ${cenario.descricao}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

      await loginPage.login(cenario.email, cenario.senha);

      if (cenario.sucesso) {
        await expect(page).toHaveURL(new RegExp(`.*${cenario.urlEsperada}`));
      } else {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(cenario.mensagemErroEsperada);
      }
    });
  }
});