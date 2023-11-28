function timeStamp() {
    let now = new Date();
    let month = Number(now.getMonth()) + 1;
    return (
        now.getFullYear() +
        "-" +
        month +
        "-" +
        now.getDate() +
        " " +
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds() +
        "." +
        now.getMilliseconds()
    );
}

function simplifyText(textToSimplify) {
    let simplifiedText = "";

    for (let i = 0; i < textToSimplify.length; i++) {
        switch (textToSimplify[i]) {
            case '{':
            case '}':
            case '[':
            case ']':
            case '"':
                break;
            case ':':
                simplifiedText += textToSimplify[i];
                simplifiedText += ' ';
                break;
            case ',':
                simplifiedText += textToSimplify[i];
                simplifiedText += ' ';
                break;
            default:
                simplifiedText += textToSimplify[i];
                break;
        }
    }

    return simplifiedText;
}

function listifyArrayHTML(arrayToListify) {
    let listifiedText = "";
    var keyIndex = 0;

    arrayToListify.forEach(element => {
        listifiedText += `<li class="list-group-item" key="${keyIndex++}">` + simplifyText(JSON.stringify(element)) + '</li>';
    });

    return listifiedText;
}

function listifyArrayJSX(arrayToListify) {
    let listifiedText = "";
    var keyIndex = 0;

    listifiedText += '<ul className="list-group">';

    arrayToListify.forEach(element => {
        listifiedText += `<li className="list-group-item" key="${keyIndex++}">` + simplifyText(JSON.stringify(element)) + '</li>';
    });

    listifiedText += '</ul>';

    return listifiedText;
}

export { timeStamp, simplifyText, listifyArrayHTML, listifyArrayJSX };
