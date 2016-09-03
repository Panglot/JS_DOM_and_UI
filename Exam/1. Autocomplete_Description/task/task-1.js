/* globals document, window, console */

function solve() {
    return function (selector, initialSuggestions) {
        var outerDiv = document.querySelector(selector),
            theInput = document.getElementsByClassName('tb-pattern')[0],
            addButton = outerDiv.children[1],
            suggestionList = document.getElementsByClassName('suggestions-list')[0],
            filtered = [],
            i = 0,
            j = 0,
            len = 0,
            lenj = 0,
            itemTemplate = document.createElement('li'),
            doesntExistInTheSuggestions = true,
            suggestionsAfterFilter = [],
            suggestionsArray = [];

        if (initialSuggestions !== undefined && initialSuggestions.length !==0) {
            suggestionsAfterFilter.push(initialSuggestions[0]);

            for (i = 1, len = initialSuggestions.length; i < len; i += 1) {
                for (j = 0, lenj = suggestionsAfterFilter.length; j < lenj; j += 1) {
                    if (initialSuggestions[i].toLowerCase() === suggestionsAfterFilter[j].toLowerCase()) {
                        doesntExistInTheSuggestions = false;
                    }
                }

                if (doesntExistInTheSuggestions) {
                    suggestionsAfterFilter.push(initialSuggestions[i]);
                }
                doesntExistInTheSuggestions = true;
            }
        }



        itemTemplate.className = "suggestion";
        itemTemplate.hidden = true;

        function refreshSuggestionsList(actualSuggestions) {
            if(actualSuggestions !== undefined && actualSuggestions.length !==0) {
                suggestionList.innerHTML = "";
                suggestionsArray = [];
                for (i = 0, len = actualSuggestions.length; i < len; i += 1) {
                    itemTemplate.innerHTML = "<a class='suggestion-link'>" + actualSuggestions[i] + "</a>";
                    suggestionsArray.push(itemTemplate.cloneNode(true));
                    suggestionList.appendChild(suggestionsArray[i]);
                    itemTemplate.innerHTML = "";
                }
            }
        }


        refreshSuggestionsList(suggestionsAfterFilter);


        addButton.addEventListener('click', function () {
            for (i = 0, len = suggestionsAfterFilter.length; i < len; i += 1) {
                if (suggestionsAfterFilter[i].toLowerCase() === theInput.value.toLowerCase()) {
                    doesntExistInTheSuggestions = false;
                }
            }

            if (doesntExistInTheSuggestions) {
                suggestionsAfterFilter.push(theInput.value);
            }
            theInput.value = "";
            doesntExistInTheSuggestions = true;

            refreshSuggestionsList(suggestionsAfterFilter);
        })

        theInput.addEventListener('input', function () {


            if (!!theInput.value) {
                for (i = 0, len = suggestionsAfterFilter.length; i < len; i += 1) {
                    if (suggestionsAfterFilter[i].toLowerCase().indexOf(theInput.value.toLowerCase()) !== -1) {
                        suggestionsArray[i].hidden = false;
                    }
                    else {
                        suggestionsArray[i].hidden = true;
                    }
                }
            }
            else {
                for (i = 0, len = suggestionsAfterFilter.length; i < len; i += 1) {
                    suggestionsArray[i].hidden = true;

                }
            }
        });

        suggestionList.addEventListener('click', function (ev) {
            if (ev.target.tagName === "LI" || ev.target.tagName === "A") {
                if(ev.target.tagName ==="LI") {
                    theInput.value = ev.target.children[0].innerHTML;
                }
                if(ev.target.tagName === "A"){
                    theInput.value = ev.target.innerHTML;
                }
                for (i = 0, len = suggestionsAfterFilter.length; i < len; i += 1) {
                    if (suggestionsAfterFilter[i].toLowerCase().indexOf(theInput.value.toLowerCase()) !== -1) {
                        suggestionsArray[i].hidden = false;
                    }
                    else {
                        suggestionsArray[i].hidden = true;
                    }
                }
            }
        })
    };
}

module.exports = solve;