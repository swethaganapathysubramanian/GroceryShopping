import { elements } from './base';
import { Fractional } from 'fractional';

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}

// const formatCount = count => {
//     if(count){
        //const newCount = Math.round(count * 10000) / 10000;
//         const [ int, dec ] = newCount.toString().split('.').map(el => parseInt(el, 10));
//         if(!dec) return newCount;

//         if (int === 0){
//             const fr = new Fraction(newCount);
//             fr.numerator = fr.numerator % 4;
//             return `${fr.numerator}/4`;
//         } else {
//             const fr = new Fraction(newCount - int);
//             fr.numerator = fr.numerator%4;
//             return `${int} ${fr.numerator}/4`;
//         }

//     }
//     return '?';
// }

// const formatCount = count => {
//     if (count) {
//        let c = new Fraction(count)
//         //console.log(c.denominator)
//         if(c.denominator >= 100){
//             c.numerator %= 4
//             c.denominator = 4;
//         }
//         return c
        
//         //return new Fraction(count);
//     }
//     return '?';
// }

const createIngredient = (ingredient) => {
    //console.log(ingredient.ingredient.length)
    if (ingredient.ingredient.length > 1){ 
   return `
<li class="recipe__item">
                        <svg class="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div class="recipe__count">${ingredient.count}</div>
                        <div class="recipe__ingredient">
                            <span class="recipe__unit">${ingredient.unit}</span>
                            ${ingredient.ingredient}
                        </div>
                    </li>

`
    }
}
export const renderRecipe = (recipe, isLiked) => {
    const markup = `
     
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.duration}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny minus">
                            <svg >
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny plus">
                            <svg >
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '':'-outlined'}"></use>
                    </svg>
                </button>
            </div>
            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                ${recipe.ingredients.map(el => createIngredient(el)).join('')}
               </ul>

                <button class="btn-small recipe__btn recipe__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.source}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
            
    `;
    elements.recipe.insertAdjacentHTML('afterbegin',markup)
}

export const updateServingIngredients = recipe =>{
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    const countElements = Array.from(document.querySelectorAll('.recipe__count'));

    countElements.forEach((el, i)=>{
        
        el.textContent = formatCount(recipe.ingredients[i].count);
    });
}