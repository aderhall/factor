/*window.onload = function() {
    var cards = document.getElementsByClassName("problems-card");
    console.log(cards);
    for (let c of cards) {
        //console.log(c.childNodes);
        let problemList = c.getElementsByClassName("problems-list")[0];
        
    }
};*/

var setNums = [1, 2];

function randint(min, max) {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}

function p(chance) {
    return Math.random() < chance;
}

function uniquePrimeFactors(num) {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293];
    let pf = [];
    for (let i of primes) {
        if (Math.abs(num % i) == 0) {
            pf.push(i);
        }
    }
    return pf;
}

function createFactors() {
    while (true) {
        var factors = [1, 1, 1, 1, 1];
        factors[0] = p(0.1) ? 1 : randint(2, 13);
        if (p(0.2)) {
            factors[0] *= -1;
        }
        factors[2] = p(0.7) ? 1 : randint(2, 7);
        factors[1] = randint(1, 13);
        factors[3] = p(0.1) ? 1 : randint(2, 7);
        if (p(0.3)) {
            factors[1] *= -1;
        } else if (p(0.5)) {
            factors[1] *= -1;
            factors[3] *= -1;
        }
        
        while (true) {
            var found = false;
            for (let i of uniquePrimeFactors(factors[0])) {
                if (uniquePrimeFactors(factors[1]).includes(i)) {
                    found = true;
                    factors[0] /= i;
                    factors[1] /= i;
                    factors[4] *= i;
                }
            }
            if (!found) {
                break;
            }
        }
        while (true) {
            var found = false;
            for (let i of uniquePrimeFactors(factors[2])) {
                if (uniquePrimeFactors(factors[3]).includes(i)) {
                    found = true;
                    factors[2] /= i;
                    factors[3] /= i;
                    factors[4] *= i;
                }
            }
            if (!found) {
                break;
            }
        }
        var negative = 1;
        if (factors[0] < 0 && factors[1] < 0) {
            factors[0] *= -1;
            factors[1] *= -1;
            negative *= -1;
        }
        if (factors[2] < 0 && factors[2] < 0) {
            factors[2] *= -1;
            factors[3] *= -1;
            negative *= -1;
        }
        
        if (factors[4] == 1) {
            var intFactorChance = 0.1;
        } else {
            var intFactorChance = 0.3;
        }
        factors[4] = negative * (p(intFactorChance) ? randint(2, 5) : 1);
        
        var bigNum = Math.abs(factors[0] * factors[1] * factors[2] * factors[3]);
        var pf = uniquePrimeFactors(bigNum);
        if (!pf.length == 0) {
            var sizeLimit = Math.min(...[Math.max(...[200-10*Math.max(...pf), 50]), 130]);
        } else {
            var sizeLimit = 130;
        }
        console.log(sizeLimit);
        if (bigNum > sizeLimit || pf.length > 6 || pf.reduce(function(a, b){return a + b;}, 0) > 18) {
            continue;
        } else {
            return factors.map(x => Math.trunc(x));
        }
    }
}

function createExpression(f) {
    let expr = [f[0]*f[2], f[0]*f[3] + f[1]*f[2], f[1]*f[3]];
    return expr.map(x => x * f[4]);
}

function readableExpression(e) {
    if (e[0] == 0) {
        var t2 = '';
    } else if (e[0] == 1) {
        var t2 = 'x²';
    } else if (e[0] == -1) {
        var t2 = '-x²';
    } else {
        var t2 = `${e[0]}x²`;
    }
    if (e[1] < 0) {
        if (e[0] == 0) {
            if (e[1] == -1) {
                var t1 = '-x';
            } else {
                var t1 = `-${Math.abs(e[1])}x`;
            }
        } else {
            if (e[1] == -1) {
                var t1 = ' - x';
            } else {
                var t1 = ` - ${Math.abs(e[1])}x`;
            }
        }
    } else if (e[1] == 0) {
        var t1 = '';
    } else {
        if (e[0] == 0) {
            if (e[1] == 1) {
                var t1 = 'x';
            } else {
                var t1 = `${e[1]}x`;
            }
        } else {
            if (e[1] == 1) {
                var t1 = ' + x';
            } else {
                var t1 = ` + ${Math.abs(e[1])}x`;
            }
        }
    }
    if (e[2] < 0) {
        if (e[1] == 0 && e[0] == 0) {
            var t0 = `${e[2]}`;
        } else {
            var t0 = ` - ${Math.abs(e[2])}`;
        }
    } else if (e[2] == 0) {
        var t0 = '';
    } else {
        if (e[1] == 0 && e[0] == 0) {
            var t0 = `${e[2]}`;
        } else {
            var t0 = ` + ${Math.abs(e[2])}`;
        }
    }
    return t2 + t1 + t0;
}

function readableFactors(f) {
    if (f[0] == 1) {
        var t0 = 'x';
    } else if (f[0] == -1) {
        var t0 = '-x';
    } else {
        var t0 = `${f[0]}x`;
    }
    if (f[2] == 1) {
        var t2 = 'x';
    } else if (f[2] == -1) {
        var t2 = '-x';
    } else {
        var t2 = `${f[2]}x`;
    }
    if (f[1] < 0) {
        var t1 = ` - ${Math.abs(f[1])}`;
    } else {
        var t1 = ` + ${Math.abs(f[1])}`;
    }
    if (f[3] < 0) {
        var t3 = ` - ${Math.abs(f[3])}`;
    } else {
        var t3 = ` + ${Math.abs(f[3])}`;
    }
    if (f[4] == 1) {
        var t4 = '';
    } else if (f[4] == -1) {
        var t4 = '-';
    } else {
        var t4 = `${f[4]}`;
    }
    return t4 + '(' + t0 + t1 + ')(' + t2 + t3 + ')';
}

function createProblem() {
    let f = createFactors();
    let e = createExpression(f);
    return `<li><div class="question">${readableExpression(e)}</div><div class="answer hidden">${readableFactors(f)}</div><div class="show-one"><a href="javascript:;" onclick="showOne(this);">show answer</a></div></li>`;
}

function addProblem(ele) {
    let parentCard = ele.parentNode.parentNode;
    let problemsList = parentCard.getElementsByClassName("problems-list")[0];
    problemsList.insertAdjacentHTML("beforeend", createProblem());
}

function addMultipleProblems(ele, num) {
    for (let i = 0; i < num; i++) {
        addProblem(ele);
    }
}

function cardAddProblem(card) {
    let problemsList = card.getElementsByClassName("problems-list")[0];
    problemsList.insertAdjacentHTML("beforeend", createProblem());
}

function cardAddMultipleProblems(card, num) {
    for (let i = 0; i < num; i++) {
        cardAddProblem(card);
    }
}

function addProblemSet() {
    sets = document.getElementById("sets");
    let problemCard = document.createElement('div');
    problemCard.className += "problems-card";
    //availableSetNum = 0;
    for (var i = 0; i < setNums.length; i++) {
        if (!setNums.includes(i + 1)) {
            //availableSetNum = i + 1;
            break
        }
    }
    setNums.push(i + 1);
    problemCard.innerHTML = `
    <div class="card-header">
        <h2 class="card-title">Problem set ${i + 1}:</h2>
        <span class="space"></span>
        <a href="javascript:;" onclick="showAnswers(this);">show all answers</a>
        <span>|</span>
        <a href="javascript:;" onclick="hideAnswers(this);">hide all answers</a>
        <span>|</span>
        <a id="discard-set" href="javascript:;" onclick="discardSet(this);">discard set</a>
    </div>
    <hr>
    <ol class="problems-list">
    </ol>
    <div class="add-problems">
        <a href="javascript:;" onclick="addProblem(this);">+ add problem</a>
        <a href="javascript:;" onclick="addMultipleProblems(this, 5);">+ add 5 problems</a>
    </div>
    `;
    cardAddMultipleProblems(problemCard, 3);
    sets.appendChild(problemCard);
}

function discardSet(ele) {
    let parentCard = ele.parentNode.parentNode;
    // Overly complex code for getting the number in the problem set title
    let setTitleWords = parentCard.getElementsByClassName("card-title")[0].innerHTML.split(' ');
    let setNumWord = setTitleWords[setTitleWords.length-1];
    let setNum = parseInt(setNumWord.slice(0, -1));
    // Remove the title number from setNums so it can be reassigned
    setNums.splice(setNums.indexOf(setNum), 1);
    parentCard.remove();
}

function showAnswers(ele) {
    let parentCard = ele.parentNode.parentNode;
    let problemsList = parentCard.getElementsByClassName("problems-list")[0];
    for (let problem of problemsList.children) {
        //let answer = problem.getElementsByClassName("answer")[0];
        //answer.style.display = "block";
        //answer.style.color = "#0d670d";
        //answer.className = "answer";
        let showButton = problem.getElementsByClassName("show-one")[0].children[0];
        showOne(showButton);
    }
}

function hideAnswers(ele) {
    let parentCard = ele.parentNode.parentNode;
    let problemsList = parentCard.getElementsByClassName("problems-list")[0];
    for (let problem of problemsList.children) {
        //let answer = problem.getElementsByClassName("answer")[0];
        //answer.style.color = "#fff";
        //answer.className = "answer hidden";
        //answer.style.display = "none";
        let showButton = problem.getElementsByClassName("show-one")[0].children[0];
        hideOne(showButton);
    }
}

function showOne(ele) {
    let parentProblem = ele.parentNode.parentNode;
    let answer = parentProblem.getElementsByClassName("answer")[0];
    answer.className = "answer";
    ele.innerHTML = "hide answer";
    ele.parentNode.className = "show-one sticky";
    ele.setAttribute("onclick", "hideOne(this);");
}

function hideOne(ele) {
    let parentProblem = ele.parentNode.parentNode;
    let answer = parentProblem.getElementsByClassName("answer")[0];
    answer.className = "answer hidden";
    ele.innerHTML = "show answer";
    ele.parentNode.className = "show-one";
    ele.setAttribute("onclick", "showOne(this);");
}