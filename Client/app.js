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
            <div>Title:&nbsp;<span id="movieTitle${el.movieId}">${JSON.stringify(el.title)}</span></div>
            <div>Director:&nbsp;<span id="movieDirector${el.movieId}">${JSON.stringify(el.director)}</span></div>
            <div>Genre:&nbsp;<span id="movieGenre${el.movieId}">${JSON.stringify(el.genre)}</span></div>
            <button type="button" onclick="putFunction(${el.movieId})">Edit</button>
            <button type="button" onclick="deleteFunction(${el.movieId})">Delete</button>
            </div><br>`)
        })
    })

})

function putFunction(id){
    $(function(){ 
        pathToMovie = `https://localhost:44325/api/movie/${id}`
        $.get(pathToMovie, function(data){
            console.log(data);
            document.getElementById("movieList").innerHTML = " ";
            $("#movieList").append(`<div>
                <div>Title: <span id="movieTitle${data.movieId}">${JSON.stringify(data.title)}</span></div>
                <div>Director: <span id="movieDirector${data.movieId}">${JSON.stringify(data.director)}</span></div>
                <div>Genre: <span id="movieGenre${data.movieId}">${JSON.stringify(data.genre)}</span</div>
                <br>
                <button type="button" onclick="putRequestFunction(${data.movieId})">Save Changes</button>
                <button type="button" onclick="reloadPage()">Refresh Movie List</button>
            </div>`)
        })
    
    })
}

function putRequestFunction(id){
    
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
        });

     
}



function deleteFunction(id){
    $.ajax({
        url: `https://localhost:44325/api/movie/${id}`,
        dataType: 'json',
        type: 'delete',
        contentType: 'application/json',
        data: id,
        success: function(id){
            var x = $("#movieList").find(x => x.id === this.id);
            $("#movieList").remove(x => x.id === this.id);              
        },
    
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    }
    );
}


function deleteFunction(id){
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
        type: 'Delete',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function(dict){
            var x = $("#movieList").remove(x => x.id === this.id);
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

    
