function exibirDados(graus, descricao, umidade, cidade, icon) {
    document.querySelector(".titulo-cidade").textContent = `Tempo em ${cidade}`
    document.querySelector(".p-graus").textContent = `${graus.toFixed(0)}ºC`
    document.querySelector(".umidade").textContent = `Umidade: ${umidade}%`
    document.querySelector(".descricao-tempo").textContent = descricao
    const link = `https://openweathermap.org/img/wn/${icon}.png`
    document.querySelector(".icon-clima").src = link
    console.log(link)
}

async function chamarApi() {
    const cidade = document.querySelector(".input-cidade").value.trim()
    const API_KEY = "42261670a4ca3085d97c3519db7ac71c"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&lang=pt_br&units=metric`

    const response = await fetch(url)

    if (response.ok) {
        const data = await response.json()

        const graus = data.main.temp
        const descricao_clima = data.weather[0].description
        const umidade = data.main.humidity
        const cidade_usuario = data.name
        const iconClima = data.weather[0].icon
        exibirDados(graus, descricao_clima, umidade, cidade_usuario, iconClima)

    } else if (response.status == 404) {
        alert("cidade não encontrada " + response.status)
    } else {
        alert("Erro na requisição " + response.status)
    }
}