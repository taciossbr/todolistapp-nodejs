window.onload = () => {
    let inputs = document.querySelectorAll('input[type="checkbox"]');

    for (let input of inputs) {
        input.onclick = (event) => {
            let todo = event.toElement.parentNode;
            let checkeds = document.querySelectorAll(
                'li>input[type="checkbox"]:checked');
            let nonCheckeds = document.querySelectorAll(
                'li>input[type="checkbox"]:not(:checked)');
            let ul = document.querySelector("ul");
            ul.innerHTML = '';
            let a = [];
            nonCheckeds.forEach((item) => {
                ul.append(item.parentNode)
            });
            checkeds.forEach((item) => {
                ul.append(item.parentNode)
            });
        }
    }

}
