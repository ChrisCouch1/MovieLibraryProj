(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm );
})(jQuery);

$(function(){ 
    $.get("https://localhost:44325/api/movie").then(function(data){
        data.map(function(el){            
            $("#movieList").append(`<div>
            <div>Title:<div id="movieTitle${el.movieId}">${JSON.stringify(el.title)}</div></div>
            <div>Director :<div id="movieDirector${el.movieId}">${JSON.stringify(el.director)}</div></div>
            <div>Genre: <div id="movieGenre${el.movieId}">${JSON.stringify(el.genre)}</div></div>
            <button type="button" onclick="putFunction(${el.movieId})">Edit</button>
            <button type="button" onclick="deleteFunction(${el.movieId})">Delete</button>
            </div><br>`)
        })
    })

})

function putFunction(id){
    let title=$("#my-title").val();
    let director=$("#my-director").val();
    let genre=$("#my-genre").val();

    var dict = {
        title:title,
        director:director,
        genre:genre,
    };
    console.log(title);
    $.ajax({
        url: `https://localhost:44325/api/movie/${id}`,
        dataType: 'json',
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function(dict){
            var x = $("#movieList").find(x => x.id === this.id);
            x.director = dict.director;
            x.title = dict.title;
            x.genre = dict.genre;                
        },
    
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    }
    );
    
}

    
