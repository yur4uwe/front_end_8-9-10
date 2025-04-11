package handlers

import (
	"cine-spot/pkg/database"
	"cine-spot/pkg/models"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
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

	movie_repo, cleanup, err := models.MovieRepo()
	if err != nil {
		fmt.Println("Error getting movie repository:", err)
		http.Error(w, "Error getting movie repository", http.StatusInternalServerError)
		return
	}
	defer cleanup()

	movies, err := movie_repo.Find(ctx, bson.D{}, options.Find().SetLimit(int64(columns*per_column)))
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
	ctx := r.Context()
	queries := r.URL.Query()

	movie_id := queries.Get("movieId")
	if movie_id == "" {
		fmt.Println("Error: missing 'movieName' query parameter")
		http.Error(w, "missing 'movieName' query parameter", http.StatusBadRequest)
		return
	}

	movie_repo, cleanup, err := models.MovieRepo()
	if err != nil {
		fmt.Println("Error getting movie repository:", err)
		http.Error(w, "Error getting movie repository", http.StatusInternalServerError)
		return
	}
	defer cleanup()

	object_id, err := database.ObjectId(movie_id)
	if err != nil {
		fmt.Println("Error converting movie_id to ObjectID:", err)
		http.Error(w, "Invalid movie ID", http.StatusBadRequest)
		return
	}

	movie, err := movie_repo.FindOne(ctx, bson.D{{Key: "_id", Value: object_id}})
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

	screening_repo, cleanup, err := models.ScreeningRepo()
	if err != nil {
		fmt.Println("Error getting screening repository:", err)
		http.Error(w, "Error getting screening repository", http.StatusInternalServerError)
		return
	}
	defer cleanup()

	screenings, err := screening_repo.Find(ctx, bson.D{{Key: "movieId", Value: movie_id}})
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

func GetMovieComments(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	queries := r.URL.Query()

	movie_id := queries.Get("movieId")
	if movie_id == "" {
		fmt.Println("Error: missing 'movieName' query parameter")
		http.Error(w, "missing 'movieName' query parameter", http.StatusBadRequest)
		return
	}

	review_repo, cleanup, err := models.ReviewRepo()
	if err != nil {
		fmt.Println("Error getting review repository:", err)
		http.Error(w, "Error getting review repository", http.StatusInternalServerError)
		return
	}
	defer cleanup()

	reviews, err := review_repo.Find(ctx, bson.D{{Key: "movieId", Value: movie_id}})
	if err != nil {
		fmt.Println("Failed to get movie reviews:", err)
		http.Error(w, "Failed to get movie reviews", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(reviews)
}
