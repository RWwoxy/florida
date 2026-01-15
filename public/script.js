let isAdmin = false;

function showRegister(){
  login.style.display="none";
  register.style.display="block";
}

function register(){
  fetch("/register",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ user:ruser.value, pass:rpass.value })
  }).then(()=>alert("Kayıt başarılı"));
}

function login(){
  fetch("/login",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({ user:luser.value, pass:lpass.value })
  }).then(r=>r.json()).then(d=>{
    if(d.ok || d.admin){
      isAdmin = d.admin;
      login.style.display="none";
      register.style.display="none";
      panel.style.display="block";
      if(isAdmin) adminPanel.style.display="block";
      loadApps();
    } else alert("Hatalı giriş");
  });
}

function addApp(){
  fetch("/add-app",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      name:name.value,
      link:link.value,
      desc:desc.value
    })
  }).then(loadApps);
}

function loadApps(){
  fetch("/apps").then(r=>r.json()).then(data=>{
    apps.innerHTML="";
    data.forEach(a=>{
      apps.innerHTML += `
      <div class="app">
        <b>${a.name}</b><br>
        ${a.desc}<br>
        <a href="${a.link}" target="_blank">İndir</a>
      </div>`;
    });
  });
}
