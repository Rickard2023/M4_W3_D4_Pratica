let shownMenu = document.getElementById("drop-menu");
let searchFilter;

const eFilters = {
	NAME:  0,
	USER:  1,
	EMAIL: 2,
	NONE:  3,
    COUNT: 4
}

function filterCheck(result, inputValue)
{
    let check = true;
    let searchInput = inputValue.value.toString().toLowerCase();
    let searchString;

    switch(searchFilter)
    {
        case eFilters.NAME:
        {
            searchString = result.name.toString().toLowerCase();

            if(!searchString.includes(searchInput))
                check = false;

            break;
        }

        case eFilters.USER:
        {
            searchString = result.username.toString().toLowerCase();

            if(!searchString.includes(searchInput))
                check = false;

            break;
        }

        case eFilters.EMAIL:
        {
            searchString = result.email.toString().toLowerCase();

            if(!searchString.includes(searchInput))
                check = false;

            break;
        }
        default:
        {
            check = false;

            searchString = result.name.toString().toLowerCase();
            if(searchString.includes(searchInput))
                check = true;
           
            searchString = result.username.toString().toLowerCase();
            if(searchString.includes(searchInput))
                check = true;

            searchString = result.email.toString().toLowerCase();
            if(searchString.includes(searchInput))
                check = true;
    
            break;
        }
    }

    return check;
}


async function getData(inputValue) {


    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let results = await response.json();

    let tableBody = document.getElementById("tablebody");

    tableBody.innerHTML = '';

    for(result of results)
    {
        if(!filterCheck(result, inputValue))
            continue;

        tableBody.innerHTML += '<tr> <th scope="row">'+result.name+'</th><td>'+result.username+'</td> <td>'+result.email+'</tr>'
    }

 //   tableBody.innerHTML += '<tr> <th scope="row">'+result.name+'</th><td>'+result.username+'</td> <td>'+result.email+'</tr>'
 
    return results;
}


function buttonChange(event)
{

  if(!shownMenu){
        return;
    }
      
    let button = event.target;
   
    let buttName = ["By name", "By username", "By email", "None"];
    for(let b = 0; b < eFilters.COUNT; b++)
    {
        if(button.id == "butt"+b ) {
            console.log("clicked button " + b);
            console.log(button.innerText);
            shownMenu.innerText = buttName[b];       
            searchFilter = b === eFilters.NONE ? undefined : b;  
            console.log(searchFilter);
        }
    }


    
}


function searched()
{
    let inputval = document.getElementById("inputVal");
    console.log(inputval.value);
    getData(inputval);
}