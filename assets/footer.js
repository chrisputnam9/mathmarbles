MathMarbles = (function(MM, $){
    // Doc Ready
    $(function() {

        // Match height to width
        $('.js-square').squarify();

        // Window Ready, and all JS has run
        $(window).load(function() {

            // Hide loading screen
            $('.loadblock').fadeOut();

            // Start the loop
            MM.Loop.init();

        });
    });

    // The main loop
    MM.Loop = {
        tick: 1000,
        looper: null,

        rows: [],

        n: 0,
        r: 0,

        // Initialize - start loop
        init: function () {
            this.looper = window.setInterval(this.increment, this.tick);
        },

        // Add a row of marbles
        addRow: function() {
        },

        // Increment and update rows
        increment: function () {
            this.n++;
        }
    }

    // Squarify objects
    $.fn.squarify = function() {
        // Loop through all, since they could have different widths
        return this.each(function () {
            var $this = $(this),
                width = $this.width();
            $this.height(width);
        });
    }

    return MM;
}({}, jQuery));
