console.log("Welcome to Postman");

// utility functions
function stringToDiv(str) {
    let div = document.createElement('div');
    div.innerHTML = str;
    return div.firstElementChild;
}

let addedParams = 1;
let paramsBox = document.getElementById('paramsBox');
paramsBox.style.display = 'none';

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    let jsonBox = document.getElementById('jsonBox');
    let paramsBox = document.getElementById('paramsBox');
    let params = document.getElementById('params');
    jsonBox.style.display = 'none';
    paramsBox.style.display = 'block';
    params.style.display = 'block';
})

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    let paramsBox = document.getElementById('paramsBox');
    let jsonBox = document.getElementById('jsonBox');
    let params = document.getElementById('params');
    params.style.display = 'none';
    paramsBox.style.display = 'none';
    jsonBox.style.display = 'block';
})

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let addstr = ` <div class="row my-2">
                    <legend class="col-form-label col-md-2 float-sm-left pt-0"></legend>
                    <div class="col-md-3">
                        <input type="text" class="form-control" placeholder="Key" id="paramKey${addedParams + 1}">
                    </div>
                    <div class="col-md-3">
                        <input type="text" class="form-control" placeholder="Value" id="paramVal${addedParams + 1}">
                    </div>
                    <button class="col-sm-2 btn btn-primary removeElement">Remove</button>
                </div>`
    // let paramsBox=document.getElementById('paramsBox');
    let paramElement = stringToDiv(addstr);
    params.append(paramElement);
    console.log("Added");

    let toRemove = document.getElementsByClassName('removeElement');
    for (item of toRemove) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
            console.log("Removed");
        })
    }
    addedParams += 1;
})

// submit 
let submit = document.getElementById('submit');
submit.addEventListener('click', submitRequest);
function submitRequest(e) {
    console.log("Submitted!");
    responseText = document.getElementById('responseText');
    responseText.value = "Please wait.. Fetching response...";

    // get all the parameters
    let url = document.getElementById('urlField').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    console.log(url, requestType, contentType);

    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParams; i++) {
            let key = document.getElementById('paramKey' + (i + 1));
            if (key != undefined) {
                let value = document.getElementById('paramVal' + (i + 1)).value;
                key = key.value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jsonText').value;
    }
    console.log(data);

    // if request type is get 
    if (requestType == 'GET') {
        let f = fetch(url, { method: 'GET', });
        f.then((response) => { return response.text() }).then((text) => {
            document.getElementById('responseText').value = text
            console.log(text);
        });
    }
    else {
        let f = fetch(url, {
            method: 'POST',
            headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        });
        f.then((response) => { return response.text() }).then((text) => {
            document.getElementById('responseText').value = text
            console.log(text);
        });
    }
}