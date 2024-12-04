// cursor no campo salário inicialmente
document.getElementById('moneyInput').focus();

// chama função a partir do botãocalcular
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    var moneyInput = document.getElementById("moneyInput");
    var cargaHoraria = document.getElementById("cargaHoraria");
    var horaextra50 = document.getElementById("horaextra50");
    var horaextra100 = document.getElementById('horaextra100');
    var totalizador = document.getElementById('totalizador');
    var salarioB = getNumericValue(moneyInput);
    var numCargahoraria = Number(cargaHoraria.value);
    var numHoraextra50 = Number(horaextra50.value);
    var numHoraextra100 = Number(horaextra100.value);
    var valorHoraExtra50 = ((salarioB / numCargahoraria) * numHoraextra50) * 1.5;
    var valorHoraExtra100 = ((salarioB / numCargahoraria) * numHoraextra100) * 2;
    var horaExtraTotal = valorHoraExtra50 + valorHoraExtra100;
    var alertaHE = "";

    if (!moneyInput.value || moneyInput.value == 0) {
        alert ("Salário vazio!");
    } else if (horaextra50.value < 0 || horaextra100.value < 0 || !horaextra50.value && !horaextra100.value) {
        alert ("Hora extra vazia!");
    } else if (salarioB < 1412){
        alert ("Atenção: Salário abaixo do mínimo (R$ 1.412,00)");
        if (numHoraextra50 + numHoraextra100 > 48){
            alertaHE = '<span id="alertaHE">ATENÇÃO!!! <br>O limite de 48h mensais foi ultrapassado.<br><br></span>';
            Calcular();
        } else {
            Calcular();
        };
    } else {
        if (numHoraextra50 + numHoraextra100 > 48){
            alertaHE = '<span id="alertaHE">ATENÇÃO!!! <br>O limite de 48h mensais foi ultrapassado.<br><br></span>';
            Calcular();
        } else {
            Calcular();
        };
    };

    function Calcular () {
        totalizador.innerHTML = "<p><b>"+alertaHE+"</b></p>";
        //totalizador.innerHTML += "<p><b>RESUMO:</b></p>";
        totalizador.innerHTML += `
            <table>
                <thead>
                    <tr>
                    <th id="resumo" scope="col" colspan="3"><b>RESUMO</b></th>
                    </tr>
                    <tr>
                    <th scope="col" colspan="2" id="titulo">Salário:</th>
                    <th scope="col" id="titulo">  R$ ${(salarioB.toFixed(2))}  </th>
                    </tr>
                    <tr>
                    <th scope="col" colspan="2" id="titulo">Carga horária:</th>
                    <th scope="col" id="titulo">${numCargahoraria} h</th>
                    </tr>
                    <tr>
                        <th scope="col" colspan="2" id="titulo">Valor da hora:</th>
                        <th scope="col" id="titulo">R$ ${(salarioB / numCargahoraria).toFixed(2)}</th>
                    </tr>
                    <tr>
                    <th scope="col">Tipo</th>
                    <th scope="col">Qnd</th>
                    <th scope="col">Valor (R$)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">50%</th>
                    <td>${numHoraextra50}</td>
                    <td>R$ ${valorHoraExtra50.toFixed(2)}</td>
                    </tr>
                    <tr>
                    <th scope="row">100%</th>
                    <td>${numHoraextra100}</td>
                    <td>R$ ${valorHoraExtra100.toFixed(2)}</td>
                    </tr>
                </tbody>
                    <tfoot>
                    <tr>
                    <th scope="row">Total</th>
                    <td>${numHoraextra50 + numHoraextra100}</td>
                    <td>R$ ${horaExtraTotal.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
});





// Função para obter o valor "limpo" (sem máscara) para operações matemáticas
function getNumericValue(input) {
    if (!input || !input.value) {
        return 0; // Retorna 0 caso o campo esteja vazio ou inválido
    }

    const value = input.value;

    // Remove pontos e vírgulas para converter em número
    const numericValue = parseFloat(value.replace(/\./g, "").replace(",", "."));

    return numericValue || 0; // Retorna 0 caso o valor seja inválido
}

function atualizarPagina () {
    // Recarrega a página atual
    location.reload();
}

// corpo de e-mail quando clicar em enviar email
function EnviarEmail() {
    var moneyInput = document.getElementById("moneyInput");

    if (moneyInput.value != 0) {
        var codFuncionario = prompt ("Digite o código do funcionário:");
        var nomeFuncionario = prompt ("Digite o nome do funcionário:");
        var emailInput = prompt("Digite um e-mail válido para enviar as informações:");

        // Se o e-mail for válido...
        if (validarEmail(emailInput)) {
                var moneyInput = document.getElementById("moneyInput");
                var cargaHoraria = document.getElementById("cargaHoraria");
                var horaextra50 = document.getElementById("horaextra50");
                var horaextra100 = document.getElementById('horaextra100');
                var salarioB = getNumericValue(moneyInput);
                var numCargahoraria = Number(cargaHoraria.value);
                var numHoraextra50 = Number(horaextra50.value);
                var numHoraextra100 = Number(horaextra100.value);
                var valorHoraExtra50 = ((salarioB / numCargahoraria) * numHoraextra50) * 1.5;
                var valorHoraExtra100 = ((salarioB / numCargahoraria) * numHoraextra100) * 2;
                var horaExtraTotal = valorHoraExtra50 + valorHoraExtra100;


                window.location.href = `mailto:${emailInput}?subject=Horas extras | Cód: ${codFuncionario} - ${nomeFuncionario}&body=
                Resumo de horas extras do: Cód: ${codFuncionario} - ${nomeFuncionario}%0A
                %0A
                Salário Base: R$ ${salarioB.toFixed(2)}%0A
                Valor da hora: R$ ${(salarioB / numCargahoraria).toFixed(2)}%0A
                %0A
                =========================================%0A
                %0A
                Horas extras de 50%: ${numHoraextra50} (R$ ${valorHoraExtra50.toFixed(2)})%0A
                Horas extras de 100%: ${numHoraextra100} (R$ ${valorHoraExtra100.toFixed(2)})%0A
                Total: R$ ${horaExtraTotal.toFixed(2)}%0A
                %0A
                =========================================%0A
                `; 

    } else {
        alert("E-mail inválido");
    }

    // Função para validar o e-mail
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    } else {
        alert("Sem dados para enviar!");
    }
}

// função que muda campo para salário padrão
function SalarioDefault () {
    moneyInput.value = '1.442,00';
}

// função que muda campo para salário padrão
function CargaDefault () {
    cargaHoraria.value = 220;
}


// função que mostra ajuda ao clicar em ?
function toggleTooltip(event) {
    event.stopPropagation(); // Impede o fechamento imediato
    const tooltip = event.target.nextElementSibling;
    tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';

    // Fecha a tooltip ao clicar fora
    document.addEventListener('click', function closeTooltip(e) {
        if (!tooltip.contains(e.target) && !event.target.contains(e.target)) {
            tooltip.style.display = 'none';
            document.removeEventListener('click', closeTooltip);
        }
    });
}


// função que exibe o valor digitado em salário como moeda 0,00
moneyInput.addEventListener("input", (event) => {
    let value = event.target.value;

    // Remove tudo que não seja número
    value = value.replace(/\D/g, "");

    // Formata o valor como moeda
    value = (value / 100).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    // Atualiza o valor no campo
    event.target.value = value;
});