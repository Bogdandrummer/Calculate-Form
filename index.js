const maxVal = document.getElementById('max__value');
const minVal = document.getElementById('min__value');
const middleArith = document.getElementById('middle__Arith');
const median = document.getElementById('median');
const posSeq = document.getElementById('pos__seq');
const negSeq = document.getElementById('neg__seq');

const button = document.getElementById('calc__result');
const spinner = document.getElementById('loader');
const Calculate = document.getElementById('calc');

spinner.classList.toggle('d__flex');
fetch('10m.txt')
	.then(response => response.text())
	.then(data => {
		spinner.classList.toggle('d__flex');
		const numbers = data.split('\n').map(Number);
		//Max Value
		const funcMaxValue = () => {
			let max = 0;
			for (let i = 0; i < numbers.length; i++) {
				if (max < numbers[i]) {
					max = numbers[i];
				}
			}
			return maxVal.value = max;
		}

		//Min Value
		const funcMinValue = () => {
			let min = 0;
			for (let i = 0; i < numbers.length; i++) {
				if (min > numbers[i])
					min = numbers[i];
			}
			return minVal.value = min;
		}

		//Median
		const funcMedian = () => {
			let sortArray = numbers.sort(function (a, b) {
				return (a - b)
			});
			const mdIndex = Math.floor((sortArray.length - 1) / 2);
			if (sortArray.length % 2 === 1) {
				return median.value = ((numbers[mdIndex] + numbers[mdIndex] + 1) / 2);
			} else {
				return median.value = numbers[mdIndex];
			}
		}

		//Middle arithmetic
		const funcMiddleArith = () => {
			let middle = 0;
			for (let i = 0; i < numbers.length; i++) {
				middle += numbers[i];
			}
			middle = middle / numbers.length;
			return middleArith.value = middle;
		}

		//Max positive sequence
		const maxPosSeq = () => {
			let tempCount = 0;
			let maxCount = 0;
			let positiveSequence = [];

			for (let i = 0; i < numbers.length; i++) {

				if (numbers[i] < numbers[i + 1]) {
					positiveSequence[i] = numbers[i];
					tempCount += 1;
				}
				else {

					if (maxCount < tempCount) {
						maxCount = tempCount;
					}
					tempCount = 0;

					positiveSequence = [];
				}
			}
			return posSeq.value = maxCount;
		};

		//Max negative sequence
		const maxNegSeq = () => {
			let tempCount = 0;
			let negCount = 0;
			let negativeSequence = [];

			for (let i = 0; i < numbers.length; i++) {

				if (numbers[i] > numbers[i + 1]) {
					negativeSequence[i] = numbers[i];
					tempCount += 1;
				}
				else {
					if (tempCount > negCount) {
						negCount = tempCount;
					}
					tempCount = 0;
					negativeSequence = [];
				}
			}
			return negSeq.value = negCount;
		};


		const calcLoader = () => {
			Calculate.classList.toggle('d__flex');
		}




		//Initialisation function
		const startCalculating = () => {
			calcLoader();
			setTimeout(function () {
				maxPosSeq();
				maxNegSeq();
				funcMaxValue();
				funcMinValue();
				funcMiddleArith();
				funcMedian();
				calcLoader();
			}, 1);
		}

		button.addEventListener('click', startCalculating);
	})
	.catch(err => console.error('Error data'));

