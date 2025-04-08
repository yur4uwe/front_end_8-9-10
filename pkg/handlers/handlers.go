package handlers

import (
	"encoding/json"
	"movie_theater/pkg/database"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
)

func HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Hello, World!"})
}

func GetMoviesHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	client, collection, cancel, err := database.ConnectTo("movies")
	if err != nil {
		http.Error(w, "Failed to connect to database", http.StatusInternalServerError)
		return
	}
	defer cancel()
	defer client.Disconnect(ctx)

	movies, err := database.Get(collection, bson.D{}, ctx)
	if err != nil {
		http.Error(w, "Failed to get movies", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(movies)
}
