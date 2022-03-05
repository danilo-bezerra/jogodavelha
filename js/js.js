let cards = document.querySelectorAll('.card')
let fimDeJogo = document.querySelector('.fimDeJogo')
let sobre = document.querySelector('.sobre')
let pHumano = document.querySelectorAll('.humano')
let pComputador = document.querySelectorAll('.naoHumano')
let state = (Math.random() * 100) > 50 ? true : false //
let player = state ? 'X' : 'O'
let playerComputador = !state ? 'X' : 'O'

let texto

let placarHumano = document.querySelector('.placarHumano')
let placarComputador = document.querySelector('.placarComputador')

let pontosHumano = 0
let pontosComputador = 0

placarHumano.innerText = 0
placarComputador.innerText = 0


let win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let venceu = false

pHumano.innerHTML = player
pComputador.innerHTML = playerComputador

let posicoesLivres = [0,1,2,3,4,5,6,7,8]

pHumano.forEach(
    (e) => {
        e.innerHTML = player
    }
)

pComputador.forEach(
    (e) => {
        e.innerHTML = playerComputador
    }
)

cards.forEach(
    (e, index) => {
        e.onclick = () => {
            if (e.innerHTML == false) {
                e.innerHTML = `${player}`
                
                posicoesLivres.splice(posicoesLivres.indexOf(index), 1)
                playerWinGame(win, cards, player)
                setTimeout(jogadaComputador, 200)
            }
        }
    }
)
const jogadaComputador = () => {
    if (posicoesLivres.length > 0) {
        let escolhaComputador = Math.floor(Math.random() * (posicoesLivres.length - 1))
        cards[posicoesLivres[escolhaComputador]].innerHTML = `${playerComputador}`
        posicoesLivres.splice(escolhaComputador, 1)
        playerWinGame(win, cards, playerComputador)
        
    }
}

const playerWinGame = (win, cards, playerAtual) => {
    for (i of win) {
        let A = cards[i[0]].innerHTML == 'X'
        let B = cards[i[1]].innerHTML == 'X'
        let C = cards[i[2]].innerHTML == 'X'
        
        let D = cards[i[0]].innerHTML == 'O'
        let E = cards[i[1]].innerHTML == 'O'
        let F = cards[i[2]].innerHTML == 'O'

        if (((A && B && C) || (F && D && E)) && venceu == false) {
            mudaEstilo([cards[i[0]], cards[i[1]], cards[i[2]]], true)
            texto = `<p class="resultadoFinal">Vencedor:<span>${playerAtual}</span></p>`
            setTimeout(telaFimDeJogo, 1500)
            venceu = true
            if (playerAtual == player) {
                pontosHumano += 1
                placarHumano.innerHTML = pontosHumano
            } else {
                pontosComputador += 1
                placarComputador.innerHTML = pontosComputador
            }
        } else if (posicoesLivres.length == 0 && venceu == false) {
            texto = `
            <p class="resultadoFinal">Ops!<span>DEU VELHA</span></p>`
            setTimeout(telaFimDeJogo, 500)
        }
    }
}

const novoJogo = () => {
    fimDeJogo.style.transform = 'translateY(-100%)'
    cards.forEach(
        (e) => {
            e.innerHTML = ''
        }
    )
    posicoesLivres = [0,1,2,3,4,5,6,7,8]
    venceu = false
}

const telaFimDeJogo = () => {
    let vencedor = document.querySelector('.vencedor')
    pHumano.innerHTML = player
    pComputador.innerHTML = playerComputador
    vencedor.innerHTML = texto
    fimDeJogo.style.transform = 'translateY(0)'
}

const mudaEstilo = (listaWin, estado) => {
    let corBg = estado ? '#8fdfdd' : '#002642'
    let corTextoVencedor = estado ? '#002642' : '#8fdfdd'
    let corTexto = estado ? '#00000000' : corTextoVencedor


    cards.forEach(
        (e) => {
            e.style.color = corTexto
        }
    )

    listaWin.forEach(
        (e) =>{
            e.style.backgroundColor = corBg
            e.style.color = corTextoVencedor
        }
    )
    if (estado) {
        setTimeout(mudaEstilo, 1500, listaWin, false)
    }
}