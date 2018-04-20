$(document).ready(function() {

    var latitude, longitude;
    var $temp = $('#temp');
    var $degrees = $('#degrees');
    var $background = $('html body, .container-fluid');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = Number(position.coords.latitude);
            longitude = Number(position.coords.longitude);

            var weatherAppTimeOut = setTimeout(function() {
                $temp.text('Failed to load local weather.');
                console.log("weather app is not working");
            }, 8000);

            $.ajax({
                    url: 'https://fcc-weather-api.glitch.me/api/current?',
                    data: {
                        lat: latitude,
                        lon: longitude
                    },
                    dataType: 'json'
                })
                .done(function(data) {

                    clearTimeout(weatherAppTimeOut);
                    // console.log(data);
                    // set background image depending on temperature and weather description
                    function changeBackground(urlImage) {
                        $background.css('background-image', 'url(' + urlImage + ')');
                    };

                    var urlImage = [
                        'https://s9.postimg.org/3udx2fodr/crop.jpg', //winter clouds
                        'https://s9.postimg.org/3o4tcy75r/7281.jpg', //winter snow
                        'https://s9.postimg.org/gr0fwg2lb/a6bde9af0e70ece8f7d78d1049e16204.jpg', //winter clear
                        'https://s9.postimg.org/4k1ask967/mountain-background-clouds-1080x608.jpg', //spring clouds
                        'https://s9.postimg.org/xk0amj9j3/spring_rain.gif', //spring rain
                        'https://thumbsnap.com/i/dDjiMvMh.jpg', //spring clear
                        'https://s9.postimg.org/wbcf0gub3/sunshine-5120x2880-path-landscape-4k-5170.jpg', //summer clouds
                        'https://s9.postimg.org/8ufyo1bnj/beautiful-rain-wallpapers-5.jpg', //summer rain
                        'https://s9.postimg.org/leb3bpf9b/colza-field-france-1080_P-wallpaper-middle-size.jpg', //summer clear
                        'https://thumbsnap.com/i/zxDixc9T.gif', //autumn rain
                        'https://thumbsnap.com/i/IneJP0X0.jpg', //autumn clouds
                        'https://thumbsnap.com/i/2148z0lQ.jpg', //autumn clear
                        'https://s9.postimg.org/6enc1ndhb/deafult.jpg' //defualt
                    ];

                    //change backgrounds depending on the weather
                    switch (true) {
                        // winter clouds
                        case (data.main.temp <= 0 && (data.weather[0].id >= 801 && data.weather[0].id <= 804)):
                            changeBackground(urlImage[0]);

                            break;

                            // winter snow
                        case (data.main.temp <= 0 && (data.weather[0].id >= 600 && data.weather[0].id <= 622)):
                            changeBackground(urlImage[1]);
                            break;

                            // winter clear
                        case (data.main.temp <= 0 && data.weather[0].id == 800):
                        case (data.main.temp <= 0):
                            changeBackground(urlImage[2]);
                            break;

                            // spring clouds
                        case ((data.main.temp > 15 && data.main.temp < 24) && (data.weather[0].id >= 801 && data.weather[0].id <= 804)):
                            changeBackground(urlImage[3]);
                            break;

                            // spring rain
                        case ((data.main.temp > 15 && data.main.temp < 24) && (data.weather[0].id >= 200 && data.weather[0].id <= 531)):
                            changeBackground(urlImage[4]);
                            break;

                            // spring clear
                        case ((data.main.temp > 15 && data.main.temp < 24) && data.weather[0].id == 800):
                        case (data.main.temp > 15 && data.main.temp < 24):
                            changeBackground(urlImage[5]);
                            break;

                            // summer clouds
                        case (data.main.temp > 24 && (data.weather[0].id >= 801 && data.weather[0].id <= 804)):
                            changeBackground(urlImage[6]);
                            break;

                            // summer rain
                        case (data.main.temp > 24 && (data.weather[0].id >= 200 && data.weather[0].id <= 531)):
                            changeBackground(urlImage[7]);
                            break;

                            // summer clear
                        case (data.main.temp > 24 && data.weather[0].id == 800):
                        case (data.main.temp > 24):
                            changeBackground(urlImage[8]);
                            break;

                            // autumn rain
                        case ((data.main.temp < 15 && data.main.temp > 0) && (data.weather[0].id >= 200 && data.weather[0].id <= 531)):
                            changeBackground(urlImage[9]);
                            break;

                            // autumn clouds
                        case ((data.main.temp < 15 && data.main.temp > 0) && (data.weather[0].id >= 801 && data.weather[0].id <= 804)):
                            changeBackground(urlImage[10]);
                            break;

                            // autumn clear
                        case ((data.main.temp < 24 && data.main.temp > 0) && data.weather[0].id == 800):
                        case (data.main.temp < 24 && data.main.temp > 0):
                            changeBackground(urlImage[11]);
                            break;

                        default:
                            changeBackground(urlImage[12]);
                    }

                    // toggle between Celcsius and Fahrenheit
                    var F = false;

                    function convert(C, F) {
                        if (F) return ((C * 1.8) + 32).toFixed(2);
                        return C.toFixed(1);
                    }

                    var C = convert(data.main.temp, F);
                    $temp.text(C);
                    $degrees.text('\u2103');


                    $('#degrees').on('click', function() {
                        F = !F;
                        $temp.text(convert(data.main.temp, F));
                        if (F) {
                            $degrees.text('\u2109');
                        } else {
                            $degrees.text('\u2103');
                        }
                    });

                    // get better location information using ajax request to https://freegeoip.net
                    var geolocationTimeout = setTimeout(function() {
                        $('#location').text(data.name + ', ' + data.sys.country);
                    }, 1000);

                    $.ajax({
                            url: 'https://freegeoip.net/json',
                            data: {
                                format: 'jsonp'
                            },
                            dataType: 'jsonp'
                        })
                        .done(function(location) {
                            if (location.city && location.region_name) {
                                $('#location').text(location.city + ', ' + location.region_name + ', ' + location.country_code);
                                clearTimeout(geolocationTimeout);
                            }
                        })


                    $('#icon').attr('src', data.weather[0].icon);
                    $('#description').text(data.weather[0].description);
                    $('#windSpeed').text('WS ' + (data.wind.speed * 1.94384449).toFixed(2) + ' knots');
                    $('.details').fadeIn(2000).css("display", "inline-block");

                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    $temp.text('Failed to load local weather.')
                    console.log(errorThrown.toString());
                });
        }, showError);

    } else {
        $temp.text('Geolocation is not supported by this browser.');
    };

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $temp.text('User denied the request for Geolocation.')
                break;
            case error.POSITION_UNAVAILABLE:
                $temp.text('Location information is unavailable.')
                break;
            case error.TIMEOUT:
                $temp.text('The request to get user location timed out.')
                break;
            case error.UNKNOWN_ERROR:
                $temp.text('An unknown error occurred.')
                break;
        };
    };

})
