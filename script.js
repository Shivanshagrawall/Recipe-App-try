const btn=document.querySelector('.btn');
const inputBox=document.querySelector('#input-box');
const result=document.querySelector('.result');
const container=document.querySelector('.container');
const viewReceipe=document.querySelector('.viewReceipe');

btn.addEventListener('click',async()=>{
    const input=inputBox.value;
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    let information= await fetch(url);
    let data=await information.json();
    console.log(data);

    result.innerHTML=`
    <div class="image">
    <img src="${data.meals[0].strMealThumb}" class="img">
    <div class="about">
    <h2>${data.meals[0].strMeal}</h2>
    <p>${data.meals[0].strArea}</p>
    </div>
    </div>
    `

    let ingredients=[];
    let quantity=[];
    let count=0;
    for(let i in data.meals[0]){
        if(i.startsWith("strIngredient")){
            ingredients[count]=data.meals[0][i];
            count++;
        }
    }
    count=0;
    for(let i in data.meals[0]){
        if(i.startsWith("strMeasure")){
            quantity[count]=data.meals[0][i];
            count++;
        }
    }
    ingredients=ingredients.filter(element => element);
    quantity=quantity.filter(element => element);
    console.log(ingredients);
    console.log(quantity);
    let i=0;
    ingredients.forEach(intg=>{
        let intgreCont=document.createElement('ul');
        let intgre=document.createElement('li');
        intgre.innerHTML=`${intg} =>${quantity[i]}`;
        i++;
        intgreCont.appendChild(intgre);
        result.appendChild(intgreCont);
    })

    viewReceipe.style.display = "block";
    viewReceipe.addEventListener('click',()=>{
    const instructions=data.meals[0].strInstructions;
    console.log(instructions);
    container.innerHTML=instructions.split('\n').join('<br>');

    const but=document.createElement('button');
    but.classList.add('but');
    but.innerHTML="Go Back";

    container.appendChild(but);

    
   })
})

but.addEventListener('click',)
