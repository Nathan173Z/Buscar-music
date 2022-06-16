import React, { useState } from "react";
import ReactDOM from "react-dom";
import {Warning} from "phosphor-react";


function App() {
  const [artist, SetArtist] = useState("");
  const [song, SetSong] = useState("");
  const [lyrics, SetLyrics] = useState("");
  const [error, SetError] = useState("");

  function formSubmit(e) {
    e.preventDefault();
    callAPI();
  }

  function spaceToUnderScore(x) {
    var tempString = x;
    var stringUnder = tempString.split(" ").join("_");
    return stringUnder;
  }

  function callAPI() {
    var artst = spaceToUnderScore(artist);
    var sng = spaceToUnderScore(song);

    fetch(`https://api.lyrics.ovh/v1/${artst}/${sng}`)
      .then(result => {
        return result.json();
      })
      .then(jsonResult => {
        SetLyrics(jsonResult.lyrics);
        if (jsonResult.error) {
          SetError(jsonResult.error);
        }
      });
  }

  return (

    <>
    <div className="container">
    <div className="row justify-content-center">
        <h1>Busca Musicas</h1>
    </div>
    <div className="row justify-content-center">
        <form onSubmit={e => formSubmit(e)} >
            <div className="form-row">
                <div className="col-md-6">
                    <label>Artista</label>
                    <input 
                className="form-control" 
                placeholder="Artista"
                type="text"value={artist}
                onChange={e => {
                SetArtist(e.target.value);
                 }}/>
                </div>
                <div className="col-md-6">
                    <label>Musica</label>
                    <input
                className="form-control"
                placeholder="Musica"
                type="text"
                value={song}
                onChange={e => {
                SetSong(e.target.value);
                }}
                />
                </div>
                <button  disabled={artist && song ? false : true} type="submit" className="btn btn-primary mt-2">Procurar</button>
            </div>
        </form>
      </div>
      <div className="row justify-content-center">
        {lyrics ? (
          <p>{lyrics}</p>
        ) : error ? (
          <div className="row justify-content-center">
            <Warning className="mt-4" size={52} color="#e90101" weight="light" />
            <h1 className="mt-4">
            <i>Erro</i> Musica Não Encontrada 
            </h1>
          </div>
        ) : (
          <div className="row justify-content-center">
            <span>A letra de sua musica ira aparecer aqui</span>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
