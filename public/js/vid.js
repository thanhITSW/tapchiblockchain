$(document).ready(function () {
    // Load videos for video-items-active
    $('.video-items-active .video-wrapper').each(function () {
        var src = $(this).data('src');
        $(this).html('<iframe width="100%" height="500" src="' + src + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    });

    // Load videos for video-info
    $('.video-info .video-wrapper').each(function () {
        var src = $(this).data('src');
        $(this).html('<iframe width="100%" height="200" src="' + src + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    });
});