package handlers

import (
	"cine-spot/pkg/database"
	"cine-spot/pkg/models"
	"encoding/json"
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetMoviesHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	queries := r.URL.Query()
	columns, err := parseNumberQueryParam(queries, "columns")
	if err != nil {
		fmt.Println("Error parsing 'columns' query parameter:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	} else if columns <= 0 {
		columns = 1
	}
	perColumn, err := parseNumberQueryParam(queries, "perColumn")
	if err != nil {
		fmt.Println("Error parsing 'perColumn' query parameter:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	movieRepo, cleanup, err := models.MovieRepo()
	if err != nil {
		fmt.Println("Error getting movie repository:", err)
		http.Error(w, "Error getting movie repository", http.StatusInternalServerError)
		return
	}
	defer cleanup()

	movies, err := movieRepo.Find(ctx, bson.D{}, options.Find().SetLimit(int64(columns*perColumn)))
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
	movieID := queries.Get("movieId")
	if movieID == "" {
		fmt.Println("Error: missing 'movieId' query parameter")
		http.Error(w, "missing 'movieId' query parameter", http.StatusBadRequest)
		return
	}
	movieRepo, cleanup, err := models.MovieRepo()
	if err != nil {
		fmt.Println("Error getting movie repository:", err)
		http.Error(w, "Error getting movie repository", http.StatusInternalServerError)
		return
	}
	defer cleanup()

	objectID, err := database.ObjectId(movieID)
	if err != nil {
		fmt.Println("Error converting movie_id to ObjectID:", err)
		http.Error(w, "Invalid movie ID", http.StatusBadRequest)
		return
	}

	movie, err := movieRepo.FindOne(ctx, bson.D{{Key: "_id", Value: objectID}})
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

	movieRepo, movieCleanup, err := models.MovieRepo()
	if err != nil {
		fmt.Println("Error getting movie repository:", err)
		http.Error(w, "Error getting movie repository", http.StatusInternalServerError)
		return
	}
	defer movieCleanup()

	object_id, err := database.ObjectId(movie_id)
	if err != nil {
		fmt.Println("Error converting movie_id to ObjectID:", err)
		http.Error(w, "Invalid movie ID", http.StatusBadRequest)
		return
	}

	movie, err := movieRepo.FindOne(ctx, bson.D{{Key: "_id", Value: object_id}})
	if err != nil {
		fmt.Println("Failed to get movie details:", err)
		http.Error(w, "Failed to get movie details", http.StatusInternalServerError)
		return
	}

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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"movie":      movie,
		"screenings": screenings,
	})
}

func GetMovieReviewsHandler(w http.ResponseWriter, r *http.Request) {
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

	fmt.Println("reviews:", reviews)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(reviews)
}
