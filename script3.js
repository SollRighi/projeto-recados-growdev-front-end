async function salvarRecado () {
    let salvarDescricao = document.getElementById("descricao").value;
    let salvarDetalhamento = document.getElementById("detalhamento").value;
    console.log("salvarRecado")

    let novoRecado = {
        descricao: salvarDescricao,
        detalhamento: salvarDetalhamento,
    }

    
    await axios.post("http://localhost:8081/cria-recado", novoRecado);
    atualizarRecados();
}

function paginaInicial () {
    window.location.href = "index2.html";
}

async function atualizarRecados () {
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    const retorno = await axios.get("http://localhost:8081/recados")
    retorno.data.forEach((recado,index) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let botaoExcluir = document.createElement("button")
        let botaoEditar = document.createElement("button");

        td1.innerHTML = index+1;
        td2.innerHTML = recado.descricao;
        td3.innerHTML = recado.detalhamento;

        botaoExcluir.className = "btn btn-danger";
        botaoExcluir.innerText = "EXCLUIR";
        botaoEditar.className = "btn btn-info";
        botaoEditar.innerHTML = "EDITAR";
        botaoEditar.style.marginLeft = "5px";
        botaoExcluir.onclick = () => excluirRecado(index); //cria função que executa exclusao
        botaoEditar.onclick = () => editarRecado(index);

        td4.appendChild(botaoExcluir);
        td4.appendChild(botaoEditar);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        

        tbody.appendChild(tr);

    });
}

async function excluirRecado (indexRecado) {

    await axios.delete("http://localhost:8081/remove-recado/" + indexRecado);
    atualizarRecados();
}

async function editarRecado (indexRecado) {

    
    const retorno = await axios.get("http://localhost:8081/pegar-recado/" + indexRecado)
    console.log(retorno.data)

    let novaDescricao = prompt("Nova Descrição:", retorno.data.descricao );
    if (novaDescricao == null || novaDescricao == "") {
        return;
    }
    let novoDetalhamento = prompt("Novo Detalhamento:", retorno.data.detalhamento );
    if (novoDetalhamento == null || novoDetalhamento == "") {
        return;
    }

    await axios.put("http://localhost:8081/atualiza-recado/" + indexRecado, {
        descricao: novaDescricao,
        detalhamento: novoDetalhamento
    });

    
    atualizarRecados();
}


atualizarRecados();


