const template = document.createElement('template');
template.innerHTML = `
<style>
div{
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid green;
    background-color: #20C073;
    color: #101010;
    gap: 1rem;
    margin-bottom: 1rem;
}

 label{
    font-family: Arial, Helvetica, sans-serif;
    color: #101010;
    font-weight: 700;
 }

 span{
    margin-left: auto;
 }
</style>

<div>
    <input type="checkbox"/>
    <label>
       <slot></slot>
    </label>
    <span>
        <slot name="small"></slot>
    </span>
</div>
`;

class TodoItem extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.shadow.append(template.content.cloneNode(true));
        this.checkbox = this.shadow.querySelector('input');
    }

    connectedCallback(){
       
    }

    static get observedAttributes(){
        return ['checked'];
    }

    attributeChangedCallback(name, _oldValue, newValue){
        if(name === 'checked'){
            this.#updateChecked(newValue);
        }
    }


    #updateChecked(value){
        this.checkbox.checked = value === 'true' ? true : false;
    }

    disconnectedCallback(){}

}

customElements.define("todo-item", TodoItem);