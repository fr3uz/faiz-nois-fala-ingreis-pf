/* FNFIPF - JavaScript Simples e Funcional */

// ===== DADOS =====
const idiomas = {
    en: 'English',
    fr: 'Français'
};

const perguntas = {
    basico: [
        { q: "Hello, my name ___ John.", a: "is", o: ["is", "are", "am", "be"] },
        { q: "How ___ you today?", a: "are", o: ["are", "is", "am", "be"] },
        { q: "I ___ a student.", a: "am", o: ["am", "is", "are", "be"] },
        { q: "She ___ from Brazil.", a: "is", o: ["is", "are", "am", "be"] },
        { q: "They ___ students.", a: "are", o: ["are", "is", "am", "be"] },
        { q: "We ___ friends.", a: "are", o: ["are", "is", "am", "be"] },
        { q: "It ___ a book.", a: "is", o: ["is", "are", "am", "be"] },
        { q: "You ___ my friend.", a: "are", o: ["are", "is", "am", "be"] },
        { q: "He ___ a teacher.", a: "is", o: ["is", "are", "am", "be"] },
        { q: "I live ___ Brazil.", a: "in", o: ["in", "on", "at", "to"] },
        { q: "___ is your name?", a: "What", o: ["What", "Who", "Where", "How"] },
        { q: "___ are you from?", a: "Where", o: ["Where", "What", "Who", "How"] },
        { q: "I ___ 25 years old.", a: "am", o: ["am", "is", "are", "be"] },
        { q: "She works ___ a bank.", a: "at", o: ["at", "in", "on", "to"] },
        { q: "I need ___ apple.", a: "an", o: ["an", "a", "the", "some"] }
    ],
    intermediario: [
        { q: "She ___ to the store every day.", a: "goes", o: ["goes", "go", "going", "gone"] },
        { q: "He ___ English very well.", a: "speaks", o: ["speaks", "speak", "speaking", "spoke"] },
        { q: "___ you speak English?", a: "Do", o: ["Do", "Does", "Is", "Are"] },
        { q: "I usually ___ coffee.", a: "drink", o: ["drink", "drinks", "drinking", "drank"] },
        { q: "The book ___ on the table.", a: "is", o: ["is", "are", "am", "be"] },
        { q: "I ___ a car.", a: "have", o: ["have", "has", "had", "having"] },
        { q: "She ___ two brothers.", a: "has", o: ["has", "have", "had", "having"] },
        { q: "I ___ to the park yesterday.", a: "went", o: ["went", "go", "gone", "going"] },
        { q: "She ___ the movie.", a: "watched", o: ["watched", "watch", "watching", "watches"] },
        { q: "They ___ in the US.", a: "studied", o: ["studied", "study", "studying", "studies"] },
        { q: "It ___ very cold.", a: "was", o: ["was", "is", "were", "been"] },
        { q: "She ___ tired.", a: "was", o: ["was", "is", "were", "am"] },
        { q: "You ___ speak well.", a: "can", o: ["can", "could", "will", "would"] },
        { q: "I think she ___ come.", a: "will", o: ["will", "would", "can", "could"] },
        { q: "I ___ to Brazil.", a: "went", o: ["went", "have been", "been", "was"] }
    ],
    avancado: [
        { q: "If I ___ rich, I'd buy a house.", a: "were", o: ["were", "was", "am", "are"] },
        { q: "If she ___ here, she'd help.", a: "were", o: ["were", "was", "is", "are"] },
        { q: "I wish I ___ speak Spanish.", a: "could", o: ["could", "can", "will", "may"] },
        { q: "She said that she ___ tired.", a: "was", o: ["was", "is", "were", "am"] },
        { q: "The house ___ built.", a: "was", o: ["was", "is", "were", "are"] },
        { q: "If I ___ harder, I'd pass.", a: "had studied", o: ["had studied", "studied", "study", "studies"] },
        { q: "This time tomorrow, I ___ flying.", a: "will be flying", o: ["will be flying", "will fly", "am flying", "flying"] },
        { q: "By next month, I ___ here.", a: "will have been", o: ["will have been", "will be", "am", "was"] },
        { q: "It's essential that she ___ on time.", a: "arrives", o: ["arrives", "arrived", "arrive", "arriving"] },
        { q: "I demand that he ___ the truth.", a: "tell", o: ["tell", "tells", "told", "telling"] },
        { q: "You'd better ___ now.", a: "leave", o: ["leave", "to leave", "leaving", "left"] },
        { q: "She ___ be the manager.", a: "might", o: ["might", "can", "must", "will"] },
        { q: "I wish I ___ that.", a: "hadn't said", o: ["hadn't said", "didn't say", "don't say", "haven't said"] },
        { q: "If only she ___ first.", a: "had known", o: ["had known", "knew", "know", "known"] },
        { q: "She acts as if she ___ the owner.", a: "was", o: ["was", "is", "were", "are"] }
    ]
};

const etapas = ['basico', 'intermediario', 'avancado'];
const acertosNecessarios = 10;

// ===== ESTADO =====
let user = {
    xp: 0,
    streak: 0,
    hearts: 5,
    nivel: '-',
    testFeito: false,
    testeEtapa: 0,
    testeAcertos: 0,
    testeIndex: 0
};

let currentLang = 'en';
let currentQ = null;

// ===== INICIALIZAÇÃO =====
function init() {
    loadUser();
    updateDisplay();
    mostrar('home');
}

// ===== STORAGE =====
function loadUser() {
    const saved = localStorage.getItem('fnfipf_user');
    if (saved) {
        try {
            user = JSON.parse(saved);
        } catch(e) {
            console.log('Erro ao carregar:', e);
        }
    }
    
    // Carrega idioma
    const lang = localStorage.getItem('fnfipf_lang');
    if (lang) currentLang = lang;
}

function saveUser() {
    localStorage.setItem('fnfipf_user', JSON.stringify(user));
}

function saveLang() {
    localStorage.setItem('fnfipf_lang', currentLang);
}

// ===== DISPLAY =====
function updateDisplay() {
    document.getElementById('xp').textContent = user.xp;
    document.getElementById('streak').textContent = user.streak;
    document.getElementById('hearts').textContent = user.hearts;
    document.getElementById('xp-bar').style.width = (user.xp % 1000) / 10 + '%';
    
    document.getElementById('profile-xp').textContent = user.xp;
    document.getElementById('profile-streak').textContent = user.streak;
    document.getElementById('profile-hearts').textContent = user.hearts;
    document.getElementById('profile-level').textContent = user.nivel;
    document.getElementById('profile-test').textContent = user.testFeito ? 'Concluído' : 'Não feito';
    
    document.getElementById('lang').value = currentLang;
}

// ===== NAVEGAÇÃO =====
function mostrar(id) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('test').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById(id).style.display = 'block';
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.nav-btn')?.classList.add('active');
}

// ===== trocarIdioma =====
function trocarIdioma(lang) {
    currentLang = lang;
    saveLang();
    updateDisplay();
}

// ===== LIÇÃO DIÁRIA =====
function loadQuestion() {
    if (!user.testFeito) {
        document.getElementById('question').innerHTML = '<strong>⚠️ Faça o teste primeiro!</strong><p>Vá na aba Teste</p>';
        document.getElementById('options').style.display = 'none';
        return;
    }
    
    // Escolhe nível baseado no progresso
    const nivelIndex = Math.floor(user.xp / 1000);
    const nivel = nivelIndex >= 3 ? 'avancado' : nivelIndex >= 2 ? 'intermediario' : 'basico';
    const lista = perguntas[nivel];
    
    // Escolhe pergunta aleatória
    const randomQ = Math.floor(Math.random() * lista.length);
    const p = lista[randomQ];
    
    // Embaralha opções
    const opts = [...p.o].sort(() => Math.random() - 0.5);
    
    currentQ = { resposta: p.a, nivel: nivel };
    
    document.getElementById('question').innerHTML = `<p>${p.q}</p><small style="color:var(--primary)">${nivel.toUpperCase()}</small>`;
    document.getElementById('options').style.display = 'grid';
    
    const btns = document.querySelectorAll('#options button');
    btns.forEach((btn, i) => {
        btn.textContent = opts[i];
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    
    document.getElementById('result').textContent = '';
    
    // Carrega primeira questão
    loadQuestion();
}

// ===== RESPONDER =====
function responder(btn) {
    if (!currentQ) return;
    
    const btns = document.querySelectorAll('#options button');
    btns.forEach(b => b.disabled = true);
    
    if (btn.textContent === currentQ.resposta) {
        btn.classList.add('correct');
        user.xp += 10;
        document.getElementById('result').innerHTML = '✅ Correto!';
    } else {
        btn.classList.add('wrong');
        user.hearts--;
        btns.forEach(b => {
            if (b.textContent === currentQ.resposta) b.classList.add('correct');
        });
        document.getElementById('result').innerHTML = '❌ ' + currentQ.resposta;
    }
    
    if (user.hearts <= 0) user.hearts = 5;
    
    saveUser();
    updateDisplay();
    
    setTimeout(loadQuestion, 1500);
}

// ===== TESTE DE NIVELAMENTO =====
function iniciarTeste() {
    user.testeEtapa = 0;
    user.testeAcertos = 0;
    user.testeIndex = 0;
    
    document.getElementById('test').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    
    loadPerguntaTeste();
}

function loadPerguntaTeste() {
    const etapa = etapas[user.testeEtapa];
    const lista = perguntas[etapa];
    
    if (user.testeIndex >= lista.length) {
        // Verifica se passou
        if (user.testeAcertos >= 10) {
            if (user.testeEtapa < 2) {
                // Passou - mostra transição
                const nextEtapa = etapas[user.testeEtapa + 1];
                document.getElementById('test-question').innerHTML = `<h3>🎉 Avanzou!</h3><p>Próxima: ${nextEtapa}</p>`;
                document.getElementById('test-options').style.display = 'none';
                document.getElementById('start-test-btn').style.display = 'none';
                document.getElementById('next-test-btn').style.display = 'block';
            } else {
                // Final!
                finalizouTeste();
            }
        } else {
            // Não passou
            document.getElementById('test-question').innerHTML = `<h3>⚠️ Não passou</h3><p>Tente novamente</p>`;
            document.getElementById('test-options').style.display = 'none';
            document.getElementById('start-test-btn').style.display = 'block';
            document.getElementById('start-test-btn').textContent = 'Tentar Novamente';
        }
        return;
    }
    
    const p = lista[user.testeIndex];
    const opts = [...p.o].sort(() => Math.random() - 0.5);
    
    currentQ = { resposta: p.a };
    
    // Progresso
    const progresso = (user.testeIndex / lista.length) * 100;
    document.getElementById('test-progress').style.width = progresso + '%';
    
    document.getElementById('test-question').innerHTML = `<p>${p.q}</p><small>${etapa} • ${user.testeIndex + 1}/${lista.length}</small>`;
    document.getElementById('test-options').style.display = 'grid';
    
    const btns = document.querySelectorAll('#test-options button');
    btns.forEach((btn, i) => {
        btn.textContent = opts[i];
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    
    document.getElementById('test-result').textContent = '';
    document.getElementById('start-test-btn').style.display = 'none';
}

function responderTeste(btn) {
    if (!currentQ) return;
    
    const btns = document.querySelectorAll('#test-options button');
    btns.forEach(b => b.disabled = true);
    
    if (btn.textContent === currentQ.resposta) {
        btn.classList.add('correct');
        user.testeAcertos++;
        document.getElementById('test-result').innerHTML = '✅ Correto!';
    } else {
        btn.classList.add('wrong');
        btns.forEach(b => {
            if (b.textContent === currentQ.resposta) b.classList.add('correct');
        });
        document.getElementById('test-result').innerHTML = '❌ ' + currentQ.resposta;
    }
    
    user.testeIndex++;
    
    setTimeout(loadPerguntaTeste, 1200);
}

function proximaEtapa() {
    user.testeEtapa++;
    user.testeIndex = 0;
    user.testeAcertos = 0;
    
    document.getElementById('next-test-btn').style.display = 'none';
    loadPerguntaTeste();
}

function finalizouTeste() {
    user.testFeito = true;
    user.nivel = 'Fluente';
    saveUser();
    updateDisplay();
    
    document.getElementById('test-question').innerHTML = '<h3>🏆 Teste Concluído!</h3><p>Nível: Fluente</p>';
    document.getElementById('test-options').style.display = 'none';
    document.getElementById('test-progress').style.width = '100%';
    
    setTimeout(() => {
        mostrar('home');
    }, 2000);
}

// ===== RESETAR =====
function resetar() {
    if (confirm('Tem certeza? Todo progresso será perdido.')) {
        user = { xp: 0, streak: 0, hearts: 5, nivel: '-', testFeito: false, testeEtapa: 0, testeAcertos: 0, testeIndex: 0 };
        saveUser();
        updateDisplay();
        location.reload();
    }
}

// ===== INICIA =====
init();