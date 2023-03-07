var dateTimeEl = $("#dateTime");

dateTimeEl.text(dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"));
setInterval(function() {
    dateTimeEl.text(dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"));
}, 1000);

