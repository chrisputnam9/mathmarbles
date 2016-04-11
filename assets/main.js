MathMarbles = (function(MM, $){
    // Doc Ready
    $(function() {

        // Window Ready, and all JS has run
        $(window).load(function() {

            // Load templates
            //  hide loader when done
            MM.Templater.init(function () {

                // Start the loop
                MM.Loop.init();

                // Match height to width
                $('.js-square').squarify();

                // Hide loading screen
                $('.loadblock').fadeOut();

            });

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
            var self = this;
            self.$container = $('#main-container');
            self.initRows();
            self.looper = self.increment();
        },

        // Add a row of marbles
        addRow: function(formula, options) {
            var self = this;

            self.rows.push({
                formula: formula,
                options: options,
            });
        },

        // Initialize Rows
        initRows: function () {
            var self = this,
                row_count = self.rows.length;

            for (i=0;i<row_count;i++) {
                var $row = MM.Templater.get('row'),
                    $title = MM.Templater.get('row-title'),
                    $decimal = MM.Templater.get('row-decimal');

                $title.html(self.rows[i].options.title);
                $row.append($title);
                $row.append($decimal);

                for (m=self.marbles_per_row;m>0;m--) {
                    var $slot = MM.Templater.get('slot');
                    window.$slot = $slot;
                    $row.append($slot.addClass('slot--'+m));
                }

                self.rows[i].$row = $row;

                self.$container.append($row);

            }

        },

        // Increment and update rows
        increment: function () {
            var self = MM.Loop;

            self.n++;
            
            $.each(self.rows, function (i, row) {
                var result = row.formula(self.n),
                    digits = binary(result, self.marbles_per_row);

                row.$row.find('.slot').each(function (i) {
                    var $slot = $(this),
                        digit = digits[i];
                    if (digit == '1') {
                        $slot.addClass('full');
                    } else {
                        $slot.removeClass('full');
                    }

                });

                row.$row.find('.row-decimal').html(result);

            });

            // continue the loop
            self.looper = window.setTimeout(self.increment, self.tick);
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

                    self.templates[id] = $template.children();

                }, 'html');

                callback();
            });
        },

        // Get template by ID
        get: function (id) {
            var self = this;

            if (id in self.templates) {
                return self.templates[id].clone();
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

    // Convert number to array of binary digits in reverse
    function binary(n, length) {
        var digits = (parseInt(n, 10) >>> 0)
            .toString(2)
            .split('');
        while (digits.length < length) {
            digits.unshift('0');
        }
        return digits;
    }

    return MM;
}({}, jQuery));
