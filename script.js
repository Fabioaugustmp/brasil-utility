const url = "https://brasilapi.com.br/api/cep/v2/";

document.getElementById("cep")
.addEventListener("input", function () {
  const cep = this.value;
  console.log(cep)
  
  if(cep.length === 8 && /^[0-9]+$/.test(cep) 
    || /^[0-9]{5}-[0-9]{3}$/.test(this.value)){
    findCep(cep)
  }
});

async function findCep(cep) {
    //const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
    const response = await fetch(url + cep);
    console.log(response)

    if(!response.ok){
        throw new Error("A consulta não foi bem sucedida!")
    }
    let data = await response.json();
    console.log(data);    

    if(response.status === '404'){
        alert("Cep inválido!")
    }

    document.getElementById("logradouro").value = data.street || "";
}
