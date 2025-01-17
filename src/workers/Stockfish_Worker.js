/* eslint-disable no-undef */
importScripts('https://cdn.jsdelivr.net/gh/official-stockfish/Stockfish/src/stockfish.js');


onmessage = function (e) {
  const command = e.data;
  postMessage(`Command received: ${command}`);
  postMessage(`bestmove e2e4`);
  postMessage(command);
};
