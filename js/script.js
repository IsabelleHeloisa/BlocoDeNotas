// inserindo um bloco de notas por padrão 
const noteModel = `<div class="note">
<div class="colorsNote">
  <div class="noteyellow" onclick="chooseColor(this)"></div>
  <div class="notepink" onclick="chooseColor(this)"></div>
  <div class="notegreen" onclick="chooseColor(this)"></div>
  <div class="notered" onclick="chooseColor(this)"></div>
</div>
<div class="actionNote">
  <i class="fa-solid fa-brush" onclick="editColor(this)"></i>
  <i class="fa-solid fa-xmark" onclick="removeNote(this)"></i>
</div>
<textarea onkeyup="editNote()" placeholder="Digite aqui:"></textarea>
</div>`

let textSaveds = localStorage.getItem("textNotes")
textSaveds = JSON.parse(textSaveds)

if(!textSaveds){
  textSaveds = ['']
}
console.log(textSaveds);
textSaveds.forEach(textSaved => {
  groupNotes.innerHTML += noteModel   
})

// selecionando todos os blocos de notas
let notes = document.querySelectorAll(".note")

notes.forEach((note,i) =>{
  note.querySelector("textarea").value = textSaveds[i] 
})


// função que salva toda edição do texto dos blocos de Notas
const editNote = () =>{
  // criando array que armazenara os textos de cada blco de notas
  let textNotes = []
  // selecionando todos os blocos de notas
  const notes = document.querySelectorAll(".note")
  // criando um looping para cada bloco de notas
  notes.forEach(note =>{
    // Selecionando o textarea de cada blco de notas que está sendo percorrido no looping
    const textNote = note.querySelector("textarea")
    // adicionando o valor d textarea no array
    textNotes.push(textNote.value)
  })
  // transformando array em string
  textNotes = JSON.stringify(textNotes)
  // salvando o texto do bloco de notas no localStorage
  localStorage.setItem("textNotes", textNotes)
 
}

// trocar de cor
// função  que troca a cor pelo elemento que foi clicado
const editColor = (iconColor) => {
  // pegando elemento actionNote do bloco de notas que foi selecionado
  const actionNote = iconColor.parentNode
  // escondendo o elemento actionNote quando for selecionado
  actionNote.style.display = "none"
  // pegando a paleta de cores 
  const colorsNote = iconColor.parentNode.parentNode.querySelector(".colorsNote")
  // exibindo quando for selecionada
  colorsNote.style.display="flex" 
  // Obtendo o Bloco de Notas
  const note = iconColor.parentNode.parentNode
  // pegando a segunda classe que define a cor do bloco de notas
  const colorClassNote = note.classList[1]
  // Selecionando todas as cores 
  const colors = note.querySelectorAll(".colorsNote div")
  // percorrendo cada cor
  colors.forEach(color => {
    // removendo o icone de cada caixa de cor
    color.innerHTML = ""
  });
  // criando icone de check
  const icon = '<i class="fa-solid fa-check"></i>'  
  // verificando se o bloco de notas tem umca classe de cor
  if(colorClassNote){
    // se sim ira adicionar o icone check na classe de cor do bloco de notas
    note.querySelector(`.colorsNote .${colorClassNote}`).innerHTML = icon
  }else{
    // se não adicona o icone na caixa amarela padrão do bloco de notas
    note.querySelector(`.colorsNote .noteyellow`).innerHTML = icon
  }
}
// função que recebe a cor do bloco de notas para ser definida
const chooseColor = (elColor) =>{
  // pegando o pai da elColor (ColorsNote) paleta de cores
  const colorsNote = elColor.parentNode
  // obtendo o bloco de notas
  const note = elColor.parentNode.parentNode
  // Selecionando a caixa do icones
  const actionNote = note.querySelector(".actionNote")
  // adquirindo a classe da cor que foi selecionada
  const colorClass = elColor.classList[0]
  // removendo a classe de cor anterior do bloco de notas
  note.classList.remove(note.classList[1])
  // adicionando a classe de cor escolhida no bloco de notas
  note.classList.add(colorClass)
  // exibindo caixa de ações do bloco de notas
  actionNote.style.display = "flex"
  // escondendo paleta de cores
  colorsNote.style.display="none"
}  

// função que excluir o bloco de notas escolhido
const removeNote = (closeNote) => {
  // pegando o bloco de notas pelo botão clicado
  const note = closeNote.parentNode.parentNode
  // excluindo bloco de notas
  note.remove()
  // Invoca o método de edição para atualizar a lista dos blocos de notas
  editNote()
}

// função do botão de adicionar bloco de notas
const addNote = () => { 
  // concatenando um novo bloco de notas ao grupo de bloco de notas
  groupNotes.innerHTML += noteModel
  // selecionando todos os blocos de notas
  const notes = document.querySelectorAll(".note")
  // pegando o txto dos blocos de Notas
  let textNotesStorage = localStorage.getItem("textNotes")
  textNotesStorage = JSON.parse(textNotesStorage)
  textNotesStorage.push("")
  textNotesStorage.forEach((text,i) =>{
    notes[i].querySelector("textarea").value = text
  })
  editNote()
}
