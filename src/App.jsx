import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './App.css';

function App() {

    const [input, setInput] = useState('');
    const [cep, setCep] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [uf, setUf] = useState('');


    function handleSearch() {

        if (input.length !== 8) {
            alert('CEP invalido');
            return;
        }

        fetch('https://viacep.com.br/ws/' + input + '/json').then(function (response) {
            response.json().then(function (data) {
                if (data.erro) {
                    alert('Não foi possível encontrar o endereço');
                }
                setCep(data.cep);
                setLocalidade(data.localidade);
                setComplemento(data.complemento);
                setRua(data.logradouro);
                setBairro(data.bairro);
                setUf(data.uf);
            })
        })
    }

    return (
        <div className="container">
            <h1 className="title">Buscador CEP</h1>

            <div className="containerInput">
                <input type="text" placeholder="Digite o CEP..." value={input} onChange={(e) => setInput(e.target.value)} />

                <button className="buttonSearch">
                    <FiSearch size={25} color="#FFF" onClick={handleSearch} />
                </button>
            </div>

            <main className="main">
                <h2>CEP: {cep}</h2>
                <span>Endereço: {rua}</span>
                <span>Complemento: {complemento}</span>
                <span>Bairro: {bairro}</span>
                <span>{localidade}-{uf}</span>
            </main>
        </div>
    );
}

export default App;