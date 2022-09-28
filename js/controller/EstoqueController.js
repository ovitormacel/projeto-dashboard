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

        this.bd = new Bd();

        this.initEventButtons();

    }

    initEventButtons(){
        this.openCreateEl.addEventListener('click', e => {
            this.addItemEl.classList.add('opened');
        })
        this.closeCreateEl.addEventListener('click', e => {
            this.addItemEl.classList.remove('opened');
        })

        this.cadastrarItemEl.addEventListener('click', e => {
            this.cadastrarItem();
        });
    }

    cadastrarItem(){
        let item = new newItem(this.codEl.value, this.descricaoEl.value, this.qntdEl.value, this.precoEl.value);

        if(item.validarDados()){
            alert("Adicionado com Sucesso.")
        } else {
            alert("Insira os Dados.")
            return;
        }

        this.bd.addNewItem(item);
    }
}