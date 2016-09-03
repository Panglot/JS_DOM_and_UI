function solve() {
    $.fn.datepicker = function () {
        var i = 0, j = 0, calendarMatrix = new Array(7),
            monthToString = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            date = new Date(),
            currentMonth = date.getMonth(),
            currentYear = date.getFullYear(),
            $parentOfAll = this.parent(),
            $wrapper = $('<div>', {class: 'datepicker-wrapper'}),
            $picker = $('<div>', {class: 'picker'}),
            $header = $('<div>', {class: 'controls'}),
            $calendar = $('<table>', {class: 'calendar'}),
            $footer = $('<div>', {class: 'current-date'}),
            $headerDate = $('<div>', {class: 'current-month'}).text(monthToString[currentMonth] + " " + currentYear),
            $headerLeftButton = $('<button>', {class: 'btn'}).text('<'),
            $headerRightButton = $('<button>', {class: 'btn'}).text('>'),
            $footerDate = $('<a>', {class: 'current-date-link'}).text(date.getDate() + " " + monthToString[currentMonth] + " " + date.getFullYear()),
            pickedDay = date.getDate(),
            pickedMonth = currentMonth,
            pickedYear = currentYear,
            $inputValue = this;


        function daysInMonth(year, month) {
            return new Date(year, month + 1, 0).getDate();
        }

        $header.append($headerLeftButton);
        $header.append($headerDate);
        $header.append($headerRightButton);


        for (i = 0; i < 7; i++) {
            calendarMatrix [i] = new Array(7);
            var currRow = ($('<tr>'));
            for (j = 0; j < 7; j++) {
                if (i === 0) {
                    calendarMatrix[i][j] = $('<th>').text(weekDays[j]);
                }
                else {
                    calendarMatrix[i][j] = $('<td>');
                }
                currRow.append(calendarMatrix[i][j]);
            }
            $calendar.append(currRow);
        }

        $footer.append($footerDate);


        function fillCalendar(year, month) {
            // debugger;
            var iterator = new Date(year, month).getDay(),
                limit = daysInMonth(year, month),
                dayToBeFilled = 1,
                row = 1,
                firstSafe = iterator - 1,
                prevLastDay = daysInMonth(year, month - 1),
                nextfirstDay = 1;

            if (firstSafe >= 0) {
                for (i = firstSafe; i >= 0; i -= 1, prevLastDay -= 1) {
                    calendarMatrix[1][i].text(prevLastDay).removeClass().addClass('another-month');
                }
            }


            for (; dayToBeFilled <= limit; iterator += 1, dayToBeFilled += 1) {
                if (iterator === 7) {
                    iterator = 0;
                    row += 1;
                }

                calendarMatrix[row][iterator].text(dayToBeFilled).removeClass().addClass('current-month');
            }

            for (; !((iterator === 7) && (row === 6)); iterator += 1, nextfirstDay += 1) {
                if (iterator === 7) {
                    iterator = 0;
                    row += 1;
                }
                calendarMatrix[row][iterator].text(nextfirstDay).removeClass().addClass('another-month');
            }

        }

        fillCalendar(currentYear, currentMonth);


        $picker.append($header);
        $picker.append($calendar);
        $picker.append($footer);


        this.addClass('datepicker');
        $wrapper.append(this);
        $wrapper.append($picker);


        $parentOfAll.append($wrapper);


        $headerRightButton.on('click', function () {
            pickedMonth += 1;
            if (pickedMonth > 11) {
                pickedMonth = 0;
                pickedYear += 1;
            }
            fillCalendar(pickedYear, pickedMonth);
            $headerDate.text(monthToString[pickedMonth] + " " + pickedYear);

        });

        $headerLeftButton.on('click', function () {
            pickedMonth -= 1;
            if (pickedMonth < 0) {
                pickedMonth = 11;
                pickedYear -= 1;
            }
            fillCalendar(pickedYear, pickedMonth);
            $headerDate.text(monthToString[pickedMonth] + " " + pickedYear);

        });

        this.on('click', function () {
            $picker.addClass('picker-visible');
        });


        $calendar.on('click', function (ev) {
            var calendarNode = ev.target;
            if (calendarNode.classList[0] === 'current-month') {
                pickedDay = calendarNode.innerHTML;

                var output = pickedDay + "/" + pickedMonth + "/" + pickedYear;
                $inputValue.val(output);

                $picker.removeClass().addClass('picker');
            }
        });

        $footerDate.on('click', function () {

            var output = date.getDate() + "/" + currentMonth + "/" + currentYear;
            $inputValue.val(output);
            $picker.removeClass().addClass('picker');
        });

        // function anim() {
        //     var top = Number($picker.css('top').split('p')[0]),
        //         left = Number($picker.css('left').split('p')[0])
        //
        //     $picker.css({'top': top+1}).css({'left': left+1});
        //
        //     requestAnimationFrame(anim);
        // }
        // anim();
    };
};

// if(typeof module !== 'undefined') {
//     module.exports = solve;
// }