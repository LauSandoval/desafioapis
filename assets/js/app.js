const apiURL = "https://mindicador.cl/api/";
let chart
async function getData() {
    try {
        const res = await fetch(apiURL);
        const data = await res.json();
        return data;
    } catch (e) {
        alert(e.message);
    }

}


async function getMonto() {

    let data = await getData()
    let monto = document.querySelector("#ingreseMonto").value
    let moneda = document.querySelector("#tipoMoneda").value
    let convertir = (monto / data[`${moneda}`]['valor'])
    document.querySelector("#resultado").innerHTML = `Resultado: ${convertir}`
    getHistory(moneda)
    // renderGrafica();
}

async function getHistory(dato) {
    
    let res = await fetch(apiURL + dato)
    let datax = await res.json()

    let fechas = datax.serie.map((series) => {
        return series.fecha
    });

    const data = datax.serie.map((series) => {
        return series.valor
        
    });

    const config = {
        type: "line",
        data: {
            labels: fechas.slice(fechas.length - 10, fechas.length),
            datasets: [{
                label: "Fechas",
                data: data.slice(data.length - 10, data.length),
                borderColor: "rgb(255, 99, 132)",
            }]
        },

    }

    const myChart = document.getElementById("myChart");
    myChart.style.backgroundColor = "white";
    chart = new Chart(myChart, config);
};

document.querySelector("#tipoMoneda").addEventListener('change', (event) => {
    if (chart) {
        myChart = document.getElementById("myChart");
        myChart.style.backgroundColor = "rgba(255, 255, 255, 0";
        chart.destroy();
    }
})