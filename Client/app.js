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
                getFunction();
  
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
            $("#movieList").append(`<div class="container" style="    
                
    margin-right: 35%;
    background-color: #842024;
    max-width: 20rem;
    color: #ffffff;
    height: 10rem;
    padding: 1.5rem;
    background-image: linear-gradient(to right, #010101 , #842024 50%, black );">
            <div><span style="font-weight: 600;">Title:&nbsp;</span><span id="movieTitle${el.movieId}">${JSON.stringify(el.title)}</span></div>
            <div><span style="font-weight: 600;">Director:&nbsp;</span><span id="movieDirector${el.movieId}">${JSON.stringify(el.director)}</span></div>
            <div><span style="font-weight: 600;">Genre:&nbsp;</span><span id="movieGenre${el.movieId}">${JSON.stringify(el.genre)}</span></div>
            <button type="button" onclick="putFunction(${el.movieId})"style="color: #eaebec;border-radius: 3px;background-image: linear-gradient(to top, #832024 5%, #000000 50%, transparent);font-weight: 800;">Edit</button>
            <button type="button" onclick="deleteFunction(${el.movieId})"style="color: #eaebec; border-radius: 3px; background-image: linear-gradient(to top, #832024 5%, #000000 50%, transparent);font-weight: 800;">Delete</button>
            </div><br>`)
        })
    })

})

function getFunction(){
     $.get("https://localhost:44325/api/movie").then(function(data){
        data.map(function(el){            
            $("#movieList").append(`
            <div class="col-lg-10 mb-4">
            <div class="card bg-dark text-white text-center w-25 p-3">
            <img src="Images/hotpopcornmovie.png" width="100" height="100">
            <div>Title:&nbsp;<span id="movieTitle${el.movieId}">${JSON.stringify(el.title)}</span></div>
            <div>Director:&nbsp;<span id="movieDirector${el.movieId}">${JSON.stringify(el.director)}</span></div>
            <div>Genre:&nbsp;<span id="movieGenre${el.movieId}">${JSON.stringify(el.genre)}</span></div>
            <button type="button" class="btn btn-light" onclick="putFunction(${el.movieId})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteFunction(${el.movieId})">Delete</button>
            </div>
            <div><br>`)
        })
    })
}


function putFunction(id){
    $(function(){ 
        pathToMovie = `https://localhost:44325/api/movie/${id}`
        $.get(pathToMovie, function(data){
            console.log(data);
            document.getElementById("movieList").innerHTML = " ";
            $("#movieList").append(`
                <div class="col-lg-10 mb-5">
                <div class="card bg-dark text-white text-center w-25 p-3">
                <img src="Images/hotpopcornmovie.png" width="100" height="100">
                <div>Title: <span id="movieTitle${data.movieId}">${JSON.stringify(data.title)}</span></div>
                <div>Director: <span id="movieDirector${data.movieId}">${JSON.stringify(data.director)}</span></div>
                <div>Genre: <span id="movieGenre${data.movieId}">${JSON.stringify(data.genre)}</span</div>
                <br>
                <button type="button" class="btn btn-success" onclick="putRequestFunction(${data.movieId})">Save Changes</button>
                <button type="button" class="btn btn-warning" onclick="reloadPage()">Refresh Movie List</button>
                </div>
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
            getFunction();     
            },
        
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    
     
}

function reloadPage(){
    location.reload();
}


function deleteFunction(id){
    $(function(){ 
        pathToMovie = `https://localhost:44325/api/movie/${id}`
        $.get(pathToMovie, function(data){
            console.log(data);
            document.getElementById("movieList").innerHTML = " ";
            $("#movieList").append(`
                <div class="col-lg-10 mb-5">
                <div class="card bg-dark text-white text-center w-25 p-3">
                <img src="Images/hotpopcornmovie.png" width="100" height="100">
                <div>
                <div>Title: <span id="movieTitle${data.movieId}">${JSON.stringify(data.title)}</span></div>
                <div>Director: <span id="movieDirector${data.movieId}">${JSON.stringify(data.director)}</span></div>
                <div>Genre: <span id="movieGenre${data.movieId}">${JSON.stringify(data.genre)}</span</div>
                <br>
                <button type="button" class="btn btn-danger" onclick="deleteRequestFunction(${data.movieId})">Delete Movie</button>
                <button type="button" class="btn btn-warning" onclick="reloadPage()">Refresh Movie List</button>
                </div>
                </div>
                </div>`)
        })
    
    })
}




function deleteRequestFunction(id){
    $.ajax({
        url: `https://localhost:44325/api/movie/${id}`,
        dataType: 'json',
        type: 'delete',
        contentType: 'application/json',
        data: id,
        success: function(id){
            var x = $("#movieList").find(x => x.id === this.id);
            $("#movieList").remove(x => x.id === this.id);  
            getFunction();               
        },
    
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}






