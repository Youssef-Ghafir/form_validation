let inputs = document.querySelectorAll('input');
inputs.forEach(e => {
    e.setAttribute('autocomplete', 'off')
    e.addEventListener('blur', _ => {
        if (e.getAttribute('data-inf') == 'first_name') {
            User_Name();
        } else if (e.getAttribute('data-inf') == 'last_name') {
            User_Name(document.getElementById('last_name'));
        } else if (e.getAttribute('data-inf') == 'email') {
            EmailCheck();
        } else if (e.getAttribute('data-inf') == 'pass_1') {
            Password_1();
        } else if (e.getAttribute('data-inf') == 'pass_2') {
            Confirm_pass();
        } else if (e.getAttribute('data-inf') == 'adres_1') {
            Adrees();
        } else if (e.getAttribute('data-inf') == 'adres_2') {
            Adrees(document.getElementById('adres_2'));
        }

    })
})
inputs.forEach(e => {
    e.addEventListener('focus', _ => {
        AddClass(e.parentElement, '', true)
    })
})
let Select = document.getElementById('type_account');
Select.addEventListener('click', _ => {
    type_account();
})
// =====================================
function AddClass(element = '', etat = '', rem = false) {
    if (element != '' && !rem) {
        if (etat) {
            element.children[1].classList.add('valid');
            element.children[2].classList.remove('error');
        } else {
            element.children[1].classList.add('error');
            element.children[2].classList.add('error');
        }
    }
    if (rem) {
        element.children[1].classList.remove(...element.children[1].classList);
        element.children[2].classList.remove(...element.children[2].classList);
    }
}

function type_account() {
    if (Select.value != '') {
        AddClass(Select.parentElement, true);
        return true
    } else {
        AddClass(Select.parentElement, false);
        return false
    }
}

function User_Name(element = '') {
    if (element == '') {
        element = document.getElementById('first_name');
    }
    let regex = /[a-z A-Z]/g
    return RegexTest(regex, element);
}

function EmailCheck() {
    let element = document.getElementById('email');
    let regex = /[a-z A-Z \. \- _ 0-9]+@[a-z A-Z \. \- _ 0-9]+\.\w{2,}$/
    return RegexTest(regex, element)
}

function Password_1() {
    let element = document.getElementById('pass_1');
    let regex = /.{8,}/
    if (RegexTest(regex, element)) {
        AddClass(element.parentElement, true)
        return element.value;
    } else {
        AddClass(element.parentElement, false);
        return false;
    }
}

function Confirm_pass() {
    let element = document.getElementById('pass_2')
    if (Password_1()) {
        if (element.value == Password_1()) {
            AddClass(element.parentElement, true)
            return true
        } else {
            AddClass(element.parentElement, false)
            return false
        }
    } else {
        AddClass(element.parentElement, false)
        return false
    }
}

function Adrees(element = '') {
    if (element == '') element = document.getElementById('adres_1');
    let regex = /[a-z A-Z 0-9 \. - _]/g
    if (RegexTest(regex, element)) {
        AddClass(element.parentElement, true)
        return true
    } else {
        AddClass(element.parentElement, false)
        return false
    }
}

function RegexTest(regex, element) {
    if (regex.test(element.value)) {
        AddClass(element.parentElement, true)
        return true
    } else {
        AddClass(element.parentElement, false)
        return false
    }
}

function CheckEtatInput() {
    let result = Adrees() + Boolean(Password_1()) + Confirm_pass() +
        User_Name() + Adrees(document.getElementById('adres_2')) +
        User_Name(document.getElementById('last_name')) +
        EmailCheck() + type_account();
    if (result == inputs.length + 1) {
        return true
    }
    return false
}
document.forms[0].addEventListener('submit', e => {
    if (!CheckEtatInput()) {
        e.preventDefault();
    }
})