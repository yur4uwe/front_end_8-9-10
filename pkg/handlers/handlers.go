package handlers

import (
	"encoding/json"
	"fmt"
	"movie_theater/pkg/database"
	"net/http"
	"net/url"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
)

func parseNumberQueryParam(queries url.Values, param string) (int, error) {
	param_str := queries.Get(param)
	if param_str == "" {
		return 0, fmt.Errorf("missing '%s' query parameter", param)
	}
	param_int, err := strconv.Atoi(param_str)
	if err != nil {
		return 0, fmt.Errorf("invalid '%s' query parameter: %v", param, err)
	}
	return param_int, nil
}

func HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Hello, World!"})
}

func GetMoviesHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	queries := r.URL.Query()

	columns, err := parseNumberQueryParam(queries, "columns")
	if err != nil {
		// If 'columns' is not provided or is less than or equal to 0, set it to 1
		fmt.Println("Error parsing 'columns' query parameter:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if columns <= 0 {
		columns = 1
	}

	per_column, err := parseNumberQueryParam(queries, "perColumn")
	if err != nil {
		fmt.Println("Error parsing 'per_column' query parameter:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	client, collection, cancel, err := database.ConnectTo("movies")
	if err != nil {
		fmt.Println("Failed to connect to database:", err)
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer cancel()
	defer client.Disconnect(ctx)

	movies, err := database.Get(collection, bson.D{}, ctx, columns*per_column)
	if err != nil {
		fmt.Println("Failed to get movies:", err)
		http.Error(w, "Failed to get movies", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(movies)
}

func GetMovieDetailsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetMovieDetailsHandler called")
	ctx := r.Context()
	queries := r.URL.Query()

	movie_id := queries.Get("movieId")
	if movie_id == "" {
		fmt.Println("Error: missing 'movieName' query parameter")
		http.Error(w, "missing 'movieName' query parameter", http.StatusBadRequest)
		return
	}
	fmt.Println("movie_id:", movie_id)

	client, collection, cancel, err := database.ConnectTo("movies")
	if err != nil {
		fmt.Println("Failed to connect to database:", err)
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer cancel()
	defer client.Disconnect(ctx)

	object_id, err := database.ObjectId(movie_id)
	if err != nil {
		fmt.Println("Error converting movie_id to ObjectID:", err)
		http.Error(w, "Invalid movie ID", http.StatusBadRequest)
		return
	}

	movie, err := database.GetOne(collection, bson.D{{Key: "_id", Value: object_id}}, ctx)
	if err != nil {
		fmt.Println("Failed to get movie details:", err)
		http.Error(w, "Failed to get movie details", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(movie)
}

func GetMoviesScreeningsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetMoviesScreeningsHandler called")
	ctx := r.Context()
	queries := r.URL.Query()

	movie_id := queries.Get("movieId")
	if movie_id == "" {
		fmt.Println("Error: missing 'movieName' query parameter")
		http.Error(w, "missing 'movieName' query parameter", http.StatusBadRequest)
		return
	}
	fmt.Println("movie_id:", movie_id)

	client, collection, cancel, err := database.ConnectTo("screenings")
	if err != nil {
		fmt.Println("Failed to connect to database:", err)
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer cancel()
	defer client.Disconnect(ctx)

	screenings, err := database.Get(collection, bson.D{{Key: "movie_id", Value: movie_id}}, ctx, 1000)
	if err != nil {
		fmt.Println("Failed to get movie screenings:", err)
		http.Error(w, "Failed to get movie screenings", http.StatusInternalServerError)
		return
	}

	fmt.Println("screenings:", screenings)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(screenings)
}
