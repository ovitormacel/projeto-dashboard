class newItem {
    constructor(cod, descricao, qntd, preco){
        this.cod = cod;
        this.descricao = descricao;
        this.qntd = qntd;
        this.preco = preco;

    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == "" || this[null]){
                return false;
            }  
        }
        return true;
    }
}


class Bd {
    constructor(){
        let id = localStorage.getItem('id');

        if(id === null){
            localStorage.setItem('id', parseInt(0))
        }

        this.carregaItens()
    }

    getProximoId(){
        let id = localStorage.getItem('id');
        return parseInt(id) + 1;
    }

    addNewItem(item){
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(item));
        localStorage.setItem('id', id);
    }

    updateItem(item){
        alert('funfou')
    }

    carregaItens(){
        let itens = [];
        let id = localStorage.getItem('id');

        for(let i = 1; i <= id; i++){
            let item = JSON.parse(localStorage.getItem(i));

            if(item == null){
                continue;
            }

            item.id = i;
            itens.push(item);
        }
        return itens;
    }
}




class EstoqueController {
    constructor(){

        this.openCreateEl = document.querySelector("#open_create");
        this.closeCreateEl = document.querySelector('.btn_close')
        this.addItemEl = document.querySelector(".additem");
        this.cadastrarItemEl = document.querySelector("#cadastrarItem");

        this.codEl = document.querySelector(".cod");
        this.descricaoEl = document.querySelector(".descricao");
        this.qntdEl = document.querySelector(".qntd");
        this.precoEl = document.querySelector(".preco");

        this.tableEl = document.querySelector('#table_estoque');

        this.bd = new Bd();

        this.initEventButtons();
        this.recuperaDados();

    }

    /* ---- CREATE BOX ---- */
    initEventButtons(){
        this.openCreateEl.addEventListener('click', e => {
            this.addItemEl.querySelector('.additem_box_h4').innerHTML = 'Adicionar Novo Item';
            this.addItemEl.querySelector('.btn_create').innerHTML = '<i class="fa-solid fa-plus"></i> Adicionar';
            this.cadastrarItemEl.classList.remove("update");
            this.toggleBtnCreate();
        })
        this.closeCreateEl.addEventListener('click', e => {
            this.toggleBtnCreate();
        })

        this.cadastrarItemEl.addEventListener('click', e => {
            if(this.cadastrarItemEl.classList.contains("update")){
                this.cadastrarItem("update");
            } else {
                this.cadastrarItem("create");
            }
        });
    }

    toggleBtnCreate(){
        this.addItemEl.classList.toggle('opened');
    }

    zerarCampos(){
        this.codEl.value = '', this.descricaoEl.value = '', this.qntdEl.value = '', this.precoEl.value = '';
    }

    /* ---- Create, Read ---- */
    cadastrarItem(cond){
        let item = new newItem(this.codEl.value, this.descricaoEl.value, this.qntdEl.value, this.precoEl.value);

        if(!item.validarDados()){
            alert("Insira os Dados.")
            return;   
        }
        
        if(cond === 'create'){
            this.bd.addNewItem(item);
        }

        if(cond === 'update'){
            this.bd.updateItem(item);
        }

        this.recuperaDados();

        this.toggleBtnCreate();

        this.zerarCampos()
    }


    recuperaDados(){
        let itens = this.bd.carregaItens();

        this.addItensToTable(itens, this.tableEl);
        this.updateCard(itens);
        this.addListenersToButtons()
    }

    addItensToTable(itens, table){
        table.innerHTML = '';
        itens.forEach(item => {
            let linha = table.insertRow();
            
            linha.innerHTML = `
            <tr>
                <td>${item.cod}</td>
                <td>${item.descricao}</td>
                <td>${item.qntd}</td>
                <td>R$ ${item.preco}</td>
                <td><button class="btn_edit">Editar</button></td>
                <td><button class="btn_delete">Deletar</button></td>
            </tr>
            `;
            
        })
    }

    updateCard(itens){
        let cardEl = document.querySelector('#card_estoque_qntd');
        let total = 0;

        if(itens != '' | itens != null){
            itens.forEach(item => {
                total += 1;       
            })
        } else{
            total = 0;
        }

        cardEl.innerHTML = `${total}`;

    }


    /* ---- Update ---- */
    addListenersToButtons(){
        let edit = this.tableEl.querySelectorAll('.btn_edit');
        let del = this.tableEl.querySelectorAll('.btn_delete');

        [...edit].forEach(btn => {
            btn.removeEventListener('click', e => {this.openUpdateBox()});
            btn.addEventListener('click', e => {this.openUpdateBox()});
        })
    }

    openUpdateBox(){
        this.addItemEl.querySelector('.additem_box_h4').innerHTML = 'Editar Item';
        this.addItemEl.querySelector('.btn_create').innerHTML = '<i class="fa-solid fa-plus"></i> Editar';
        this.cadastrarItemEl.classList.add("update");
        this.toggleBtnCreate();
    }

}