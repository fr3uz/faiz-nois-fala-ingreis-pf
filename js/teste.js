/* FNFIPF - Sistema de Nivelamento com Etapas */

// 3 Etapas: Básico, Intermediário, Avançado
const etapas = {
    basico: {
        nome: "Básico",
        desc: "Inglês do dia a dia",
        cor: "#00d4aa",
        perguntas: [
            { q: "Hello, my name ___ John.", o: ["is", "are", "am", "be"], a: 0 },
            { q: "How ___ you today?", o: ["are", "is", "am", "be"], a: 0 },
            { q: "I ___ a student.", o: ["am", "is", "are", "be"], a: 0 },
            { q: "She ___ from Brazil.", o: ["is", "are", "am", "be"], a: 0 },
            { q: "They ___ students.", o: ["are", "is", "am", "be"], a: 0 },
            { q: "We ___ friends.", o: ["are", "is", "am", "be"], a: 0 },
            { q: "It ___ a book.", o: ["is", "are", "am", "be"], a: 0 },
            { q: "You ___ my friend.", o: ["are", "is", "am", "be"], a: 0 },
            { q: "He ___ a teacher.", o: ["is", "are", "am", "be"], a: 0 },
            { q: "I ___ 25 years old.", o: ["am", "is", "are", "be"], a: 0 }
        ],
        acertosNecessarios: 7
    },
    intermediario: {
        nome: "Intermediário",
        desc: "Inglês para trabalho e viagem",
        cor: "#7c3aed",
        perguntas: [
            { q: "She ___ to the store every day.", o: ["goes", "go", "going", "gone"], a: 0 },
            { q: "He ___ English very well.", o: ["speaks", "speak", "speaking", "spoke"], a: 0 },
            { q: "___ you speak English?", o: ["Do", "Does", "Is", "Are"], a: 0 },
            { q: "I usually ___ coffee in the morning.", o: ["drink", "drinks", "drinking", "drank"], a: 0 },
            { q: "The book ___ on the table.", o: ["is", "are", "am", "be"], a: 0 },
            { q: "I ___ a car.", o: ["have", "has", "had", "having"], a: 0 },
            { q: "She ___ two brothers.", o: ["has", "have", "had", "having"], a: 0 },
            { q: "I ___ to the park yesterday.", o: ["went", "go", "gone", "going"], a: 0 },
            { q: "She ___ the movie last week.", o: ["watched", "watch", "watching", "watches"], a: 0 },
            { q: "They ___ English when they lived in the US.", o: ["studied", "study", "studying", "studies"], a: 0 }
        ],
        acertosNecessarios: 7
    },
    avancado: {
        nome: "Avançado",
        desc: "Inglês fluente",
        cor: "#f472b6",
        perguntas: [
            { q: "If I ___ rich, I'd buy a house.", o: ["were", "was", "am", "are"], a: 0 },
            { q: "If she ___ here, she'd help us.", o: ["were", "was", "is", "are"], a: 0 },
            { q: "I wish I ___ speak Spanish.", o: ["could", "can", "will", "may"], a: 0 },
            { q: "She said that she ___ tired.", o: ["was", "is", "were", "am"], a: 0 },
            { q: "The house ___ built last year.", o: ["was", "is", "were", "are"], a: 1 },
            { q: "If I ___ harder, I would have passed.", o: ["had studied", "studied", "study", "studies"], a: 0 },
            { q: "This time tomorrow, I ___ in London.", o: ["will be flying", "will fly", "am flying", "flying"], a: 0 },
            { q: "By next month, I ___ here for a year.", o: ["will have been", "will be", "am", "was"], a: 0 },
            { q: "It's essential that she ___ on time.", o: ["arrives", "arrived", "arrive", "arriving"], a: 0 },
            { q: "I demand that he ___ the truth.", o: ["tell", "tells", "told", "telling"], a: 0 }
        ],
        acertosNecessarios: 7
    }
};

// Ordem das etapas
const ordemEtapas = ["basico", "intermediario", "avancado"];

// Variáveis do teste
let testeAtual = {
    etapa: "basico",
    etapaIndex: 0,
    acertos: 0,
    totalPerguntas: 0,
    emTransicao: false
};

let currentQ = null;

// ===== FUNÇÕES DO TESTE =====
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function startTeste() {
    testeAtual = {
        etapa: "basico",
        etapaIndex: 0,
        acertos: 0,
        totalPerguntas: 0,
        emTransicao: false
    };
    
    mostraPergunta();
}

function mostraPergunta() {
    const etapaObj = etapas[testeAtual.etapa];
    const perguntas = etapaObj.perguntas;
    
    if (testeAtual.etapaIndex >= perguntas.length) {
        if (testeAtual.acertos >= etapaObj.acertosNecessarios) {
            mostraTransicao();
        } else {
            mostraResultadoEtapa(false);
        }
        return;
    }
    
    const raw = perguntas[testeAtual.etapaIndex];
    const opts = shuffle(raw.o);
    const correta = raw.o[raw.a];
    
    currentQ = { q: raw.q, opts: opts, resposta: correta };
    
    // Barra de progresso
    const progresso = (testeAtual.etapaIndex / perguntas.length) * 100;
    const divProgresso = document.getElementById('test-progress');
    if (divProgresso) {
        divProgresso.innerHTML = `
            <div style="background:var(--bg); border-radius:8px; height:8px; overflow:hidden; margin-bottom:8px;">
                <div style="background:${etapaObj.cor}; height:100%; width:${progresso}%; transition:width 0.3s;"></div>
            </div>
            <p style="font-size:0.75rem; color:var(--text-muted); text-align:center;">
                ${etapaObj.nome} • ${testeAtual.etapaIndex + 1}/${perguntas.length} • Acertos: ${testeAtual.acertos}/${etapaObj.acertosNecessarios}
            </p>
        `;
    }
    
    const divQ = document.getElementById('placement-question');
    if (divQ) {
        divQ.innerHTML = `
            <p style="font-size:1.1rem; margin-bottom:8px;">${raw.q}</p>
            <p style="font-size:0.75rem; color:${etapaObj.cor};">${etapaObj.nome}</p>
        `;
    }
    
    const btns = document.querySelectorAll('#placement-options .option');
    btns.forEach((btn, i) => {
        btn.textContent = opts[i];
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    
    const resDiv = document.getElementById('placement-result');
    if (resDiv) resDiv.textContent = '';
}

function checkResposta(btn) {
    if (!currentQ || testeAtual.emTransicao) return;
    
    const btns = document.querySelectorAll('#placement-options .option');
    btns.forEach(b => b.disabled = true);
    
    const texto = btn.textContent;
    const respostaCerta = currentQ.resposta;
    
    if (texto === respostaCerta) {
        btn.classList.add('correct');
        testeAtual.acertos++;
        const resDiv = document.getElementById('placement-result');
        if (resDiv) resDiv.textContent = '✅ Correto!';
    } else {
        btn.classList.add('wrong');
        btns.forEach(b => {
            if (b.textContent === respostaCerta) b.classList.add('correct');
        });
        const resDiv = document.getElementById('placement-result');
        if (resDiv) resDiv.textContent = '❌ ' + respostaCerta;
    }
    
    testeAtual.etapaIndex++;
    
    setTimeout(() => {
        const etapaObj = etapas[testeAtual.etapa];
        
        if (testeAtual.etapaIndex >= etapaObj.perguntas.length) {
            if (testeAtual.acertos >= etapaObj.acertosNecessarios) {
                mostraTransicao();
            } else {
                mostraResultadoEtapa(false);
            }
        } else {
            mostraPergunta();
        }
    }, 1500);
}

function mostraTransicao() {
    testeAtual.emTransicao = true;
    const etapaIdx = ordemEtapas.indexOf(testeAtual.etapa);
    const etapaObj = etapas[testeAtual.etapa];
    
    if (etapaIdx < ordemEtapas.length - 1) {
        const proxima = etapas[ordemEtapas[etapaIdx + 1]];
        
        const divQ = document.getElementById('placement-question');
        if (divQ) {
            divQ.innerHTML = `
                <div style="text-align:center; padding:20px;">
                    <h2 style="color:${etapaObj.cor}; font-size:1.5rem;">🎉 Você avançou!</h2>
                    <p style="font-size:1.2rem; margin:16px 0;">Próxima etapa: ${proxima.nome}</p>
                </div>
            `;
        }
        
        const resDiv = document.getElementById('placement-result');
        if (resDiv) resDiv.textContent = '';
        
        const optsDiv = document.getElementById('placement-options');
        if (optsDiv) optsDiv.style.display = 'none';
        
        const continuarBtn = document.getElementById('test-continue-btn');
        if (continuarBtn) {
            continuarBtn.style.display = 'block';
            continuarBtn.onclick = () => {
                testeAtual.etapa = ordemEtapas[etapaIdx + 1];
                testeAtual.etapaIndex = 0;
                testeAtual.acertos = 0;
                testeAtual.emTransicao = false;
                
                const optsDiv2 = document.getElementById('placement-options');
                if (optsDiv2) optsDiv2.style.display = 'grid';
                
                const contBtn = document.getElementById('test-continue-btn');
                if (contBtn) contBtn.style.display = 'none';
                
                mostraPergunta();
            };
        }
    } else {
        finishTesteCompleto();
    }
}

function mostraResultadoEtapa(passou) {
    testeAtual.emTransicao = true;
    const etapaObj = etapas[testeAtual.etapa];
    
    const divQ = document.getElementById('placement-question');
    if (divQ) {
        divQ.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <h2 style="color:${passou ? '#00d4aa' : '#fbbf24'}; font-size:1.3rem;">
                    ${passou ? '✅ Etapa concluída!' : '⚠️ Tente novamente'}
                </h2>
                <p style="margin:16px 0;">Acertos: ${testeAtual.acertos}/${etapaObj.acertosNecessarios}</p>
            </div>
        `;
    }
    
    const optsDiv = document.getElementById('placement-options');
    if (optsDiv) optsDiv.style.display = 'none';
    
    const continuarBtn = document.getElementById('test-continue-btn');
    if (continuarBtn) {
        continuarBtn.style.display = 'block';
        continuarBtn.textContent = passou ? 'Continuar' : 'Tentar novamente';
        continuarBtn.onclick = () => {
            testeAtual.etapaIndex = 0;
            testeAtual.acertos = 0;
            testeAtual.emTransicao = false;
            
            const optsDiv2 = document.getElementById('placement-options');
            if (optsDiv2) optsDiv2.style.display = 'grid';
            
            const contBtn = document.getElementById('test-continue-btn');
            if (contBtn) contBtn.style.display = 'none';
            
            mostraPergunta();
        };
    }
}

function finishTesteCompleto() {
    user.placementDone = true;
    user.currentLevel = 3;
    user.xp += (testeAtual.acertos * 10);
    saveUser();
    
    document.getElementById('placement-section').style.display = 'none';
    document.getElementById('daily-lesson').style.display = 'block';
    
    const divP = document.getElementById('lesson-prompt');
    if (divP) {
        divP.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <h2 style="color:#f472b6;">🏆 Teste Concluído!</h2>
                <p style="font-size:1.2rem; margin:16px 0;">Nível: Fluente</p>
            </div>
        `;
    }
    
    setTimeout(() => loadQuestion(), 3000);
}

// Wrapper para funcionar com o HTML existente
function startPlacement() {
    if (user.placementDone) {
        if (!confirm('Você já fez o teste antes. Quer refazer? Todo o progresso será perdido.')) {
            return;
        }
    }
    
    user.placementDone = false;
    saveUser();
    
    document.getElementById('daily-lesson').style.display = 'none';
    document.getElementById('profile-section').style.display = 'none';
    document.getElementById('placement-section').style.display = 'block';
    
    const optsDiv = document.getElementById('placement-options');
    if (optsDiv) optsDiv.style.display = 'grid';
    
    const contBtn = document.getElementById('test-continue-btn');
    if (contBtn) contBtn.style.display = 'none';
    
    startTeste();
}

function checkPlacement(btn) {
    checkResposta(btn);
}