/*
 * adjust canvas according to window size and settings
 * this module is built to be part of the main view
 */
define(function(require){

    var _ = require('underscore');
    var getSize = require('utils/getSize');

    // the function to be used by the main view
    function adjust_canvas(canvas, settings){

        return _.throttle(eventListener, 16);

        function eventListener(event){
            // we put this in a time out because of a latency of orientation change on android devices
            if (event.type == 'orientationchange') setTimeout(resize, 500);
            else resize();
        }

        function resize(){
            var targetSize = getTargetSize(settings, canvas);

            // remove border width and top margin from calculated width (can't depend on cool box styles yet...)
            // we compute only margin-top because of a difference calculating margins between chrome + IE and firefox + mobile
            var computedStyle = window.getComputedStyle(canvas);
            targetSize.height -= parse(computedStyle.borderTopWidth) + parse(computedStyle.borderBottomWidth) + parse(computedStyle.marginTop);
            targetSize.width -= parse(computedStyle.borderLeftWidth) + parse(computedStyle.borderRightWidth);

            // reset canvas size
            canvas.style.width = targetSize.width + 'px';
            canvas.style.height = targetSize.height + 'px';
            canvas.style.fontSize = targetSize.height*(settings.textSize || 3)/100 + 'px';

            // scroll to top of window (hides some of the mess on the top of mobile devices)
            window.scrollTo(0, 1);
        }
    }

    return adjust_canvas;

    function getProportions(settings){
        // if proportions are an object they should include width and height
        if (_.isPlainObject(settings.proportions)) {
            if (typeof settings.proportions.height !== 'number' || typeof settings.proportions.width !== 'number'){
                throw new Error('The canvas proportions object`s height and a width properties must be numeric');
            }
            return settings.proportions.height/settings.proportions.width; 
        } 
        return settings.proportions || 0.8; // by default proportions are 0.8
    }

    function getTargetSize(settings, canvas){
        // calculate proportions (as height/width)
        var proportions = getProportions(settings);

        // static canvas size
        // ------------------
        if (settings.width) return {
            width: settings.width,
            height: settings.width*proportions
        };

        // dynamic canvas size
        // -------------------

        var docElement = window.document.documentElement; // used to get client view size

        var maxHeight = docElement.clientHeight;
        var maxWidth = Math.min(settings.maxWidth, docElement.clientWidth, getSize(canvas.parentNode).width);

        // calculate the correct size for this screen size
        if (maxHeight > proportions * maxWidth) return { height: maxWidth*proportions, width: maxWidth };
        else return { height: maxHeight, width: maxHeight/proportions};
    }

    function parse(num){ return parseFloat(num, 10) || 0;}
});
