const cards = document.querySelectorAll('.card')
const fimDeJogo = document.querySelector('.fimDeJogo')
const pHumano = document.querySelectorAll('.humano')
const pComputador = document.querySelectorAll('.naoHumano')
const placarHumano = document.querySelectorAll('.placarHumano')
const placarComputador = document.querySelectorAll('.placarComputador')

const state = (Math.random() * 100) > 50 ? true : false
const player = state ? 'X' : 'O'
const playerComputador = !state ? 'X' : 'O'

let texto
let venceu = false
let pontosHumano = 0, pontosComputador = 0
let posicoesLivres = [0,1,2,3,4,5,6,7,8]
let win = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

pHumano.innerHTML = player
pComputador.innerHTML = playerComputador

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
                placarHumano.forEach(
                    e => {
                        e.innerHTML = pontosHumano
                    }
                )

            } else {
                pontosComputador += 1
                placarComputador.forEach(
                    e => {
                        e.innerHTML = pontosComputador
                    }
                )
            }
        } else if (posicoesLivres.length == 0 && venceu == false) {
            texto = `<p class="resultadoFinal">Ops!<span>DEU VELHA</span></p>`

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