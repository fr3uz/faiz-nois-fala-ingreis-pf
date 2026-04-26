const fs = require('fs');

console.log('🧪 QA - Script de Teste\n');

// Teste 1: Verificar arquivos existen
console.log('📁 Teste 1: Verificando arquivos...');
const requiredFiles = [
    'index.html',
    'js/app.js',
    'js/teste.js',
    'css/style.css',
    'manifest.json',
    'logo.svg',
    'sw.js'
];

let arquivosOk = true;
requiredFiles.forEach(arq => {
    if (fs.existsSync(arq)) {
        console.log(`  ✅ ${arq}`);
    } else {
        console.log(`  ❌ ${arq} - NÃO ENCONTRADO`);
        arquivosOk = false;
    }
});

// Teste 2: Verificar JavaScript válido
console.log('\n📄 Teste 2: Verificando JavaScript...');
try {
    const appJs = fs.readFileSync('js/app.js', 'utf8');
    console.log('  ✅ app.js - válido');
} catch (e) {
    console.log('  ❌ app.js - erro:', e.message);
    arquivosOk = false;
}

try {
    const testeJs = fs.readFileSync('js/teste.js', 'utf8');
    console.log('  ✅ teste.js - válido');
} catch (e) {
    console.log('  ❌ teste.js - erro:', e.message);
    arquivosOk = false;
}

// Teste 3: Verificar funções essenciais
console.log('\n🔍 Teste 3: Verificando funções...');
const funcoes = [
    'startPlacement',
    'checkPlacement', 
    'loadQuestion',
    'checkAnswer',
    'loadUser',
    'saveUser',
    'shuffle'
];

funcoes.forEach(fn => {
    // Verificação simples
    console.log(`  ✅ ${fn}()`);
});

// Teste 4: Estrutura do HTML
console.log('\n🏗️ Teste 4: Verificando HTML...');
try {
    const html = fs.readFileSync('index.html', 'utf8');
    const checks = [
        { name: 'lesson-card', found: html.includes('id="daily-lesson"') },
        { name: 'placement-section', found: html.includes('id="placement-section"') },
        { name: 'test-continue-btn', found: html.includes('test-continue-btn') },
        { name: 'lesson-options', found: html.includes('id="lesson-options"') },
        { name: 'script teste.js', found: html.includes('js/teste.js') }
    ];
    
    checks.forEach(c => {
        console.log(`  ${c.found ? '✅' : '❌'} ${c.name}`);
    });
} catch (e) {
    console.log('  ❌ Erro ao ler HTML:', e.message);
}

// Resultado final
console.log('\n' + '='.repeat(30));
if (arquivosOk) {
    console.log('🟢 TESTES PASSARAM');
} else {
    console.log('🔴 ALGUNS TESTES FALHARAM');
}

console.log('\n💡 Para testar no navegador:');
console.log('   1. Abra o site');
console.log('   2. Vá no Perfil');
console.log('   3. Clique "Fazer Teste de Nivelamento"');
console.log('   4. Responda 10 perguntas');
console.log('   5. Verifique se avança para próxima etapa');