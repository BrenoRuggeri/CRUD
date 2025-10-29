// =============================
// Configurações do Frontend
// =============================
const CONFIG = {
  TICKERS: ["PETR4", "VALE3", "AAPL", "BTC-USD"],
  UPDATE_INTERVAL: 1000,
  MAX_HISTORY: 120,
  VARIATION: 0.003
};

const AppState = {
  prices: {},
  history: {},
  selected: "PETR4",
  chart: null,
  loop: null
};

// =============================
// Simulador de preços
// =============================
class PriceSimulator {
  constructor() {
    const base = { PETR4: 35.5, VALE3: 68.2, AAPL: 175.8, "BTC-USD": 45000 };
    CONFIG.TICKERS.forEach(t => {
      AppState.prices[t] = { current: base[t], open: base[t], change: 0 };
      AppState.history[t] = [base[t]];
    });
  }
  update() {
    CONFIG.TICKERS.forEach(t => {
      const p = AppState.prices[t];
      const v = (Math.random() - 0.5) * 2 * CONFIG.VARIATION;
      const newP = Math.max(0.01, p.current * (1 + v));
      p.current = +newP.toFixed(2);
      p.change = ((p.current / p.open - 1) * 100).toFixed(2);
      AppState.history[t].push(p.current);
      if (AppState.history[t].length > CONFIG.MAX_HISTORY) AppState.history[t].shift();
    });
  }
  book(symbol) {
    const p = AppState.prices[symbol].current;
    const bids = [], asks = [];
    for (let i = 1; i <= 5; i++) {
      bids.push({ price: (p - i * 0.05).toFixed(2), qty: ~~(Math.random()*900+100) });
      asks.push({ price: (p + i * 0.05).toFixed(2), qty: ~~(Math.random()*900+100) });
    }
    return { bids, asks };
  }
}

// =============================
// Gráfico
// =============================
class ChartManager {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    window.addEventListener("resize", () => this.resize());
    this.resize();
  }
  resize() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
    this.draw(AppState.selected);
  }
  draw(symbol) {
    const data = AppState.history[symbol];
    if (!data || data.length < 2) return;
    const ctx = this.ctx;
    ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    const pad = 40;
    const w = this.canvas.width - pad*2;
    const h = this.canvas.height - pad*2;
    const min = Math.min(...data), max = Math.max(...data), range = max-min||1;

    // grade
    ctx.strokeStyle = "#e5e5e5"; ctx.lineWidth = 1;
    for(let i=0;i<=4;i++){ let y=pad+(h/4)*i; ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(pad+w,y); ctx.stroke();}
    
    // linha com gradiente azul
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, "#2563eb");
    gradient.addColorStop(1, "#60a5fa");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    data.forEach((val,i)=>{
      const x=pad+(i/(data.length-1))*w;
      const y=pad+h-((val-min)/range)*h;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    });
    ctx.stroke();
  }
}

// =============================
// UI
// =============================
class UIManager {
  constructor() {
    this.sim = new PriceSimulator();
    AppState.chart = new ChartManager("priceChart");
    this.bind();
    this.populate();
  }
  bind() {
    document.getElementById("loginBtn").onclick = () => this.openModal("loginModal","Login");
    document.getElementById("registerBtn").onclick = () => this.openModal("registerModal","Registrar");
    document.addEventListener("keydown", e => { if(e.key==="Escape") this.closeModal(); });
  }
  populate() {
    const sel = document.getElementById("symbolSelect");
    CONFIG.TICKERS.forEach(t => {
      const o=document.createElement("option"); o.value=t; o.textContent=t; sel.appendChild(o);
    });
    sel.value=AppState.selected;
    sel.onchange = e => { AppState.selected=e.target.value; this.updateAll(); };
  }
  updateWatchlist() {
    const body=document.getElementById("watchlistBody"); body.innerHTML="";
    CONFIG.TICKERS.forEach(t=>{
      const p=AppState.prices[t]; 
      const tr=document.createElement("tr");
      tr.innerHTML=`<td>${t}</td>
        <td>R$ ${p.current.toFixed(2)}</td>
        <td>${p.change}%</td>
        <td>R$ ${p.open.toFixed(2)}</td>`;
      body.appendChild(tr);
    });
    document.getElementById("lastUpdate").textContent="Última atualização: "+new Date().toLocaleTimeString("pt-BR");
  }
  updateBook() {
    const {bids,asks}=this.sim.book(AppState.selected);
    const bc=document.getElementById("bidsContainer"), ac=document.getElementById("asksContainer");
    bc.innerHTML=""; ac.innerHTML="";
    bids.forEach(b=>{ bc.innerHTML+=`<div class="book-entry"><span>R$ ${b.price}</span><span>${b.qty}</span></div>`; });
    asks.forEach(a=>{ ac.innerHTML+=`<div class="book-entry"><span>R$ ${a.price}</span><span>${a.qty}</span></div>`; });
    document.getElementById("bookSymbol").textContent=AppState.selected;
  }
  updateAll() {
    this.updateWatchlist();
    this.updateBook();
    AppState.chart.draw(AppState.selected);
  }
  start() {
    this.updateAll();
    AppState.loop=setInterval(()=>{
      this.sim.update();
      this.updateAll();
    }, CONFIG.UPDATE_INTERVAL);
  }
  openModal(id,title){
    const m=document.getElementById(id);
    m.className="modal active";
    m.innerHTML=`<div class="modal-content">
      <h2>${title}</h2>
      <button class="btn btn-outline" onclick="ui.closeModal()">Fechar</button>
    </div>`;
  }
  closeModal(){ document.querySelectorAll(".modal").forEach(m=>m.classList.remove("active")); }
}

// =============================
// Inicialização
// =============================
let ui;
document.addEventListener("DOMContentLoaded",()=>{
  ui=new UIManager();
  ui.start();
});
