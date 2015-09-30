// Example
$(function() {
    $('.openlink-or-gotoapp').on('click', function(e){

        var target = $(this);

        var params = {
            iphone: {
                protocol: target.data('iphone-protocol'),
                url: target.data('iphone-url')
            },
            android: {
                protocol: target.data('android-protocol'),
                url: target.data('android-url')
            }
        }

        openLink(params);
    });
});

/**
 * Open link.
 *
 *  If installed app, then to open app.
 *  or else to open web url.
 *
 * @param opts object
 *
 * opts: {
 *     iphone: {
 *         protocol: '',
 *         url: ''
 *     },
 *     android: {
 *         protocol: '',
 *         url: ''
 *     }
 * }
 */
function openLink(opts) {
    var userAgent = navigator.userAgent;
    if (userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        var loadDateTime = new Date();
        window.setTimeout(function() {
            var timeOutDateTime = new Date();
            if (timeOutDateTime - loadDateTime < 5000) {
                window.location = opts.iphone.url;
            } else {
                window.close();
            }
        }, 25);
        window.location = opts.iphone.protocol;
    } else if (userAgent.match(/android/i)) {
        var state = null;
        try {
            state = window.open(opts.android.protocol, '_blank');
        } catch(e) {

        }

        if (state) {
            window.close();
        } else {
            window.location = opts.android.url;
        }
    }
}
