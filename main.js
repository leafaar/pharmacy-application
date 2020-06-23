const containerRight = document.querySelector('.container.right');
const containerLeft = document.querySelector('.container.left');
const cart = document.querySelector('.cart')
const totalElement = document.querySelector('.totaltext');
const buyElement = document.querySelector('.btn.comprar');
const loadingElement = document.querySelector('.absCenter');
const processElement = document.querySelector('.process');

const itens = [];

buyElement.onclick = () => {
    var total = 0;
    itens.forEach((item) => total += item.price*item.quantity);
    if(total == 0){
        alert('Voce nao adicionou nada ao carrinho.');
    }else{
        containerRight.style.display = 'none';
        containerLeft.style.display = 'none';
        loadingElement.style.display = 'initial';
        setTimeout(() => {
            loadingElement.style.display = 'none';
            processElement.style.display = 'initial';
            processSucess();
        }, 3600);  
    }
};

function processSucess(){
    var img = document.createElement('img');
    var txt = document.createElement('h2');
    img.setAttribute('class', 'processImg');
    txt.setAttribute('class', 'processText');
    img.setAttribute('src', 'imgs/sucess.png');
    txt.innerHTML = 'O seu pagamento foi processado com sucesso!';
    txt.style.color = 'green';
    processElement.appendChild(txt);
    processElement.appendChild(img);
}

function processError(){
    var img = document.createElement('img');
    var txt = document.createElement('h2');
    img.setAttribute('class', 'processImg');
    txt.setAttribute('class', 'processText');
    img.setAttribute('src', 'imgs/error.png');
    txt.innerHTML = 'Houve um erro ao processar o seu pagamento.';
    txt.style.color = 'red';
    processElement.appendChild(txt);
    processElement.appendChild(img);
}


class CartProduct{
    constructor(box, name, price, quantityElement){
        this.box = box;
        this.img = this.box.childNodes[1];
        this.quantityElement = quantityElement;
        this.name = name;
        this.price = price;
        this.quantity = 1;
    }
    add(){
        var bool = false;
        itens.forEach((item) => {
            if(item.name === this.name){
                bool = true;
                item.quantity += 1;
                this.quantity = item.quantity;
            }
        });
        if(bool){
            cart.childNodes.forEach((item) =>{
                if(item.id === this.name){
                    item.childNodes[0].innerHTML = `x${this.quantity}`;
                    this.updateTotal();
                }
            });
        }else{
            this.deleteElement = document.createElement('div');
            this.deleteElement.setAttribute('class', 'deleteItem')
            this.deleteElement.innerHTML = 'X';
            this.quantityElement.innerHTML = `x${this.quantity}`;
            this.deleteElement.onclick = () => {
                this.remove()
            };
            this.box.appendChild(this.deleteElement);
            this.box.setAttribute('id', this.name);
            cart.appendChild(this.box);
            itens.push(
                {
                name: this.name,
                price: this.price,
                quantity: this.quantity

            });
            this.updateTotal();
        }
    }
    updateTotal(){
        var some = 0;
        itens.forEach((item) => {
            some += item.price * item.quantity;
        });
        totalElement.innerHTML = `Total: $${some}`;
    }
    remove(){
        itens.forEach((item) => {
            if(item.name === this.name){
                if(item.quantity == 1){
                    this.removeList();
                    cart.childNodes.forEach((item) =>{
                        if(item.id === this.name){
                            cart.removeChild(item);
                        }
                    });
                }else{
                    item.quantity -= 1;
                    this.quantity = item.quantity;
                    cart.childNodes.forEach((item) =>{
                        if(item.id === this.name){
                            item.childNodes[0].innerHTML = `x${this.quantity}`;
                        }
                    });
                }
            }
            this.updateTotal();
        });
    }
    removeList(){
        for(var i = 0; i < itens.length; i++){
            if(itens[i].name == this.name){
                itens.splice(i, 1);
            }
        }
    }
}



class Product{
    constructor(name, price, imgName){
        this.name = name;
        this.price = price;
        this.imgName = imgName;
    }
    createBox(){
        this.quantityElement = document.createElement('span');
        this.quantityElement.setAttribute('class', 'quantity');
        this.quantityElement.innerHTML = '';

        this.box = document.createElement('div');
        this.box.setAttribute('class', 'boxlist');

        this.imgElement = document.createElement('img');
        this.imgElement.setAttribute('src', `imgs/${this.imgName}.png`);
        this.imgElement.setAttribute('class', 'blimg');

        this.box.appendChild(this.quantityElement);
        this.box.appendChild(this.imgElement);
        this.box.innerHTML = this.box.innerHTML + `${this.name} - $${this.price}`;
        containerLeft.appendChild(this.box);

        this.box.onclick = () => {
            const boxElement = this.box.cloneNode(true);
            const quantityElement = boxElement.childNodes[0];
            const imgElement = boxElement.childNodes[1];
            imgElement.setAttribute('class', 'cartimg');
            boxElement.setAttribute('class', 'cartbox');
            const teste = new CartProduct(boxElement, this.name, this.price, quantityElement);
            teste.add();
        };
    }
}

const box = new Product('Aspirina', 20, 'dorfrex');
box.createBox();
const box2 = new Product('Trandrylux', 71, 'trandrylux');
box2.createBox();
const box3 = new Product('Broncodilatador', 64, 'asthma');
box3.createBox();
const box4 = new Product('Voltarom', 82, 'voltarom');
box4.createBox();
const box5 = new Product('Metformina', 54, 'medicine');
box5.createBox();
const box6 = new Product('Paracetamil', 25, 'paracetamil');
box6.createBox();
const box7 = new Product('Dorflex', 42, 'pill');
box7.createBox();
const box8 = new Product('Alendronato', 35, 'pharmacy');
box8.createBox();
const box9 = new Product('Vasodilatador', 70, 'pills');
box9.createBox();
const box10 = new Product('Cachorro', 12355, 'paracetamil');
box10.createBox();
const box11 = new Product('Paracetamol', 50, 'pills');
box11.createBox();