# 📄 Gerador de Certificados em PDF

Um aplicativo web simples e personalizável para gerar certificados em PDF diretamente no navegador.  
Desenvolvido com **HTML**, **JavaScript**, **TailwindCSS**, **jsPDF** e **html2canvas**.

## 🚀 Funcionalidades

- **Personalização completa do certificado**  
  - Título  
  - Logo da empresa  
  - Nome do participante  
  - CPF  
  - Nome e credenciais do instrutor  
  - Descrição e detalhes com **tags dinâmicas** (`<NOME_INSTRUTOR>`, `<CARGA_HORARIA>`, `<DATA_CONCLUSAO>`, etc.)  
  - Conteúdo programático (segunda página do PDF)

- **Visualização em tempo real**  
  Ao editar os campos, o certificado é atualizado imediatamente na pré-visualização.

- **Exportação em PDF**  
  Gera um PDF com **qualidade de impressão** (captura em alta resolução).

- **Paginação no preview**  
  Alterna entre Página 1 e Página 2 para visualização e exportação.

## 🛠 Tecnologias Utilizadas

- **[Tailwind CSS](https://tailwindcss.com/)** para estilização
- **[jsPDF](https://github.com/parallax/jsPDF)** para geração do PDF
- **[html2canvas](https://github.com/niklasvh/html2canvas)** para captura da tela
- **[Feather Icons](https://feathericons.com/)** para ícones
- **JavaScript Vanilla** para a lógica de interação

## 📥 Como Usar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/GlauberAlc/gerador-de-laudos-PDF.git
   cd gerador-de-laudos-PDF

2. Abra o arquivo home.html no seu navegador.

Preencha os campos do formulário para configurar:

Logo

Informações do certificado

Dados do participante e instrutor

Conteúdo programático

4. Clique em "Gerar PDF" para baixar o certificado.

🤝 Contribuindo
Contribuições são bem-vindas! Para colaborar:

Faça um fork do projeto

Crie uma branch para sua modificação (git checkout -b minha-feature)

Commit suas alterações (git commit -m 'Minha nova feature')

Push para a branch (git push origin minha-feature)

Abra um Pull Request

📄 Licença
Este projeto está licenciado sob a licença MIT — veja o arquivo LICENSE para mais detalhes.