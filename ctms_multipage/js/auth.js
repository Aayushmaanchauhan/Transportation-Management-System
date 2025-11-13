export function register({name,email,password}){
  const users = JSON.parse(localStorage.getItem('ctms_users')||'[]');
  if(users.find(u=>u.email===email)) throw new Error('Email already registered');
  users.push({name,email,password});
  localStorage.setItem('ctms_users', JSON.stringify(users));
  localStorage.setItem('ctms_user', JSON.stringify({name,email}));
}

export function login({email,password}){
  const users = JSON.parse(localStorage.getItem('ctms_users')||'[]');
  const u = users.find(u=>u.email===email && u.password===password);
  if(!u) throw new Error('Invalid credentials');
  localStorage.setItem('ctms_user', JSON.stringify({name:u.name,email:u.email}));
}
