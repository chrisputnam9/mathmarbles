MathMarbles = (function(MM, $){
    // Doc Ready
    $(function() {

        // Match height to width
        $('.js-square').squarify();

        // Window Ready, and all JS has run
        $(window).load(function() {

            // Load templates
            //  hide loader when done
            MM.Templater.init(function () {
                // Hide loading screen
                $('.loadblock').fadeOut();

                console.log(MM.Templater.templates);
            });

            // Start the loop
            MM.Loop.init();

        });
    });

    // The main loop
    MM.Loop = {
        // Settings
        tick: 3000,
        marbles_per_row: 12,

        // Properties
        rows: [],
        looper: null,
        n: 0,
        r: 0,

        $container: null,

        // Initialize - start loop
        init: function () {
            this.looper = window.setInterval(this.increment, this.tick);
            this.$container = $('#main-container');
        },

        // Add a row of marbles
        addRow: function(formula, options) {

            var $row = MM.Templater.get('row');

            for (m=12;m>0;m--) {
                var $slot = MM.Templater.get('slot');
                console.log($slot);
                $row.append($slot.addClass('slot--'+m));
            }

            this.$container.append($row);

            this.rows.push({
                formula: formula,
                options: options,
                $row: $row
            });
        },

        // Increment and update rows
        increment: function () {
            var self = MM.Loop;
            self.n++;
        }
    };

    MM.Templater = {

        templates: {},

        // Initialize templater
        init: function (callback) {
            var self = this;

            $.get('./templates.jshtml', function(data) {
                var self = MM.Templater,
                    $data = $(data);

                $data.filter('._mm_template').each(function() {
                    var $template = $(this),
                        id = $template.attr('id').substr(13);

                    self.templates[id] = $template;

                }, 'html');

                callback();
            });
        },

        // Get template by ID
        get: function (id) {
            console.log(id);
            if (id in this.templates) {
                return this.templates[id].clone();
            }

            return "";
        }
    };

    MM.UpdateOptions = function(options) {

    };

    MM.AddRow = function(formula, options) {
        MM.Loop.addRow(formula, options);
    };

    // Squarify objects
    $.fn.squarify = function() {
        // Loop through all, since they could have different widths
        return this.each(function () {
            var $this = $(this),
                width = $this.width();
            $this.height(width);
        });
    };

    return MM;
}({}, jQuery));
