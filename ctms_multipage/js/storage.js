import { seed } from './seed.js';
const KEY = 'ctms_state';

function initState(){
  const saved = localStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : structuredClone(seed);
}

export const db = {
  state: initState(),
  save(){ localStorage.setItem(KEY, JSON.stringify(this.state)); },
  reset(){ localStorage.removeItem(KEY); this.state = structuredClone(seed); this.save(); }
};
