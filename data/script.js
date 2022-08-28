 import {Blue} from './mythicCards/blue/index.js'
 import {Brown} from './mythicCards/brown/index.js'
 import {Green} from './mythicCards/green/index.js'

 import {ancientsData} from './ancients.js'

const choiseText = document.querySelector('.wrapper p');
const buttonCards = document.querySelector('.button-wrapper');
const ancientsList = document.querySelector('.ancients-list');
const levelList = document.querySelector('.list-level');
const levelListWrapper = document.querySelector('.list-level-wrapper');
const buttonDeckOfCards = document.querySelector('button');
const indicateFirstStageGreen = document.querySelector('.first-stage .green'),
      indicateFirstStageBrown = document.querySelector('.first-stage .brown'),
		indicateFirstStageBlue = document.querySelector('.first-stage .blue'),
		indicateSecondStageGreen = document.querySelector('.second-stage .green'),
      indicateSecondStageBrown = document.querySelector('.second-stage .brown'),
		indicateSecondStageBlue = document.querySelector('.second-stage .blue'),
		indicateThirdStageGreen = document.querySelector('.third-stage .green'),
      indicateThirdStageBrown = document.querySelector('.third-stage .brown'),
		indicateThirdStageBlue = document.querySelector('.third-stage .blue');
const cardArea = document.querySelector('.card-area');
const cardBack = document.querySelector('.card__back');
const cardFace = document.querySelector('.card__face');

let choisedAncient;
let choisedLevel;
let choisedAncientData;

let levelBlueArray = [],
    levelBrownArray = [],
	 levelGreenArray = [];

let normalCardsGreen = [],
    normalCardsBrown = [],
	 normalCardsBlue = [];

let firstStage = [],
    secondStage = [],
	 thirdStage = [];

let firstStageRandom = [],
    secondStageRandom = [],
	 thirdStageRandom = [];

ancientsList.addEventListener('click', e => {
	if (e.target.tagName === 'LI'){
		choisedAncient = e.target.getAttribute('class');
		e.target.classList.add('choised');
		for (let i = 0; i < ancientsList.children.length; i++){
			if(!ancientsList.children[i].classList.contains(choisedAncient)){
				ancientsList.children[i].classList.remove('choised');
			}
		}
		for (let i = 0; i < ancientsData.length; i++){
			if (ancientsData[i].name === choisedAncient){
				choisedAncientData = ancientsData[i];
			}
		}
		levelListWrapper.classList.remove('hide');
	}
})

levelList.addEventListener('click', e => {
	if (e.target.tagName === 'LI'){
		choisedLevel = e.target.getAttribute('class');
		e.target.classList.add('choised-level');
		for (let i = 0; i < levelList.children.length; i++){
			if(!levelList.children[i].classList.contains(choisedLevel)){
				levelList.children[i].classList.remove('choised-level');
			}
		}
		takeLevelCards(Blue, levelBlueArray, normalCardsBlue)
		takeLevelCards(Brown, levelBrownArray, normalCardsBrown)
		takeLevelCards(Green, levelGreenArray, normalCardsGreen)
		
		levelBlueArray = levelBlueArray.map(item => 'blue-' + item)
		levelBrownArray = levelBrownArray.map(item => 'brown-' + item)
		levelGreenArray = levelGreenArray.map(item => 'green-' + item)
		takeCardsStages()

		if (!ancientsList.classList.contains('choised-game')){
			ancientsList.classList.add('choised-game')
		}
		if (!levelListWrapper.classList.contains('choised-game')){
			levelListWrapper.classList.add('choised-game');
		}
		
		buttonCards.classList.remove('hide');
		choiseText.textContent = 'Выбор сделан';
		choiseText.style.color = 'red';
	}
})

buttonDeckOfCards.addEventListener('click', ()=>{
	indicateFirstStageGreen.textContent = choisedAncientData.firstStage.greenCards;
	indicateFirstStageBrown.textContent = choisedAncientData.firstStage.brownCards;
	indicateFirstStageBlue.textContent = choisedAncientData.firstStage.blueCards;
	indicateSecondStageGreen.textContent = choisedAncientData.secondStage.greenCards;
   indicateSecondStageBrown.textContent = choisedAncientData.secondStage.brownCards;
	indicateSecondStageBlue.textContent = choisedAncientData.secondStage.blueCards;
	indicateThirdStageGreen.textContent = choisedAncientData.thirdStage.greenCards;
   indicateThirdStageBrown.textContent = choisedAncientData.thirdStage.brownCards;
	indicateThirdStageBlue.textContent = choisedAncientData.thirdStage.blueCards;
	cardBack.style.background = 'url(assets/cardBack.jpg) center/cover no-repeat';
	stageCardRandom();
	cardArea.classList.remove('hide');
	if (!buttonCards.classList.contains('choised-game')){
		buttonCards.classList.add('choised-game');
	}
})

cardBack.addEventListener('click', () =>{
	showFaceCard()
})

function takeLevelCards(color, arr, normalArr){
	if (arr.length !== 0){
		while (arr.length > 0){
			arr.pop()
		}
	}
	for( let i = 0; i < color.length; i++){
		if(choisedLevel === 'simple'){
			if(color[i].difficulty === 'easy'){
				arr.push(i + 1)
			}
			if(color[i].difficulty === 'normal'){
				normalArr.push(i + 1)
			}
		}
		if(choisedLevel === 'easy'){
			if(color[i].difficulty !== 'hard'){
				arr.push(i + 1)
			}
		}
		if(choisedLevel === 'normal'){
			arr.push(i + 1)
		}
		if(choisedLevel === 'hard'){
			if(color[i].difficulty !== 'easy'){
				arr.push(i + 1)
			}
		}
		if(choisedLevel === 'difficult'){
			if(color[i].difficulty === 'hard'){
				arr.push(i + 1)
			}
			if(color[i].difficulty === 'normal'){
				normalArr.push(i + 1)
			}
		}
	}
}

function takeCardsStages(){
	const summGreenCards = choisedAncientData.firstStage.greenCards + choisedAncientData.secondStage.greenCards + choisedAncientData.thirdStage.greenCards;
	const summBrownCards = choisedAncientData.firstStage.brownCards + choisedAncientData.secondStage.brownCards + choisedAncientData.thirdStage.brownCards;
	const summBlueCards = choisedAncientData.firstStage.blueCards + choisedAncientData.secondStage.blueCards + choisedAncientData.thirdStage.blueCards;

	if (levelGreenArray.length < summGreenCards){
		const levelGreenArrayLength = levelGreenArray.length;
		for (let i = 0; i < summGreenCards - levelGreenArrayLength; i++){
			let indexChoisedCard = Math.floor(Math.random() * (normalCardsGreen.length - 1))
			levelGreenArray.push('green-' + normalCardsGreen[indexChoisedCard])
			normalCardsGreen.splice(indexChoisedCard,1)
		}
	}
	if (levelBrownArray.length < summBrownCards){
		const levelBrownArrayLength = levelBrownArray.length;
		for (let i = 0; i < summBrownCards - levelBrownArrayLength; i++){
			let indexChoisedCard = Math.floor(Math.random() * (normalCardsBrown.length - 1))
			levelBrownArray.push('brown-' + normalCardsBrown[indexChoisedCard])
			normalCardsBrown.splice(indexChoisedCard,1)
		}
	}
	if (levelBlueArray.length < summBlueCards){
		const levelBlueArrayLength = levelBlueArray.length;
		for (let i = 0; i < summBlueCards - levelBlueArrayLength; i++){
			let indexChoisedCard = Math.floor(Math.random() * (normalCardsBlue.length - 1))
			levelBlueArray.push('blue-' + normalCardsBlue[indexChoisedCard])
			normalCardsBlue.splice(indexChoisedCard,1)
		}
	}

	for(let i = 0; i < choisedAncientData.firstStage.greenCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelGreenArray.length - 1))
		firstStage.push(levelGreenArray[indexChoisedCard])
		levelGreenArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < choisedAncientData.firstStage.blueCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBlueArray.length - 1))
		firstStage.push(levelBlueArray[indexChoisedCard])
		levelBlueArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < choisedAncientData.firstStage.brownCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBrownArray.length - 1))
		firstStage.push(levelBrownArray[indexChoisedCard])
		levelBrownArray.splice(indexChoisedCard,1)
	}

	for(let i = 0; i < choisedAncientData.secondStage.greenCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelGreenArray.length - 1))
		secondStage.push(levelGreenArray[indexChoisedCard])
		levelGreenArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < choisedAncientData.secondStage.blueCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBlueArray.length - 1))
		secondStage.push(levelBlueArray[indexChoisedCard])
		levelBlueArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < choisedAncientData.secondStage.brownCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBrownArray.length - 1))
		secondStage.push(levelBrownArray[indexChoisedCard])
		levelBrownArray.splice(indexChoisedCard,1)
	}

	for(let i = 0; i < choisedAncientData.thirdStage.greenCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelGreenArray.length - 1))
		thirdStage.push(levelGreenArray[indexChoisedCard])
		levelGreenArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < choisedAncientData.thirdStage.blueCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBlueArray.length - 1))
		thirdStage.push(levelBlueArray[indexChoisedCard])
		levelBlueArray.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < choisedAncientData.thirdStage.brownCards; i++){
		let indexChoisedCard = Math.floor(Math.random() * (levelBrownArray.length - 1))
		thirdStage.push(levelBrownArray[indexChoisedCard])
		levelBrownArray.splice(indexChoisedCard,1)
	}
}

function stageCardRandom(){
	const firstStageLength = firstStage.length;
	const secondStageLength = secondStage.length;
	const thirdStageLength = thirdStage.length;

	for(let i = 0; i < firstStageLength; i++){
		let indexChoisedCard = Math.floor(Math.random() * (firstStage.length - 1))
		firstStageRandom.push(firstStage[indexChoisedCard])
		firstStage.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < secondStageLength; i++){
		let indexChoisedCard = Math.floor(Math.random() * (secondStage.length - 1))
		secondStageRandom.push(secondStage[indexChoisedCard])
		secondStage.splice(indexChoisedCard,1)
	}
	for(let i = 0; i < thirdStageLength; i++){
		let indexChoisedCard = Math.floor(Math.random() * (thirdStage.length - 1))
		thirdStageRandom.push(thirdStage[indexChoisedCard])
		thirdStage.splice(indexChoisedCard,1)
	}

	console.log(firstStageRandom)
	console.log(secondStageRandom)
	console.log(thirdStageRandom)
}

function showFaceCard(){
	if(firstStageRandom.length){
		let showCard = firstStageRandom[firstStageRandom.length - 1];
		if (showCard.indexOf('green') > -1){
			cardFace.style.background = `url(assets/MythicCards/green/${showCard}.jpg) center/cover no-repeat`;
		   firstStageRandom.pop()
			indicateFirstStageGreen.textContent = +indicateFirstStageGreen.textContent - 1;
		}
		if (showCard.indexOf('blue') > -1){
			cardFace.style.background = `url(assets/MythicCards/blue/${showCard}.jpg) center/cover no-repeat`;
		   firstStageRandom.pop()
			indicateFirstStageBlue.textContent = +indicateFirstStageBlue.textContent - 1;
		}
		if (showCard.indexOf('brown') > -1){
			cardFace.style.background = `url(assets/MythicCards/brown/${showCard}.jpg) center/cover no-repeat`;
		   firstStageRandom.pop()
			indicateFirstStageBrown.textContent = +indicateFirstStageBrown.textContent - 1;
		}
	} else if (secondStageRandom.length){
		let showCard = secondStageRandom[secondStageRandom.length - 1];
		if (showCard.indexOf('green') > -1){
			cardFace.style.background = `url(assets/MythicCards/green/${showCard}.jpg) center/cover no-repeat`;
		   secondStageRandom.pop()
			indicateSecondStageGreen.textContent = +indicateSecondStageGreen.textContent - 1;
		}
		if (showCard.indexOf('blue') > -1){
			cardFace.style.background = `url(assets/MythicCards/blue/${showCard}.jpg) center/cover no-repeat`;
		   secondStageRandom.pop()
			indicateSecondStageBlue.textContent = +indicateSecondStageBlue.textContent - 1;
		}
		if (showCard.indexOf('brown') > -1){
			cardFace.style.background = `url(assets/MythicCards/brown/${showCard}.jpg) center/cover no-repeat`;
		   secondStageRandom.pop()
			indicateSecondStageBrown.textContent = +indicateSecondStageBrown.textContent - 1;
		}
	} else if (thirdStageRandom.length){
		let showCard = thirdStageRandom[thirdStageRandom.length - 1];
		if (showCard.indexOf('green') > -1){
			cardFace.style.background = `url(assets/MythicCards/green/${showCard}.jpg) center/cover no-repeat`;
		   thirdStageRandom.pop()
			indicateThirdStageGreen.textContent = +indicateThirdStageGreen.textContent - 1;
		}
		if (showCard.indexOf('blue') > -1){
			cardFace.style.background = `url(assets/MythicCards/blue/${showCard}.jpg) center/cover no-repeat`;
		   thirdStageRandom.pop()
			indicateThirdStageBlue.textContent = +indicateThirdStageBlue.textContent - 1;
		}
		if (showCard.indexOf('brown') > -1){
			cardFace.style.background = `url(assets/MythicCards/brown/${showCard}.jpg) center/cover no-repeat`;
		   thirdStageRandom.pop()
			indicateThirdStageBrown.textContent = +indicateThirdStageBrown.textContent - 1;
		}
		if (thirdStageRandom.length === 0){
			cardBack.style.background = 'none';
		}
	} 
}






