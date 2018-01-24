$(document).ready(function() {
	
    var latitude, longitude;
    var $temp = $('#temp');
    var $degrees = $('#degrees');
    var $background = $('html body, .container-fluid');

	if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
        latitude = Number(position.coords.latitude);
        longitude = Number(position.coords.longitude);

          $.ajax({
		   	url: 'https://fcc-weather-api.glitch.me/api/current?',
		   	data: {
		   		lat: latitude,
		   		lon: longitude
		   	},
		   	dataType: 'json'
		   })
		   .done(function(data) {
            console.log(data);
            // set background image depending on temperature and weather description 
		   	switch (true) {
                // winter clouds
		   		case (data.main.temp <= 0 && data.weather[0].description.indexOf('clouds') >= 0):
		   		$background.css('background-image', 'url(' + 'https://s9.postimg.org/3udx2fodr/crop.jpg' + ')');
		   		break;
                // winter snow
                case (data.main.temp <= 0 && data.weather[0].description.indexOf('snow') >= 0):
                $background.css('background-image', 'url(' + 'https://s9.postimg.org/3o4tcy75r/7281.jpg' + ')');
                break;
                // winter clear
                case (data.main.temp <= 0 && data.weather[0].description.indexOf('clear') >= 0):
		   		case (data.main.temp <= 0):
		   		$background.css('background-image', 'url(' + 'https://s9.postimg.org/gr0fwg2lb/a6bde9af0e70ece8f7d78d1049e16204.jpg' + ')');
		   		break;
                // spring clouds
		   		case ((data.main.temp > 15 &&  data.main.temp < 24) && data.weather[0].description.indexOf('clouds') >= 0):
		   		$background.css('background-image', 'url(' + 'https://s9.postimg.org/4k1ask967/mountain-background-clouds-1080x608.jpg' + ')');
		   		break;
                // spring rain
		   		case ((data.main.temp > 15 &&  data.main.temp < 24) && data.weather[0].description.indexOf('rain') >=0 ):
                $background.css('background-image', 'url(' + 'https://s9.postimg.org/xk0amj9j3/spring_rain.gif' + ')');
                break;
                // spring clear
                case ((data.main.temp > 15 &&  data.main.temp < 24)  && data.weather[0].description.indexOf('clear') >=0):
                case (data.main.temp > 15 &&  data.main.temp < 24):
                $background.css('background-image', 'url(' + 'https://thumbsnap.com/i/dDjiMvMh.jpg' + ')');
                break;
                // summer clouds
                case (data.main.temp > 24  && data.weather[0].description.indexOf('clouds') >=0 ):
                $background.css('background-image', 'url(' + 'https://s9.postimg.org/wbcf0gub3/sunshine-5120x2880-path-landscape-4k-5170.jpg' + ')');
                break;
                // summer rain
                case (data.main.temp > 24  && data.weather[0].description.indexOf('rain') >= 0):
                $background.css('background-image', 'url(' + 'https://s9.postimg.org/8ufyo1bnj/beautiful-rain-wallpapers-5.jpg' + ')');
                break;
                // summer clear
                case (data.main.temp > 24  && data.weather[0].description.indexOf('clear') >= 0):
                case (data.main.temp > 24):
                $background.css('background-image', 'url(' + 'https://s9.postimg.org/leb3bpf9b/colza-field-france-1080_P-wallpaper-middle-size.jpg' + ')');
                break;
                // autumn rain
                case ((data.main.temp < 15 && data.main.temp > 0)  && data.weather[0].description.indexOf('rain') >=0):
                $background.css('background-image', 'url(' + 'https://thumbsnap.com/i/zxDixc9T.gif' + ')');
                break;
                // autumn clouds
                case ((data.main.temp < 15 && data.main.temp > 0)  && data.weather[0].description.indexOf('clouds') >=0):
                $background.css('background-image', 'url(' + 'https://thumbsnap.com/i/IneJP0X0.jpg' + ')');
                break;
                // autumn clear
                case ((data.main.temp < 24 && data.main.temp > 0) && data.weather[0].description.indexOf('clear') >=0):
                case (data.main.temp < 24 && data.main.temp > 0):
                $background.css('background-image', 'url(' + 'https://thumbsnap.com/i/2148z0lQ.jpg' + ')');
                break;

		   		default:
		   		$background.css('background-image', 'url(' + 'https://s9.postimg.org/6enc1ndhb/deafult.jpg' + ')');
		   	}

            $temp.text(data.main.temp.toFixed(1));
            $degrees.text("\u2103");
          
            $('#location').text(data.name + ', ' + data.sys.country);
            $('#icon').attr('src', data.weather[0].icon);
            $('#description').text(data.weather[0].description);
            $('#windSpeed').text('WS ' + (data.wind.speed * 1.94384449).toFixed(2) +  ' knots');
            $('.details').fadeIn(2000).css("display","inline-block");

		   })
		   .fail(function(jqXHR, textStatus, errorThrown) {
		   	$temp.text('Failed to load local weather.')
		   	console.log(errorThrown.toString());
		   });
         }, showError);
    }
    else {
    	$temp.text('Geolocation is not supported by this browser.');
    };

    function showError(error) {
    switch(error.code) {
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
  
   $('a').on('click', function() {
   	if($degrees.text() === '\u2103') {
   		$temp.text((($temp.text()*1.8) + 32).toFixed(2));
   		$degrees.text('\u2109');
   	}
   	else {
   		$temp.text((($temp.text() - 32) * 5 / 9).toFixed(1));
   		$degrees.text('\u2103');
   	}
   });
   
})
