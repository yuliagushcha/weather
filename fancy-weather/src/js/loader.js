document.onreadystatechange = function() { 
    if (document.readyState !== "complete") { 
        document.querySelector(".wrapper").style.display = "none"; 
        document.querySelector("#loader").style.display = "block"; 
    } else { 
        document.querySelector("#loader").style.display = "none";
        document.querySelector( ".wrapper").style.display = "flex";
        document.querySelector('.eng').classList.add('active');
        const lang = document.querySelector('.active').textContent;
        localStorage.setItem('lang', lang);
    } 
};