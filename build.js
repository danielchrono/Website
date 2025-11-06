import { minify } from 'terser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function build() {
  try {
    console.log('🔨 Iniciando build de produção...');

    // Ler e minificar o JavaScript
    const jsPath = path.join(__dirname, 'src', 'main.ts');
    let jsContent = await fs.readFile(jsPath, 'utf-8');
    
    // Remover imports/export para compatibilidade
    jsContent = jsContent.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
    jsContent = jsContent.replace(/export\s+.*?;/g, '');
    
    const minified = await minify(jsContent, {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: {
        toplevel: true
      },
      format: {
        comments: false
      }
    });

    if (minified.code) {
      // Criar diretório dist se não existir
      await fs.mkdir(path.join(__dirname, 'dist'), { recursive: true });
      await fs.mkdir(path.join(__dirname, 'dist', 'src'), { recursive: true });
      
      // Salvar JavaScript minificado
      await fs.writeFile(path.join(__dirname, 'dist', 'src', 'main.min.js'), minified.code);
      console.log('✅ JavaScript minificado com sucesso');
    }

    // Copiar arquivos estáticos
    await copyDir('public', 'dist');
    console.log('✅ Arquivos estáticos copiados');

    // Criar HTML otimizado
    await createOptimizedHTML();
    console.log('✅ HTML otimizado criado');

    console.log('🎉 Build concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante o build:', error);
    process.exit(1);
  }
}

async function copyDir(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error(`Erro ao copiar ${src} para ${dest}:`, error);
  }
}

async function createOptimizedHTML() {
  const htmlContent = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Daniel Lopes | Engenheiro de Software & Especialista em Logística</title>

    <!-- Meta Tags OG -->
    <meta property="og:title" content="Daniel Lopes | Portfólio de Engenharia de Software e Logística" />
    <meta property="og:description" content="Explore meu portfólio: projetos de desenvolvimento web, habilidades e experiência em logística e engenharia." />
    <meta property="og:image" content="/assets/profile-img.jpg" />
    <meta property="og:url" content="https://danielchrono.github.io/Personal-Website/" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Portfólio de Daniel Lopes" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="600" />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Daniel Lopes | Portfólio de Engenharia de Software e Logística" />
    <meta name="twitter:description" content="Explore meu portfólio: projetos de desenvolvimento web, habilidades e experiência em logística e engenharia." />
    <meta name="twitter:image" content="/assets/profile-img.jpg" />

    <!-- Fonts & Icons -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

    <!-- Styles -->
    <style>
      ${await getMinifiedCSS()}
    </style>

    <link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Ctext%20y%3D%22.9em%22%20font-size%3D%2290%22%3E%F0%9F%9A%9B%3C%2Ftext%3E%3C%2Fsvg%3E" />
</head>
<body>
    <div id="app"></div>
    <script>
      ${await fs.readFile(path.join(__dirname, 'dist', 'src', 'main.min.js'), 'utf-8')}
    </script>
</body>
</html>`;

  await fs.writeFile(path.join(__dirname, 'dist', 'index.html'), htmlContent);
}

async function getMinifiedCSS() {
  const cssContent = await fs.readFile(path.join(__dirname, 'src', 'style.css'), 'utf-8');
  // Minificação básica de CSS
  return cssContent
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comentários
    .replace(/\s+/g, ' ') // Remove espaços extras
    .replace(/;\s*/g, ';')
    .replace(/:\s*/g, ':')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .trim();
}

build();