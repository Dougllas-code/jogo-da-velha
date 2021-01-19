const jogoDaVelha = {
  board: ['', '', '', '', '', '', '', '', ''],
  gameOver: false,
  simbolos: {
    opicoes: ['X', 'O'],
    simboloDaVez: 0,
    mudarSimbolo: function () {
      this.simboloDaVez = (this.simboloDaVez === 0 ? 1 : 0)
    }
  },
  containerElement: null,
  sequenciasVencedoras: [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ],

  init: function (container) {
    this.containerElement = container
  },

  start: function () {
    this.board.fill('')
    this.escreva()
    this.gameOver = false
  },

  checarSequencias: function(simbolo){
    for(i in this.sequenciasVencedoras){
      if(this.board[this.sequenciasVencedoras[i][0]] == simbolo &&
        this.board[this.sequenciasVencedoras[i][1]] == simbolo &&
        this.board[this.sequenciasVencedoras[i][2]] == simbolo){
          console.log(this.board[this.sequenciasVencedoras[i]])
          console.log(`Sequencia Vencedora: ${i}`)
          return i
        }
    }
  },

  jogada: function (posicao) {
    if (this.gameOver) return false
    if (this.board[posicao] === '') {
      this.board[posicao] = this.simbolos.opicoes[this.simbolos.simboloDaVez]
      this.escreva()
      let indiceSequenciaVencedora = this.checarSequencias(this.simbolos.opicoes[this.simbolos.simboloDaVez])
      if(indiceSequenciaVencedora >=0){
        this.finalizarJogo()
      }else{
        this.simbolos.mudarSimbolo()
      }      
    }
  },

  finalizarJogo: function(){
    this.gameOver = true
    console.log('GameOver')
    let sequenciaVencedora = this.sequenciasVencedoras[this.checarSequencias(this.simbolos.opicoes[this.simbolos.simboloDaVez])]
    this.mudaCor(sequenciaVencedora)
  },

  mudaCor: function(posicoes){
    let divElement = document.querySelectorAll('.game-board div')
    for(i in posicoes){
      divElement[posicoes[i]].classList.add('ganhou')
    }
  },

  escreva: function () {
    let conteudo = ''
    for (i in this.board) {
      conteudo += `<div onclick="jogoDaVelha.jogada(${i})">${this.board[i]}</div>`
    }
    this.containerElement.innerHTML = conteudo
  },
}