function loadRepos() {
   const xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
       if (xhr.readyState === 4) {
           document.getElementById('res').textContent = xhr.responseText;
       }
   };
   xhr.open('GET', 'https://api.github.com/users/testnakov/repos', true);
   xhr.send();
}
